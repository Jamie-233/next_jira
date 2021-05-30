import { useAuth } from "context/auth-context";
import { AuthenicatedApp } from "authenicated-app";
import { UnAuthenicatedApp } from "unauthenicated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageError } from "components/lib";
import "App.less";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fullbackRender={FullPageError}>
        {user ? <AuthenicatedApp /> : <UnAuthenicatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
