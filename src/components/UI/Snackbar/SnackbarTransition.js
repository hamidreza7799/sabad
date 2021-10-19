import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';

export function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export function GrowTransition(props) {
    return <Grow {...props} />;
}