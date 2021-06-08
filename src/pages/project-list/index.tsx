import List from "./list";
import { Button, Row, Typography } from "antd";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import { useDebounce, useDocumentTitle } from "utils/index";
import { useProjectsSearchParam } from "./util";

export const ProjectList = (props: {
  setProjectModalShow: (isShow: boolean) => void;
}) => {
  useDocumentTitle("Project List", false);
  const { setProjectModalShow } = props;
  // const [params, setParams] = useState({
  //   name: "",
  //   personId: "",
  // });
  // const [keys] = useState<('name'|'personId')[]>(['name', 'personId']);
  // const [params] = useUrlQueryParam(keys);

  const { data: users } = useUsers();
  const [param, setParam] = useProjectsSearchParam();
  const {
    error,
    isLoading,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));

  return (
    <Container>
      {/* <Helmet><title>Project List</title></Helmet> */}
      <Row justify={"space-between"}>
        <h2>Project List</h2>
        <Button onClick={() => setProjectModalShow(true)}>Creat</Button>
      </Row>
      {/* <Button onClick={retry}></Button> */}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        setProjectModalShow={setProjectModalShow}
      />
    </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
`;

ProjectList.whyDidYouRender = false;
