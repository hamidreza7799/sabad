import React from 'react'
import { Backdrop } from '@mui/material'
import { Modal } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'
import './ErrorModal.css'


class ErrorModal extends React.Component {

    render() {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={true}
            >

                <Alert id="modal-modal-title" variant="filled" severity="error" onClose={() => {}}>
                    <AlertTitle>Error</AlertTitle>
                    This is an error alert — <strong>check it out!</strong>
                </Alert>

            </Backdrop>
        )
    }
}

export default ErrorModal