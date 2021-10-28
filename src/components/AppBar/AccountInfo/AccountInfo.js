import React from "react"
import Wrapper from "../../../hoc/Wrapper"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import './AccountInfo.css'

class AccountInfo extends React.Component {
    render() {
        return (
            <Wrapper>
                <Menu
                    anchorEl={this.props.anchorEl}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    onClick={this.props.handleClose}
                    dir='rtl'
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            borderRadius: "10%",
                            width: '20%',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            paddingX: '1%',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 40,
                                height: 40,
                                ml: -0.5,
                                mr: 2,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) translateX(-2000%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                >
                    <MenuItem sx={{
                        marginTop: "2vh"
                    }}>
                        <Avatar />  {this.props.accountUsername}
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{
                        marginTop: "2vh"
                    }}>
                        <ListItemIcon>
                            <Settings fontSize="medium" />
                        </ListItemIcon>
                        تنظیمات
                    </MenuItem>
                    <MenuItem sx={{
                        marginTop: "2vh",                        
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="medium" />
                        </ListItemIcon>
                        خروج
                    </MenuItem>
                </Menu>
            </Wrapper>
        )
    }
}

export default AccountInfo