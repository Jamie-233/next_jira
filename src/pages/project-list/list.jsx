const List = ({ users, list }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>owner</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map(project => <tr key={project.id}>
                        <td>{ project.name }</td>
                        <td>{ users.find(user => user.id === project.personId)?.name || '未知' }</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default List;