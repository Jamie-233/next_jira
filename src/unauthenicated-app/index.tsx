import { useState } from "react";
import { RegisterPage } from "unauthenicated-app/register";
import { LoginPage } from "unauthenicated-app/login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnAuthenicatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "Sign up" : "Sing in"}</Title>
        {error ? (
          <AlertError>
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
          </AlertError>
        ) : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        <LongButton type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Sing in" : "Sign up"}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(${left}), url(${right});
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const AlertError = styled.div`
  text-align: center;
`;
