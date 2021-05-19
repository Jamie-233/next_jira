import { Users } from "./search-panel";

interface ListProps {
  list: Project[];
  users: Users[];
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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
