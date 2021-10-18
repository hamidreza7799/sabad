import React from "react"
import Wrapper from "../../../hoc/Wrapper"
import { ValidatorForm } from "react-material-ui-form-validator"
import { IconButton } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { AccountCircle, Visibility, VisibilityOff, } from "@mui/icons-material"
import LoginIcon from '@mui/icons-material/Login';
import SigninButton from "./SigninButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

    render() {
        return (
            <Wrapper>
                <RTL>
                    <ValidatorForm className="validate-form">
                        <ValidatorInput
                            variant="filled"
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

                        <ValidatorInput
                            variant="filled"
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
                                            style={{padding: "1px"}}
                                            onClick={this.showPasswordHandler}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>)
                            }}
                        />
                        <SigninButton
                            type="submit"
                            variant="outlined"
                            className="button"
                            onClick={() => { this.props.signinHandler(this.state) }}
                            fullWidth
                            dir='rtl'
                            endIcon={<LoginIcon fontSize='large' />}
                        >
                            ورود
                        </SigninButton>
                    </ValidatorForm>
                </RTL>
            </Wrapper>
        )
    }
}

export default SigninForm