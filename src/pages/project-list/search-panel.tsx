interface SearchPanelProps {
  users: Users[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}

export interface Users {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(env) =>
            setParams({
              ...params,
              name: env.target.value,
            })
          }
        />
        <select
          value={params.personId}
          onChange={(env) =>
            setParams({
              ...params,
              personId: env.target.value,
            })
          }
        >
          <option value={""}>选择项</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;
