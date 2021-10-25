import React from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wrapper from "./hoc/Wrapper"
import MessageDialog from "./components/UI/Dialog/MessageDialog/MessageDialog"
import MessageSnackbar from "./components/UI/Snackbar/MessageSnackbar/MessageSnackbar"
import Loader from './components/UI/Loader/Loader'
import { AppContextProvider } from "./context/AppContext";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            messageDialogIsOpen: false,
            messageDialogType: '',
            messageDialogText: '',
            messageSnackbarIsOpen: false,
            messageSnackbarType: '',
            messageSnackbarText: '',
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

    render() {
        return (
            <AppContextProvider value={{
                isLoading: this.state.isLoading,
                openLoadingHandler: this.openLoadingHandler,
                closeLoadingHandler: this.closeLoadingHandler,
                messageDialogIsOpen: this.state.messageDialogIsOpen,
                messageDialogType: this.state.messageDialogType,
                messageDialogText: this.state.messageDialogText,
                openMessageDialogHandler: (props) => {this.openMessageDialogHandler(props)},
                closeMessageDialogHandler: this.closeMessageDialogHandler,
                messageSnackbarIsOpen: this.state.messageSnackbarIsOpen,
                messageSnackbarType: this.state.messageSnackbarType,
                messageSnackbarText: this.state.messageSnackbarText,
                openMessageSnackbarHandler: (props) => {this.openMessageSnackbarHandler(props)},
                closeMessageSnackbarHandler: this.closeMessageSnackbarHandler,
            }}>
                <Wrapper>
                    <MessageDialog isOpen={this.state.messageDialogIsOpen} messageType={this.state.messageDialogType} messageText={this.state.messageDialogText} closeDialog={this.closeMessageDialogHandler} />
                    <MessageSnackbar isOpen={this.state.messageSnackbarIsOpen} messageType={this.state.messageSnackbarType} messageText={this.state.messageSnackbarText} />
                    <Loader isLoading={this.state.isLoading}></Loader>
                    <Router>
                        <Switch>
                            <Route path="/" exact component={null} />
                            <Route path="/login" exact component={LoginPage} />
                            <Route path="/home" exact component={MainPage} />
                        </Switch>
                    </Router>
                </Wrapper>
            </AppContextProvider>

        )
    }

}

export default App