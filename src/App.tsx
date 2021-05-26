import { useAuth } from "context/auth-context";
import { AuthenicatedApp } from "authenicated-app";
import { UnAuthenicatedApp } from "unauthenicated-app";
import "App.less";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenicatedApp /> : <UnAuthenicatedApp />}
    </div>
  );
}

export default App;
