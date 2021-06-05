import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { ButtonOnPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";
import { ReactComponent as Logo } from "assets/software-logo.svg";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "pages/project";
import { resetRoute } from "utils";
import { ProjectModal } from "pages/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenicatedApp = () => {
  const [projectModalShow, setProjectModalShow] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalShow={setProjectModalShow} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectList setProjectModalShow={setProjectModalShow} />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={window.location.pathname + "/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalShow={projectModalShow}
        onClose={() => setProjectModalShow(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalShow: (isShow: boolean) => void;
}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonOnPadding type={"link"} onClick={resetRoute}>
          <Logo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonOnPadding>
        <ProjectPopover setProjectModalShow={props.setProjectModalShow} />
        <span>Users</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
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

const User = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type="link" onClick={logout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link">Hi, {user?.name}</Button>
    </Dropdown>
  );
};

const Main = styled.main``;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
