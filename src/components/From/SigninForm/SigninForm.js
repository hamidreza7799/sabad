import React from "react"
import Wrapper from "../../../hoc/Wrapper"
import { ValidatorForm } from "react-material-ui-form-validator"
import { IconButton, Grid, Button, Checkbox, FormControlLabel } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { AccountCircle, Visibility, VisibilityOff, } from "@mui/icons-material"
import Divider from '@mui/material/Divider';
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ValidatorInput from '../../UI/Input/ValidatorInput/ValidatorInput'
import './SigninForm.css'
import RTL from '../../../hoc/RTL/RTL'

class SigninForm extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            email_username: '',
            password: '',
            showPassword: false,
            rememberMe: false,
        }
    }

    componentDidMount(){
        const lastRememberMe = localStorage.getItem("sabadRemeberMe")
        console.log(lastRememberMe)
        if(lastRememberMe){
            console.log("In Comojefsadjflksjd")
            console.log(localStorage.getItem("sabadUsername"))
            this.setState({
                ...this.state,
                email_username: localStorage.getItem("sabadUsername"),
                password: localStorage.getItem("sabadPassword"),
                rememberMe: true,
            })
        }
    }


    emailUsernameHandler = (event) => {
        this.setState({
            ...this.state,
            email_username: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    showPasswordHandler = () => {
        this.setState({
            ...this.state,
            showPassword: !this.state.showPassword
        })
    }

    rememberMeHandler = (event) => {
        this.setState({
            ...this.state,
            rememberMe: !this.state.rememberMe
        })
    }

    render() {
        return (
            <Wrapper>
                <RTL>
                    <ValidatorForm className="validate-form">
                        <Grid container rowSpacing={0} justifyContent="space-between">
                            <Grid item xs={12}>
                                <ValidatorInput
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email_username"
                                    label="نام کاربری یا ایمیل"
                                    name="email_username"
                                    dir='rtl'
                                    autoComplete="email_username"
                                    value={this.state.email_username}
                                    onChange={this.emailUsernameHandler}
                                    InputLabelProps={{ style: { fontFamily: 'IRANSansWeb' } }}
                                    validators={['required']}
                                    errorMessages={['لطفا نام کاربری یا ایمیل خود را وارد کنید']}
                                    InputProps={{
                                        style: { fontFamily: 'IRANSansWeb' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ValidatorInput
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="رمز عبور"
                                    dir='rtl'
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password}
                                    onChange={this.passwordHandler}
                                    InputLabelProps={{ style: { fontFamily: 'IRANSansWeb' } }}
                                    validators={['required', 'minStringLength:' + 6]}
                                    errorMessages={['لطفا رمز عبور خود را وارد کنید', 'رمز عبور باید بیشتر از ۶ حرف باشد']}
                                    errorStyle={{ style: { color: 'red', fontFamily: 'IRANSansWeb' } }}
                                    errorText={{ style: { color: 'red', fontFamily: 'IRANSansWeb' } }}
                                    InputProps={{
                                        style: { fontFamily: 'IRANSansWeb' },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    style={{ padding: "1px" }}
                                                    onClick={this.showPasswordHandler}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item container justifyContent="space-between">
                                <Button href="#text-buttons" className={"dark-blue"}>فراموشی رمز عبور؟</Button>
                                <FormControlLabel 
                                    onChange={this.rememberMeHandler}
                                    checked={this.state.rememberMe} 
                                    control={<Checkbox defaultChecked className={"dark-blue"} />} 
                                    label="مرا به خاطر بسپار" 
                                    labelPlacement="start" 
                                    sx={{
                                    marginLeft: "-2%"
                                }} />
                            </Grid>
                            <Grid item container justifyContent="space-between" marginTop="1vh">
                                <Grid item xs={5}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={"login-button"}
                                        sx={{
                                            fontWeight: "bold",
                                            backgroundColor: "#3f407d"
                                        }}
                                        onClick={() => { this.props.signinHandler(this.state) }}
                                        fullWidth
                                        dir='rtl'
                                        endIcon={<LoginIcon fontSize='large' />}
                                    >
                                        ورود
                                    </Button>
                                </Grid>
                                <Grid item xs={5}>
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        className={"signup-button"}
                                        sx={{
                                            color: "#3f407d",
                                            fontWeight: "bold",
                                            border: "2px solid",
                                            borderColor: "#3f407d",
                                            '&:hover': {
                                                border: '2px solid',
                                                borderColor: "#3f407d"
                                            },

                                        }}
                                        onClick={this.props.changeSideBarHandler}
                                        fullWidth
                                        dir='rtl'
                                        endIcon={<PersonAddIcon fontSize='large' />}
                                    >
                                        ثبت نام
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid item container justifyContent="center" marginTop="5vh">
                                <Divider sx={{
                                    width: "100%",

                                }} />
                                <Grid xs={6} item container justifyContent="space-evenly">
                                    <Grid item>
                                        <IconButton aria-label="google-icon" size="large">
                                            <GoogleIcon fontSize="inherit" color="error" />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="linkedin-icon" size="large">
                                            <LinkedInIcon fontSize="inherit" color="warning" />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="facebook-icon" size="large">
                                            <FacebookIcon fontSize="inherit" color="info" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ValidatorForm>

                </RTL>
            </Wrapper>
        )
    }
}

export default SigninForm