import React from 'react'
import Wrapper from '../../hoc/Wrapper'
import RTL from '../../hoc/RTL/RTL'
import HomeContext from '../../context/HomeContext'
import AppBar from '@mui/material/AppBar';
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

import './AppBar.css'

class SabadAppBar extends React.Component {

    static contextType = HomeContext

    constructor(props) {
        super(props)
        this.state = {
            accountInfoAnchorEl: null,
            accountInfoIsOpen: false
        }
    }
    openAccountInfoHandler = (event) => {
        this.setState({
            accountInfoIsOpen: true,
            accountInfoAnchorEl: event.currentTarget
        })
    };
    closeAccountInfoHandler = () => {
        this.setState({
            accountInfoIsOpen: false,
            accountInfoAnchorEl: null
        })
    };

    render() {
        return (
            <Wrapper>
                <RTL>
                    <Box sx={{ flexGrow: 1 }}>
                        <AppBar position="static" dir='rtl' >
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon onClick={this.context.openDrawerHandler}/>
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
                                        onClick={this.openAccountInfoHandler}
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
                        </AppBar>
                    </Box>
                    <AccountInfo
                        anchorEl={this.state.accountInfoAnchorEl}
                        open={this.state.accountInfoIsOpen}
                        handleClose={this.closeAccountInfoHandler}
                        accountUsername={"Hamidreza7799"}
                    ></AccountInfo>
                </RTL>
            </Wrapper>
        )
    }
}

export default SabadAppBar