import React from 'react'
import "../css/Header.css"
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import TinderLogo from "../Tinder_logo_PNG18.png"
import IconButton from '@mui/material/IconButton';

function Header() {
    return (
        <div className="header">
            <IconButton>
                <PersonIcon className="header__icon" fontSize="large"/>
            </IconButton>
            
            <img className="header__logo" src={TinderLogo} alt="RecruitMe"/>
            <IconButton>
                <ForumIcon className="header__icon" fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default Header
