import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { ReactComponent as Logo } from "assets/software-logo.svg";

export const AuthenicatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <Logo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>Project</h2>
          <h2>Users</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type="link" onClick={logout}>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">Hi, {user?.name}</Button>
          </Dropdown>
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
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Main = styled.main``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
