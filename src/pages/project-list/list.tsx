import { Table, TableProps } from "antd";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { User } from "./search-panel";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export interface Project {
  id: number;
  pin: boolean;
  name: string;
  created: number;
  personId: number;
  organization: string;
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
