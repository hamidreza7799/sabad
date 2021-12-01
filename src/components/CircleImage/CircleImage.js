import React from "react"
import { Card } from "@mui/material"
import { CardMedia } from "@mui/material"
import './CircleImage.css'
import logo from '../../assets/images/logo.jpg';

const CircleImage = (props) => {
    return (
        <Card sx={{ maxWidth: 200 }} className='circle-card'>
            <CardMedia
                className='circle-media'
                component="img"
                image={logo}
                alt="green iguana"
            />
        </Card>
    )
}

export default CircleImage