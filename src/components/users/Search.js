import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githunContext';
import GitHubState from "../../context/github/githubState";

const Search = ({ setEmptyAlert }) => {
    const githubContext = useContext(GithubContext)
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === ""){
            setEmptyAlert("Please enter something", 'light')
        } else {
            githubContext.searchUsers(text);
            setText( '')
        }
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text"
                       name="text"
                       placeholder="Search Users..."
                       value={text}
                       onChange={onChange}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    );
}

Search.propTypes = {
    setEmptyAlert: PropTypes.func.isRequired
}

export default Search;