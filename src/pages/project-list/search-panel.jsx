import { useState, useEffect } from 'react';

const SearchPanel = () => {
    const [params, setParams] = useState({
        name: '',
        personId: '',
    });

    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]); // 状态提升

    useEffect(() => {
        fetch('').then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [params])

    // setParams(Object.assign({}, params, {name: e.target.value}));

    return (
        <form>
            <div>
                <input type="text" value={params.name} onChange={env => setParams({
                    ...params,
                    name: env.target.value
                })} />
                <select value={params.personId} onChange={env => setParams({
                    ...params,
                    personId: env.target.value
                })}>
                    <option value={''}>选择项</option>
                    {
                        users.map(user => <option value={user.id}>{user.name}</option>)
                    }
                </select>
            </div>
        </form>
    )
}

export default SearchPanel;