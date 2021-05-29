import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenicated-app";
import { useAsync } from "utils/use-async";
// import { FormEvent } from "react";

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "username is required" }]}
      >
        <Input placeholder="username" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "password is required" }]}
      >
        <Input placeholder="password" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          Sign in
        </LongButton>
      </Form.Item>
    </Form>
  );
};
