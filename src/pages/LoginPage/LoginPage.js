import React, { useState, useContext} from "react"
import { useHistory } from "react-router-dom";
import axios from "../../axios"
import UserContext, { UserContextConsumer, UserContextProvider } from "../../context/UserContext"
import AppContext, { AppContextConsumer, AppContextProvider } from "../../context/AppContext"
import './LoginPage.css'
import SigninForm from "../../components/From/SigninForm/SigninForm"
import CircleImage from "../../components/CircleImage/CircleImage"
import Wrapper from "../../hoc/Wrapper";
import loginWallPaper from '../../assets/images/illustration_login.png';


function LoginPage(props) {
    const history = useHistory();
    const [login, setLogin] = useState(false)
    const app = useContext(AppContext)
    const user = useContext(UserContext)

    const changeSideBarHandler = () => {
        setLogin(login)
    }

    const signinHandler = (form_variables) => {
        app.openLoadingHandler()
        const payload = {
            "username": form_variables.email_username,
            "password": form_variables.password
        }
        axios.post("/api/auth/login/", payload).then((response) => {
            user.setUserInformation({
                isAuth: true,
                token: response.data.token,
                pk: response.data.user.pk,
                firstName: response.data.user.first_name,
                lastName: response.data.user.last_name,
                username: response.data.user.username,
                email: response.data.user.email,
                password: response.data.user.password
            })
            axios.defaults.headers.common['Authorization'] = "JWT " + response.data.token
            history.push("/home")
        }).catch((error) => {
            app.openMessageDialogHandler({
                messageType: "error",
                messageText: ''
            })
            console.log(error.response?.data)
        }).finally(() => {
            app.closeLoadingHandler()
        })
    }

    return (
        <Wrapper>
            <div className="login">
                <div className={`sidebar-container  ${login ? 'sidebar-container--left' : 'sidebar-container--right'}`}>
                    <h1 style={{
                        marginBottom: "5vh"
                    }}>ورود به حساب کاربری</h1>
                    <img src={loginWallPaper}></img>
                </div>
                <div className={`login__welcome-back ${login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                </div>
                <div className={`login__hello-container ${!login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                </div>
                <div className={`login__create-container ${login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                    <CircleImage></CircleImage>
                    <SigninForm signinHandler={signinHandler} changeSideBarHandler={changeSideBarHandler}></SigninForm>
                </div>
                <div className={`login__login-container ${!login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                    <CircleImage></CircleImage>
                    <SigninForm signinHandler={signinHandler} changeSideBarHandler={changeSideBarHandler}></SigninForm>
                </div>
            </div>
        </Wrapper>
    );
}

export default LoginPage