import React from "react"
import Snackbar from '@mui/material/Snackbar'
import RTL from "../../../../hoc/RTL/RTL"
import { SlideTransition, GrowTransition } from "../SnackbarTransition"
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class MessageSnackbar extends React.Component {
    render() {
        return (
            <RTL>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    spacing={3}
                    sx={{ width: "17%" }}
                    open={this.props.isOpen}
                    autoHideDuration={2000}
                    onClose={this.props.closeHnadler}
                    TransitionComponent={SlideTransition}
                    key={SlideTransition.name}
                >
                    <Alert
                        dir='rtl'
                        onClose={this.props.closeHnadler}
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