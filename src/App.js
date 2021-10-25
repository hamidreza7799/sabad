import React from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wrapper from "./hoc/Wrapper"

const App = () => {
    return (
        <Wrapper>
            <Router>
                <Switch>
                    <Route path="/" exact component={null} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/home" exact component={MainPage} />
                </Switch>
            </Router>
        </Wrapper>
    )
}

export default App