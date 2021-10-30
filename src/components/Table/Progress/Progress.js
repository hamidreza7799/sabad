import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    progressRootSuccess: {
        "& span": {
            backgroundColor: theme.palette.success.main
        }
    },
    progressRootWarning: {
        "& span": {
            backgroundColor: theme.palette.warning.main
        }
    },
    progressRootError: {
        "& span": {
            backgroundColor: theme.palette.error.main
        }
    }
}))


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

function LinearProgressWithLabel(props) {
    const classes = styles()
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Box sx={{ minWidth: 35, marginRight: 1}}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box> */}
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress variant="determinate" value={props.value} className={props.value === 100 ? classes.progressRootSuccess : props.value < 50 ? classes.progressRootError: classes.progressRootWarning}/>
            </Box>
        </Box>
    );
}


export default function ProgressBars(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <LinearProgressWithLabel value={props.value} />
        </Box>
    );
}
