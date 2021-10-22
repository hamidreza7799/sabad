import React from "react"
import Wrapper from "../../hoc/Wrapper"
import SabadAppBar from "../../components/AppBar/AppBar"
import './HomePage.css'


class HomePage extends React.Component{
    render() {
        return (
            <Wrapper>
                <SabadAppBar />
            </Wrapper>
        )
    }
}

export default HomePage