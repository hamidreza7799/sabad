import React from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wrapper from "./hoc/Wrapper"
import MessageDialog from "./components/UI/Dialog/MessageDialog/MessageDialog"
import MessageSnackbar from "./components/UI/Snackbar/MessageSnackbar/MessageSnackbar"
import Loader from './components/UI/Loader/Loader'
import { AppContextProvider } from "./context/AppContext";
import { UserContextProvider } from "./context/UserContext";
import HomePage from "./pages/HomePage/HomePage";
import AnnotatePage from './pages/AnnotatePage/AnnotatePage'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerIsOpen: false,
            isLoading: false,
            messageDialogIsOpen: false,
            messageDialogType: '',
            messageDialogText: '',
            messageSnackbarIsOpen: false,
            messageSnackbarType: '',
            messageSnackbarText: '',
            user: {
                isAuth: false,
                token: '',
                pk: 0,
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: ''
            }
        }
    }

    closeLoadingHandler = () => {
        this.setState({
            ...this.state,
            isLoading: false
        })
    }

    openLoadingHandler = () => {
        this.setState({
            ...this.state,
            isLoading: true
        })
    }

    openMessageDialogHandler = (props) => {
        this.setState({
            ...this.state,
            messageDialogIsOpen: true,
            messageDialogText: props.messageText,
            messageDialogType: props.messageType
        })
    }

    closeMessageDialogHandler = () => {
        this.setState({
            ...this.state,
            messageDialogIsOpen: false
        })
    }

    openMessageSnackbarHandler = (props) => {
        this.setState({
            ...this.state,
            messageSnackbarIsOpen: true,
            messageSnackbarText: props.messageText,
            messageSnackbarType: props.messageType
        })
    }

    closeMessageSnackbarHandler = () => {
        this.setState({
            ...this.state,
            messageSnackbarIsOpen: false
        })
    }

    setUserInformation = (props) => {
        this.setState({
            ...this.state,
            user: {
                isAuth: props.isAuth,
                token: props.token,
                pk: props.pk,
                firstName: props.firstName,
                lastName: props.lastName,
                username: props.username,
                email: props.email,
                password: props.password
            }
        })
    }

    openDrawerHandler = () => {
        this.setState({
            ...this.state,
            drawerIsOpen: true
        })
    }

    closeDrawerHandler = () => {
        this.setState({
            ...this.state,
            drawerIsOpen: false
        })
    }

    render() {
        return (
            <AppContextProvider value={{
                isLoading: this.state.isLoading,
                openLoadingHandler: this.openLoadingHandler,
                closeLoadingHandler: this.closeLoadingHandler,
                messageDialogIsOpen: this.state.messageDialogIsOpen,
                messageDialogType: this.state.messageDialogType,
                messageDialogText: this.state.messageDialogText,
                openMessageDialogHandler: (props) => { this.openMessageDialogHandler(props) },
                closeMessageDialogHandler: this.closeMessageDialogHandler,
                messageSnackbarIsOpen: this.state.messageSnackbarIsOpen,
                messageSnackbarType: this.state.messageSnackbarType,
                messageSnackbarText: this.state.messageSnackbarText,
                openMessageSnackbarHandler: (props) => { this.openMessageSnackbarHandler(props) },
                closeMessageSnackbarHandler: this.closeMessageSnackbarHandler,
            }}>
                <UserContextProvider value={{
                    isAuth: this.state.user.isAuth,
                    token: this.state.user.token,
                    pk: this.state.user.pk,
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    username: this.state.user.username,
                    email: this.state.user.email,
                    password: this.state.user.password,
                    setUserInformation: (props) => { this.setUserInformation(props) }
                }}>
                    <Wrapper>
                        <MessageDialog isOpen={this.state.messageDialogIsOpen} messageType={this.state.messageDialogType} messageText={this.state.messageDialogText} closeDialog={this.closeMessageDialogHandler} />
                        <MessageSnackbar isOpen={this.state.messageSnackbarIsOpen} messageType={this.state.messageSnackbarType} messageText={this.state.messageSnackbarText} />
                        <Loader isLoading={this.state.isLoading}></Loader>
                        <Router>
                            <Switch>
                                <Route path="/login" exact component={LoginPage} />
                                <Route exact path="/project/:username/:projectSlug/task/:taskSlug" component={AnnotatePage} />
                                <Route exact path="/profile">
                                    {null}
                                </Route>
                                <Route exact path="/info">
                                    {null}
                                </Route>
                                <Route path="/">
                                    <HomePage drawerIsOpen={this.state.drawerIsOpen} openDrawerHandler={this.openDrawerHandler} closeDrawerHandler={this.closeDrawerHandler} />
                                </Route>
                            </Switch>
                        </Router>
                    </Wrapper>
                </UserContextProvider >
            </AppContextProvider>


        )
    }

}

export default App