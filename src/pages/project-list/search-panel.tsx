import { Form, Input, Select } from "antd";
interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}

export interface User {
  id: string;
  name: string;
  token: string;
  email: string;
  title: string;
  organization: string;
}

const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "3.2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type={"text"}
          value={params.name}
          onChange={(env) =>
            setParams({
              ...params,
              name: env.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>Select</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
