import React from 'react'
import "../css/Header.css"
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import TinderLogo from "../Tinder_logo_PNG18.png"
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function Header() {

    function handleLogout() {
        localStorage.removeItem("token");
        axios.post('/logout')
            .then((res) => {
                console.log('logged out');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="header">
            <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
            </IconButton>
            
            <img className="header__logo" src={TinderLogo} alt="RecruitMe"/>
            <IconButton>
                <ForumIcon className="header__icon" fontSize="large"/>
            </IconButton>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Header
