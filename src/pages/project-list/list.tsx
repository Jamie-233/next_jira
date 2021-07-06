import { Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonOnPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { projectListActions } from "./project-list.slice";
import { User } from "./search-panel";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  // projectButton: JSX.Element;
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
  const { refresh } = props;
  const { mutate } = useEditProject();
  const dispatch = useDispatch();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);

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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      {/* {projectButton} */}
                      <ButtonOnPadding
                        type={"link"}
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                      >
                        edit
                      </ButtonOnPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonOnPadding type={"link"}>...</ButtonOnPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;
