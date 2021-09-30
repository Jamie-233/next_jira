import { useAuth } from "context/auth-context";
import { AuthenicatedApp } from "authenicated-app";
import { UnAuthenicatedApp } from "unauthenicated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import "App.less";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenicatedApp /> : <UnAuthenicatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
