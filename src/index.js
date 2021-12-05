import React from "react"
import reactDom from "react-dom"

import './index.css'
import App from "./App"
import './Theme/Theme.css'

import { Provider } from "mobx-react";

import "./assets/styles/global.scss";
import AnnotateApp from "./components/AnnotateApp/AnnotateApp"
import AppStore from "./stores/AppStore";
import ProductionEnvironment from "./env/production";



// const environment = ProductionEnvironment;

// window.LabelStudio = function (element, options) {
//     let params = options;

//     if (params && params.task) {
//         params.task = environment.getData(params.task);
//     }

//     /**
//      * Configure Application
//      */
//     const app = AppStore.create(params, environment.configureApplication(params));

//     /**
//      * Initialize store
//      */
//     app.initializeStore(environment.getState(params.task));
//     reactDom.render(<Provider store={app}><AnnotateApp /></Provider>, environment.rootElement(element))

//     window.Htx = app;
//     return app;
// };

reactDom.render(<App />, document.getElementById("root"))

