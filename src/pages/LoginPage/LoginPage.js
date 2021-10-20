import React from "react"

import UserContext from "../../context/UserContext"
import './LoginPage.css'
import SigninForm from "../../components/From/SigninForm/SigninForm"
import CircleImage from "../../components/CircleImage/CircleImage"
import Loader from '../../components/UI/Loader/Loader'
import Wrapper from "../../hoc/Wrapper";
import MessageDialog from "../../components/UI/Dialog/MessageDialog/MessageDialog"
import MessageSnackbar from "../../components/UI/Snackbar/MessageSnackbar/MessageSnackbar"

class LoginPage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            login: false,
            isLoading: false,
            isAuth: false,
            token: '',
            username: '',
            email: '',
            password: ''
        };
    }



    render() {
        return (
            <UserContext.Provider value={{
                isAuth: this.state.isAuth,
                token: this.state.token,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }}
            >
                <Wrapper>
                    <MessageDialog isOpen={false} messageType="error" messageText="خطا رخ داده است" />
                    <MessageSnackbar isOpen={true} messageType={"success"} messageText={"عملیات موفقیت‌آمیز بود"} />
                    <Loader isLoading={this.state.isLoading}></Loader>
                    <div className="login">
                        <div className={`sidebar-container  ${this.state.login ? 'sidebar-container--left' : 'sidebar-container--right'}`}></div>
                        <div className={`login__welcome-back ${this.state.login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                        </div>
                        <div className={`login__hello-container ${!this.state.login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                        </div>


                        <div className={`login__create-container ${this.state.login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                            <CircleImage></CircleImage>
                            <SigninForm signinHandler={this.signinHandler} changeSideBarHandler={this.changeSideBarHandler}></SigninForm>
                        </div>
                        <div className={`login__login-container ${!this.state.login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                            <CircleImage></CircleImage>
                            <SigninForm signinHandler={this.signinHandler} changeSideBarHandler={this.changeSideBarHandler}></SigninForm>
                        </div>
                    </div>
                </Wrapper>
            </UserContext.Provider>

        );
    }

    changeSideBarHandler = () => {
        this.setState({
            ...this.state,
            login: this.state.login
        })
    }


    signinHandler = (form_variables) => {
        this.setState({
            ...this.state,
            isLoading: true,
        })
        

    }
}

export default LoginPage