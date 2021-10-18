import React from "react"
import { TextValidator } from "react-material-ui-form-validator"

import './ValidatorInput.css'

const ValidatorInput = (props) => {
    return (
        <TextValidator {...props}></TextValidator>
    )
}

export default ValidatorInput