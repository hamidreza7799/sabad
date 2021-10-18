import React from "react"

import logo from '../../assets/images/logo.png';
import './LoginPage.css'
import SigninForm from "../../components/From/SigninForm/SigninForm"
import CircleImage from "../../components/CircleImage/CircleImage"
import { Button } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { styled } from "@mui/system"
import Loader from '../../components/UI/Loader/Loader'
import Wrapper from "../../hoc/Wrapper";
import SuccessDialog from "../../components/UI/Dialog/SuccessDialog/SuccessDialog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginPage extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            login: true,
            isLoading: false,
        };
    }



    render() {
        return (
            <Wrapper>
                <Loader isLoading={this.state.isLoading}></Loader>
                <div className="login">
                    <div className={`sidebar-container  ${this.state.login ? 'sidebar-container--left' : 'sidebar-container--right'}`}></div>
                    <div className={`login__welcome-back ${this.state.login ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                        <div className="login__welcome-back__logo-container">
                            <img className="login__welcome-back__logo-container--image" src={logo} alt="Budwriter" />
                            Budwriter
                        </div>
                        <div className="login__welcome-back__main-container">
                            <div className="login__welcome-back__main-container__text-container">
                                <span className="login__welcome-back__main-container__text-container--title">
                                    Welcome Back!
                                </span>
                            </div>
                            <SidebarButton
                                variant="contained"
                                fullWidth
                                onClick={() => {this.setState({...this.state, login: !this.state.login})}}
                                startIcon={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}
                            > ورود</SidebarButton>
                        </div>
                    </div>
                    <div className={`login__hello-container ${!this.state.login ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                        <div className="login__welcome-back__main-container__text-container">
                            <span className="login__welcome-back__main-container__text-container--title">
                                Hello, stranger!
                            </span>
                        </div>
                        <SidebarButton
                                variant="contained"
                                fullWidth
                                onClick={() => {this.setState({...this.state, login: !this.state.login})}}
                                startIcon={<ArrowBackIosNewIcon></ArrowBackIosNewIcon>}
                        >ثبت نام</SidebarButton>
                    </div>


                    <div className={`login__create-container ${this.state.login ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                        <CircleImage></CircleImage>
                        <SigninForm signinHandler={this.signinHandler}></SigninForm>
                    </div>
                    <div className={`login__login-container ${!this.state.login ? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                        <CircleImage></CircleImage>
                        <SigninForm signinHandler={this.signinHandler}></SigninForm>
                    </div>
                </div>
            </Wrapper>

        );
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    signinHandler = (form_variables) => {
        this.setState({
            ...this.state,
            isLoading: true,
        })
        this.sleep(1000 * 5).then(() => {
            console.log(form_variables)
            this.setState({
                ...this.state,
                isLoading: false
            })
        })
    }
}

const SidebarButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 20,
    padding: '6px 12px',
    border: '2px solid',
    color: '#dadada',
    margin: '30px 0px',
    lineHeight: 1.5,
    backgroundColor: '#1784d9',
    borderColor: '#dadada',
    '&:hover': {
        backgroundColor: '#736dd5',
    },
});

export default LoginPage