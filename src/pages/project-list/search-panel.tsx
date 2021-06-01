import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  token: string;
  email: string;
  title: string;
  organization: string;
}

interface SearchPanelProps {
  users: User[];
  // params: {
  //   name: string;
  //   personId: number;
  // };
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: SearchPanelProps["params"]) => void;
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
        <UserSelect
          defaultOptionName={"Owner"}
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        />
        {/* <Select
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
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;
