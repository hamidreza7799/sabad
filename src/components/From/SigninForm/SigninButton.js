import { styled } from "@mui/system"
import { Button } from "@mui/material"

const SigninButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontWeight: 'bold',
    padding: '6px 12px',
    border: '2px solid',
    color: '#dadada',
    margin: '30px 0px',
    lineHeight: 1.5,
    backgroundColor: '#3f407d',
    borderColor: '#3f407d',
    '&:hover': {
      backgroundColor: '#3f407d',
      borderColor: '#3f407d',
      border: '2px solid',
    },
  });

export default SigninButton