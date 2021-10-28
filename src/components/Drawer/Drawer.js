import * as React from 'react';
import { styled, } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import RTL from '../../hoc/RTL/RTL'
import HomeContext from '../../context/HomeContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom'
import './Drawer.css'

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(5)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default class SabadDrawer extends React.Component {

    static contextType = HomeContext

    constructor(props) {
        super(props)
        this.state = {
            drawerButtons: [
                {
                    title: "صفحه اصلی",
                    link: "/home",
                    icon: <HomeIcon fontSize='large' />
                },
                {
                    title: "اطلاعات",
                    link: "/info",
                    icon: <InfoIcon fontSize='large' />
                },
                {
                    title: "پروفایل",
                    link: "/profile",
                    icon: <AccountCircleIcon fontSize='large' />
                },

            ]
        }
    }

    render() {
        console.log(window.location.pathname)
        return (
            <RTL>
                <Box sx={{ display: 'flex' }}>
                    <Drawer variant="permanent" open={this.props.drawerIsOpen} anchor={'left'}>
                        <DrawerHeader>
                            <IconButton onClick={this.props.closeDrawerHandler} open={this.props.drawerIsOpen}>
                                <CloseIcon sx={{
                                    fontSize: "1.85rem"
                                }}/>
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            {this.state.drawerButtons.map((button, index) => (
                                <Link to={`${button.link}`} style={{textDecoration: 'none',}}>
                                    <ListItem button key={button.title} dir='rtl' className={`${button.link === window.location.pathname? "dark-blue select-item-border": ""}`}>
                                        <ListItemIcon className={`${button.link === window.location.pathname? "dark-blue": ""}`}>
                                            {button.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={button.title} className={`${button.link === window.location.pathname? "select-item-text": "item-text"}`}/>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Drawer>
                </Box>
            </RTL>
        );
    }
}