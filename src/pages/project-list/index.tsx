import List from "./list";
import { Typography } from "antd";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import { useUrlQueryParam } from "utils/url";
import { useDebounce, useDocumentTitle } from "utils/index";
// import { useState } from "react";

export const ProjectList = () => {
  // const [params, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });

  // const [keys] = useState<('name'|'personId')[]>(['name', 'personId']);
  // const [params] = useUrlQueryParam(keys);
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  const debounceParams = useDebounce(params, 200);
  const { data: users } = useUsers();
  const { error, isLoading, data: list } = useProjects(debounceParams);

  useDocumentTitle("Project List", false);

  return (
    <Container>
      {/* <Helmet><title>Project List</title></Helmet> */}
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

ProjectList.whyDidYouRender = false;
