import React, { useState, useContext, useParams } from "react"
import Wrapper from "../../hoc/Wrapper"
import AppBar from "../../components/AppBar/AppBar"
import SabadDrawer from "../../components/Drawer/Drawer"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RTL from "../../hoc/RTL/RTL"
import './MainPage.css'
import HomeContext from "../../context/HomeContext"
import UserContext from "../../context/UserContext";
import { Container } from "@mui/material"
import Table from "../../components/Table/Table"
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import ScrollTop from "../../components/ScrollTop/ScrollTop";
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AnnotatePage from "../AnnotatePage/AnnotatePage";

const styles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: "7vh",
        // paddingBottom: "15vh",
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

    const scrollTopHandler = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );
        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }

    return (
        <HomeContext.Provider value={{
            drawerIsOpen: drawerIsOpen,
            openDrawerHandler: openDrawerHandler,
            closeDrawerHandler: closeDrawerHandler
        }}>
            <Wrapper>
                <RTL>
                    {/* <Toolbar id="back-to-top-anchor" /> */}
                    <Router>
                        <Switch>
                            <Route exact path="/home">
                                <AppBar drawerIsOpen={drawerIsOpen} openDrawerHandler={openDrawerHandler} />
                                <SabadDrawer drawerIsOpen={drawerIsOpen} openDrawerHandler={openDrawerHandler} closeDrawerHandler={closeDrawerHandler} />
                                <main className={classes.content}>
                                    <div className={classes.appBarSpacer} />
                                    <Container maxWidth="lg" className={classes.container}>
                                        <Table title={'صفحه اصلی'} />
                                    </Container>
                                </main>
                            </Route>
                            <Route exact path="/project/:username/:projectSlug/task/:taskSlug" component={AnnotatePage} />
                            <Route exact path="/profile">
                                {null}
                            </Route>
                            <Route exact path="/info">
                                {null}
                            </Route>
                        </Switch>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container}>
                                <Switch>

                                </Switch>
                            </Container>
                        </main>
                    </Router>
                    {/* <ScrollTop {...props} scrollTopHandler={(event) => {scrollTopHandler(event)}}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop> */}
                </RTL>
            </Wrapper>
        </HomeContext.Provider >
    )
}


export default MainPage
