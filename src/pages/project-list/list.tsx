import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface ListProps {
  list: Project[];
  users: User[];
}

interface Project {
  id: string;
  pin: boolean;
  name: string;
  created: number;
  personId: string;
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
          title: "Organization",
          dataIndex: "organization",
        },
        {
          title: "CreateTime",
          dataIndex: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(value).format("YYYY-MM-DD HH:mm:ss")
                  : ""}
              </span>
            );
          },
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
