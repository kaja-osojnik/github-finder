import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githunContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_ALERT, SET_LOADING, CLEAR_USERS, GET_REPOS, GET_USER} from "../types";

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId  = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId  = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: []
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        setLoading(true)
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
        {githubClientId}&client_secret=$
        {githubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // Clear users from  state
    const clearUsers = () => {
       dispatch({
           type: CLEAR_USERS
       })
    }

    // Get single Gihub user
    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=$
        {githubClientId}&client_secret=$
        {githubClientSecret}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    }

    // get users repos
    const getUserRepos = async (username) => {
        setLoading(false);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
        {githubClientId}&client_secret=$
        {githubClientSecret}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    }

    const setLoading = () => dispatch ({ type: SET_LOADING })

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            loading: state.loading,
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}

    </GithubContext.Provider>
}

export default GitHubState