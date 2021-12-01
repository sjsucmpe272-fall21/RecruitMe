import React, { useState } from 'react'
import "../css/Header.css"
// import PersonIcon from '@mui/icons-material/Person';
// import ForumIcon from '@mui/icons-material/Forum';
import TinderLogo from "../Tinder_logo_PNG18.png"
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Header() {
    const [authTokenValue, setAuthTokenValue] = useState(localStorage.getItem('token'));

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("userType");
        localStorage.removeItem("userName");
        localStorage.clear();
        axios.post('/logout')
            .then((res) => {
                console.log('logged out');
                setAuthTokenValue(null);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // const pages = [{text: 'Job Listings', link: '/newJobs'}, {text: 'Apply Desired Filters', link: '/applyFilters'}];
    // const settings = ['Profile', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const themeOptions = {
    palette: {
        type: 'light',
        primary: {
        main: '#FFFFFF',
        },
        secondary: {
        main: '#f50057',
        },
    }};

    const userType = localStorage.getItem('userType');

    return (
        <ThemeProvider theme={createTheme(themeOptions)}>
        {authTokenValue === null ? <Redirect to="/" /> : null}
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                   <a href='/'><img className="header__logo" src={TinderLogo} alt="RecruitMe"/></a>
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {/* {pages.map((page) => ( */}
                        <MenuItem key='Job Listings' onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Job Listings</Typography>
                        </MenuItem>
                        <MenuItem key='Apply Desired Filters' onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Apply Desired Filters</Typography>
                        </MenuItem>

                    {/* ))} */}
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {/* {pages.map((page) => ( */}
                    {userType === 'Candidate' && 
                        <Button
                            key='Job Listings'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                            href='/newJobs'
                        >
                            Job Listings
                        </Button>
                    }
                    {userType === 'Candidate' && 
                        <Button
                            key='Apply Desired Filters'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                            href='/applyFilters'
                        >
                            Apply Desired Filters
                        </Button>
                    }

                    {userType === 'Candidate' && 
                        <Button
                            key='Dashboard'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                            href='/candidate_dashboard'
                        >
                            Dashboard
                        </Button>
                    }
                            
                    {userType === 'Employer' && 
                        <Button
                            key='Create New Job'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                            href='/createNewJob'
                        >
                            Create New Job
                        </Button>
                    }

                    {userType === 'Employer' && 
                        <Button
                            key='Dashboard'
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'red', display: 'block' }}
                            href='/recruiter_dashboard'
                        >
                            Dashboard
                        </Button>
                    }
                    {/* ))} */}
                </Box>

                <MenuItem key='username'>
                    <Typography textAlign="center">Hi, {localStorage.getItem('userName')}</Typography>
                </MenuItem>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" style={{ backgroundColor: 'white', color: 'red' }} /> */}
                        <Avatar src="/broken-image.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                    {/* {settings.map((setting) => ( */}
                        <MenuItem key='profile' component='a' href='/profile'>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem key='dashboard'>
                            <Typography textAlign="center">Dashboard</Typography>
                        </MenuItem>
                        <MenuItem key='logout' onClick={handleLogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    {/* ))} */}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
        // <div className="header">
        //     {authTokenValue === null ? <Redirect to="/" /> : null}
        //     <IconButton>
        //         <PersonIcon className="header__icon" fontSize="large"/>
        //     </IconButton>
        //     <Button variant="outlined" href="/applyFilters">Apply Desired Filters</Button>
        //     <a href='/'><img className="header__logo" src={TinderLogo} alt="RecruitMe"/></a>
        //     {/* <IconButton>
        //         <ForumIcon className="header__icon" fontSize="large"/>
        //     </IconButton> */}
        //     <Button variant="outlined" href="/newJobs">Job Listings</Button>
        //     <Button variant="outlined" color="error" onClick={handleLogout}>
        //         Logout
        //     </Button>
        // </div>
    )
};

export default Header