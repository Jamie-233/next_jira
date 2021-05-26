import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenicated-app";

export const RegisterPage = () => {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    register(values);

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
          placeholder="Please input Password"
          type="password"
          id="password"
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          Sign up
        </LongButton>
      </Form.Item>
    </Form>
  );
};
