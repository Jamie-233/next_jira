import { useAuth } from "context/auth-context";
import { ProjectList } from "pages/project-list";

export const AuthenicatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>logout</button>
      <ProjectList />
    </div>
  );
};
