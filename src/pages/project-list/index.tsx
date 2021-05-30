import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils/index";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
// import { Helmet } from "react-helmet";
// import { useHttp } from "utils/http";
// import { useAsync } from "utils/use-async";

export const ProjectList = () => {
  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(params, 200);
  const { data: users } = useUsers(debounceParams);
  const { error, isLoading, data: list } = useProjects(debounceParams);

  useDocumentTitle("Project List", false);

  // const http = useHttp();
  // useMount(() => http("users").then(setUsers));
  // useEffect(() => {
  //   run(http("projects", { data: cleanObject(debounceParams) }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceParams]);

  return (
    <Container>
      {/* <Helmet>
        <title>Project List</title>
      </Helmet> */}
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
`;
