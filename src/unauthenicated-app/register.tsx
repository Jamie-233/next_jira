import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenicated-app";
import { useAsync } from "utils/use-async";

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("The two passwords are not the same"));
      return;
    }
    try {
      await run(register(values));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "please confirm password" }]}
      >
        <Input placeholder="confirm password" type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          Sign up
        </LongButton>
      </Form.Item>
    </Form>
  );
};
