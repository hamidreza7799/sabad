import { createTheme } from "@mui/material"

const MUITheme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: "#1784d9"
        },
        secondary: {
            main: "#4c4c4c"
        },
        third: {
            main: "#ff5959"
        },
        error: {
            main: "#d32f2f"
        },
        warning: {
            main: "#ffa000"
        },
        success: {
            main: "#388e3c"
        },
        tonalOffset: 0.2,
    },

    typography: {
        body1: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        body2: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h1: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h2: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h3: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h4: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h5: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        h6: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        button: {
            fontFamily: 'IRANSansWeb',
        },
        subtitle1: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        subtitle2: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
        caption: {
            fontFamily: 'IRANSansWeb',
            color: "#3f407d",
        },
    },
})