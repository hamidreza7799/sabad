import React from "react"
import Wrapper from "../../hoc/Wrapper"
import SabadAppBar from "../../components/AppBar/AppBar"
import SabadDrawer from "../../components/Drawer/Drawer"
import './HomePage.css'
import HomeContext from "../../context/HomeContext"


class HomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            drawerIsOpen: false
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
                closeDrawerInfoHandler: this.closeDrawerHandler
            }}>
                <Wrapper>
                    <SabadAppBar />
                    <SabadDrawer />
                </Wrapper>
            </HomeContext.Provider>
        )
    }
}

export default HomePage