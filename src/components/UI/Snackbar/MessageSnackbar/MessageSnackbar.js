import React from "react"
import Snackbar from '@mui/material/Snackbar'
import RTL from "../../../../hoc/RTL/RTL"
import { SlideTransition, GrowTransition } from "../SnackbarTransition"
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class MessageSnackbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,

        }
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            isOpen: false,
        });
    };

    render() {
        return (
            <RTL>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    spacing={3}
                    sx={{ width: "17%" }}
                    open={this.state.isOpen}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    TransitionComponent={SlideTransition}
                    key={SlideTransition.name}
                >
                    <Alert
                        dir='rtl'
                        onClose={this.handleClose}
                        severity={this.props.messageType}
                        sx={{ width: '100%', height: '5vh', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        {this.props.messageText}
                    </Alert>
                </Snackbar>
            </RTL>
        )
    }
}

export default MessageSnackbar