import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";

export const AuthenicatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>Project</h2>
          <h2>Users</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>logout</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  /* grid-template-columns: 1rem 1fr; */
  /* height: 100vh; */
`;

const Main = styled.main``;

const Header = styled(Row)``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
