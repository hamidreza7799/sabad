import React from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Wrapper from "./hoc/Wrapper"

const App = () => {
    return (
        <Wrapper>
            <Router>
                <Switch>
                    <Route path="/" exact component={null} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/home" exact component={HomePage} />
                </Switch>
            </Router>
        </Wrapper>
    )
}

export default App