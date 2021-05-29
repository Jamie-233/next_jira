import { useEffect, useState } from "react";
import { useMount, useDebounce, cleanObject } from "utils/index";
import List from "./list";
import SearchPanel from "./search-panel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectList = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 200);
  const http = useHttp();

  useMount(() => http("users").then(setUsers));

  useEffect(() => {
    setIsLoading(true);
    http("projects", { data: cleanObject(debounceParams) })
      .then(setList)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParams]);

  return (
    <Container>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
`;
