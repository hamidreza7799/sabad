import React from "react"
import { Slide } from "@mui/material"

const DialogTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default DialogTransition