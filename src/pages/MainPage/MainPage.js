import React, { useState } from "react"
import Wrapper from "../../hoc/Wrapper"
import AppBar from "../../components/AppBar/AppBar"
import SabadDrawer from "../../components/Drawer/Drawer"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RTL from "../../hoc/RTL/RTL"
import './MainPage.css'
import HomeContext from "../../context/HomeContext"
import { Container } from "@mui/material"
import Table from "../../components/Table/Table"
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(4),
        fontFamily: 'IRANSansWeb',
        maxWidth: '100% !important',
        display: 'flex !important',
        justifyContent: "center"
    },
}))

function MainPage(props) {
    const classes = styles()
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const openDrawerHandler = () => {
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false)
    }


    return (
        <HomeContext.Provider value={{
            drawerIsOpen: drawerIsOpen,
            openDrawerHandler: openDrawerHandler,
            closeDrawerHandler: closeDrawerHandler
        }}>
            <Wrapper>
                <RTL>
                    <AppBar drawerIsOpen={drawerIsOpen} openDrawerHandler={openDrawerHandler} />
                    <SabadDrawer drawerIsOpen={drawerIsOpen} openDrawerHandler={openDrawerHandler} closeDrawerHandler={closeDrawerHandler} />
                    <Router>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Switch>
                                    <Route path="/home">
                                        <Table title={'صفحه اصلی'} />
                                    </Route>
                                    <Route path="/profile">
                                        {null}
                                    </Route>
                                    <Route path="/info">
                                        {null}
                                    </Route>
                                </Switch>
                            </Container>
                        </main>
                    </Router>
                </RTL>
            </Wrapper>
        </HomeContext.Provider >
    )
}


export default MainPage