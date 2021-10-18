import React from 'react';
import { CircleToBlockLoading } from 'react-loadingg';
import { Backdrop } from '@mui/material'
import './Loader.css'

const Loader = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex:100}}
            open={props.isLoading}
        >
            <CircleToBlockLoading color='#1784d9' size='large' />
        </Backdrop>
    )
}
export default Loader;

