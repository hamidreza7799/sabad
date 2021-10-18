import React from "react"
import { Backdrop } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, AppBar, Alert } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import DialogTransition from "../DialogTransition"
import RTL from "../../../../hoc/RTL/RTL"
import "./SuccessDialog.css"

class SuccessDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: props.isOpen,
        }
    }

    closeDialogHandle = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <RTL>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 100 }}
                    open={this.state.isOpen}
                    onClick={this.closeDialogHandle}
                >
                    <Dialog
                        open={this.state.isOpen}
                        TransitionComponent={DialogTransition}
                        keepMounted
                        onClose={this.closeDialogHandle}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        scroll={"body"}
                        maxWidth="xs"
                        fullWidth={true}
                    >
                        <Alert dir='rtl' variant="filled" severity={this.props.messageType} onClose={() => {}}>
                            خطا
                        </Alert>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Typography variant="body1" sx={{ textAlign: "center", fontWeight: "bold",}} >
                                    {this.props.messageText}
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </Backdrop>
            </RTL>
        )
    }
}

export default SuccessDialog