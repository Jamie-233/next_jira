import { useEffect, useState } from "react";
import { useMount, useDebounce, cleanObject } from "utils/index";
import List from "./list";
import SearchPanel from "./search-panel";
import { useHttp } from "utils/http";

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 200);
  const http = useHttp();

  useMount(() => http("users").then(setUsers));

  useEffect(() => {
    http("projects", { data: cleanObject(debounceParams) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};
