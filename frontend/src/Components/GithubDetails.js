import React,{ useState, useEffect } from 'react'
import Axios from "axios"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function GithubDetails(props) {
    const [repos, setRepos] = useState([]);

    const fetchDetails = async (props) => {

        try {
            const { data } = await Axios.get(`https://api.github.com/users/${props.githubUserName}/repos`)
            console.log(data);
            setRepos([...data]);
            console.log(...data);
        }
        catch (error) {
            console.log("Wrong username"+props.githubUserName);
        }

    }


    useEffect(() => {
        fetchDetails(props)
    }, [])
    return (
        <div className="githubDetails">
            {repos!=undefined && repos.map(repo => (
                <List key={repo.id}>
                    <ListItem className="text-primary">{repo.name}</ListItem>
                    <ListItem className="text-secondary">{repo.language}</ListItem>
                    <ListItem className="text-info">{repo.description}</ListItem>
                </List>
            ))}
        </div>
    )
}

export default GithubDetails
