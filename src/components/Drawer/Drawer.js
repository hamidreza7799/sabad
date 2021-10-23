import React from "react"
import { styled, } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Wrapper from "../../hoc/Wrapper"
import RTL from "../../hoc/RTL/RTL"
import './Drawer.css'
import HomeContext from "../../context/HomeContext"

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


class SabadDrawer extends React.Component {

    static contextType = HomeContext

    render() {
        return (
            <Wrapper>
                <Drawer
                    variant="permanent"
                    anchor={'right'}
                    open={this.context.drawerIsOpen}
                    sx={{
                        width: '30%'
                    }}
                >
                    <div>
                        <IconButton onClick={this.context.openDrawerHandler}>
                            <ChevronLeftIcon sx={{ color: '#3f407d', fontSize: '25px', }} />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text} dir='rtl'>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} className={'list-item-text'}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Wrapper>
        )
    }
}

export default SabadDrawer