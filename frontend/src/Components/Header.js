import React, { useState } from 'react'
import "../css/Header.css"
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import TinderLogo from "../Tinder_logo_PNG18.png"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Header() {
    const [authTokenValue, setAuthTokenValue] = useState(localStorage.getItem('token'));

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.clear();
        axios.post('http://localhost:8001/logout')
            .then((res) => {
                console.log('logged out');
                setAuthTokenValue(null);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="header">
            {authTokenValue === null ? <Redirect to="/" /> : null}
            <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
            </IconButton>
            
            <img className="header__logo" src={TinderLogo} alt="RecruitMe"/>
            <IconButton>
                <ForumIcon className="header__icon" fontSize="large"/>
            </IconButton>
            <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}

export default Header