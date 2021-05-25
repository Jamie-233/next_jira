import { useState } from "react";
import { RegisterPage } from "unauthenicated-app/register";
import { LoginPage } from "unauthenicated-app/login";
export const UnAuthenicatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};
