import React from "react"
import Wrapper from "../../hoc/Wrapper"
import AppBar from "../../components/AppBar/AppBar"
import SabadDrawer from "../../components/Drawer/Drawer"
import Box from '@mui/material/Box';
import './HomePage.css'
import HomeContext from "../../context/HomeContext"

class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            drawerIsOpen: true
        }
    }

    openDrawerHandler = () => {
        this.setState({
            drawerIsOpen: true
        })
        console.log("Open")
    }

    closeDrawerHandler = () => {
        this.setState({
            drawerIsOpen: false
        })
        console.log("close")
    }


    render() {
        return (
            <HomeContext.Provider value={{
                drawerIsOpen: this.state.drawerIsOpen,
                openDrawerHandler: this.openDrawerHandler,
                closeDrawerHandler: this.closeDrawerHandler
            }}>
                <Wrapper>
                    <Box sx={{ display: 'flex' }}>
                        <AppBar drawerIsOpen={this.state.drawerIsOpen} openDrawerHandler={this.openDrawerHandler} />
                        <SabadDrawer drawerIsOpen={this.state.drawerIsOpen} openDrawerHandler={this.openDrawerHandler} closeDrawerHandler={this.closeDrawerHandler} />
                    </Box>
                </Wrapper>
            </HomeContext.Provider>
        )
    }
}

export default HomePage