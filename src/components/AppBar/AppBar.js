import React, { useState } from 'react'
import Wrapper from '../../hoc/Wrapper'
import RTL from '../../hoc/RTL/RTL'
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountInfo from './AccountInfo/AccountInfo'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import './AppBar.css'

const drawerWidth = 240
const styles = makeStyles((theme) => ({
    appBar: {
        zIndex: `${theme.zIndex.drawer + 1} !important`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginRight: drawerWidth,
        width: `calc(100% - ${drawerWidth}px) !important`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
}))


export default function AppBar(props) {

    const classes = styles()
    const [accountInfoAnchorEl, setAccountInfoAnchorEl] = useState(null)
    const [accountInfoIsOpen, setAccountInfoIsOpen] = useState(false)

    const openAccountInfoHandler = (event) => {
        setAccountInfoAnchorEl(event.currentTarget)
        setAccountInfoIsOpen(true)
    };

    const closeAccountInfoHandler = () => {
        setAccountInfoAnchorEl(null)
        setAccountInfoIsOpen(false)
    };

    return (
        <Wrapper>
            <RTL>
                <Box sx={{ flexGrow: 1, }}>
                    <MuiAppBar position="fixed" dir='rtl' className={`${props.drawerIsOpen ? 'appBarShift' : 'appBar'} ${props.drawerIsOpen ? classes.appBarShift : classes.appBar}`}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={props.openDrawerHandler}
                                className={props.drawerIsOpen ? "menuButtonShift": ""}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: '1%', justifyContent: 'space-evenly', width: '12%' } }}>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={0} color="error">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={0} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    // aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={openAccountInfoHandler}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    // aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    // onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </MuiAppBar>
                </Box>
                <AccountInfo
                    anchorEl={accountInfoAnchorEl}
                    open={accountInfoIsOpen}
                    handleClose={closeAccountInfoHandler}
                    accountUsername={"Hamidreza7799"}
                ></AccountInfo>
            </RTL>
        </Wrapper>
    )
}
