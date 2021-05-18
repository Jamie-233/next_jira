import React from 'react';
import { useEffect, useState } from 'react';
import List from './list';
import SearchPanel from './search-panel';

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectList = () => {
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const [params, setParams] = useState({
        name: '',
        personId: '',
    });

    useEffect(() => {
        console.log('params', params);
        fetch(`${apiUrl}/projects?name=${params.name}&personId=${params.personId}`).then(async response => {
            if(response.ok) {
                setList(await response.json());
            }
        })
    }, [params])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok) {
                setUsers(await response.json());
            }
        })
    }, [])

    return (
        <div>
            <SearchPanel users={users} params={params} setParams={setParams} />
            <List users={users} list={list} />
        </div>
    )
}

export default ProjectList;