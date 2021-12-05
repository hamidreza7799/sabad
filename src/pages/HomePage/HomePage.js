import React from "react";
import Wrapper from "../../hoc/Wrapper";
import RTL from "../../hoc/RTL/RTL";
import AppBar from "../../components/AppBar/AppBar";
import SabadDrawer from "../../components/Drawer/Drawer";
import Table from "../../components/Table/Table";
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@mui/material"

import './HomePage.css'

const styles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: "7vh",
        fontFamily: 'IRANSansWeb',
        maxWidth: '100% !important',
        display: 'flex !important',
        justifyContent: "center"
    },
}))

function HomePage(props) {
    const classes = styles()

    return (
        <Wrapper>
            <RTL>
                <AppBar drawerIsOpen={props.drawerIsOpen} openDrawerHandler={props.openDrawerHandler} />
                <SabadDrawer drawerIsOpen={props.drawerIsOpen} openDrawerHandler={props.openDrawerHandler} closeDrawerHandler={props.closeDrawerHandler} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Table title={'صفحه اصلی'} />
                    </Container>
                </main>
            </RTL>
        </Wrapper>
    )

}

export default HomePage