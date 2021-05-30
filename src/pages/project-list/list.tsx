import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export interface Project {
  id: string;
  pin: boolean;
  name: string;
  created: number;
  personId: string;
  organization: string;
}

const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "Name",
          // sort chinese character
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
          dataIndex: "owner",
          render(value, project) {
            return (
              <span key={project.personId}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;
