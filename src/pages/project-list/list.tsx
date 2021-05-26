import { Table } from "antd";
import { User } from "./search-panel";

interface ListProps {
  list: Project[];
  users: User[];
}

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // sort chinese character
        },
        {
          title: "Owner",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};

export default List;
