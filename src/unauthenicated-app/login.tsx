import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenicated-app";
// import { FormEvent } from "react";

export const LoginPage = () => {
  const { login } = useAuth();

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // };

  const handleSubmit = (values: { username: string; password: string }) =>
    login(values);

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "username is required" }]}
      >
        <Input placeholder="Please input username" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "password is required" }]}
      >
        <Input
          placeholder="Please input password"
          type="password"
          id="password"
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          Sign in
        </LongButton>
      </Form.Item>
    </Form>
  );
};
