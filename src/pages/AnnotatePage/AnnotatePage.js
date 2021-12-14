import React from "react";
import Wrapper from '../../hoc/Wrapper';
import MessageSnackbar from "../../components/UI/Snackbar/MessageSnackbar/MessageSnackbar";
import AnnotateApp from "../../components/AnnotateApp/AnnotateApp";
import { Provider } from "mobx-react";
import AppStore from "../../stores/AppStore";
import ProductionEnvironment from "../../env/production";
import AppContext from '../../context/AppContext';
import axios from '../../axios';
import Cookie from "js-cookie";
import './AnnotatePage.css'

const environment = ProductionEnvironment;

const _prepData = function (completions, username) {
    const data = completions.serializeCompletion();
    const body = JSON.stringify({
        lead_time: (new Date() - completions.loadedDate) / 1000, // task execution time
        result: data,
        createdBy: username,
        createdDate: completions.createdDate,
    });
    return body;
};


class AnnotatePage extends React.Component {

    static contextType = AppContext

    constructor(props) {
        super(props)
        this.state = {
            snackbarIsOpen: false,
            store: null,
            baseUrl: '',
            main_dataset_id: -1,
        }
    }

    closeSnackbarHandler = () => {
        this.setState({
            ...this.state,
            snackbarIsOpen: false
        })
    }

    getAnnotateData = (baseUrl) => {
        this.context.openLoadingHandler()
        let params;
        const templateUrl = baseUrl
        const dataUrl = `${baseUrl}data/`
        console.log(dataUrl)
        axios.defaults.headers.common['Authorization'] = Cookie.get("token")
        axios.get(templateUrl).then((templateResponse) => {
            axios.get(dataUrl).then((dataRespose) => {
                params = {
                    config: `${templateResponse.data.type.config.replaceAll("\r\n", "")}`,
                    description: "توضیحات",
                    interfaces: templateResponse.data.type.interface.replaceAll(" ", "").split(',').concat(['submit', 'controls', 'skip', 'update', 'panel', 'side-column', 'completions:menu', 'completions:add-new', 'completions:delete', 'predictions:menu']),
                    user: {
                        "id": Cookie.get("pk"),
                        "first_name": Cookie.get("firstName"),
                        "last_name": Cookie.get("lastName"),
                        "username": Cookie.get("username"),
                        "email": Cookie.get("email"),
                    },
                    task: {
                        completions: (dataRespose.data?.completions.length > 0) ? dataRespose.data.completions: [{result:[]}],
                        predictions: dataRespose.data.predictions,
                        id: 1,
                        data: dataRespose.data.data,
                    },
                    onUpdateCompletion: (ls, completion) => { this.onUpdateCompletion(ls, completion) },
                    onSubmitCompletion: (ls, completion) => { this.onSubmitCompletion(ls, completion) },
                    onSkipTask: (ls) => { this.onSkipTask(ls) },
                }
                params.task = environment.getData(params.task);
                const app = AppStore.create(params, environment.configureApplication(params));
                app.initializeStore(environment.getState(params.task));
                this.setState({
                    ...this.state,
                    store: app,
                    main_dataset_id: dataRespose.data.main_dataset_id,
                    snackbarIsOpen: true,
                })
            })
        }).catch((error) => {
            this.context.openMessageDialogHandler({
                messageType: "error",
                messageText: error.response?.data.detail
            })
        }).finally(() => {
            this.context.closeLoadingHandler()
        })
    }

    onUpdateCompletion = (ls, completion) => {
        this.context.openLoadingHandler()
        const completions = _prepData(completion, Cookie.get("username"))
        if (JSON.parse(completions).result[0] == undefined) {
            this.context.closeLoadingHandler()
            this.context.openMessageDialogHandler({
                messageType: "error",
                messageText: ''
            })
        } else {
            axios.defaults.headers.common['Authorization'] = Cookie.get("token")
            axios.patch(`${this.state.baseUrl}data/${this.state.main_dataset_id.toString()}/`, { completions: completions }).then((response) => {
                this.getAnnotateData(this.state.baseUrl)
            }).catch((error) => {
                this.context.openMessageDialogHandler({
                    messageType: "error",
                    messageText: error.response?.data.detail,
                })
            }).finally(() => {
                this.context.closeLoadingHandler()
            })
        }

    }

    onSubmitCompletion = (ls, completion) => {
        this.context.openLoadingHandler()
        const completions = _prepData(completion, Cookie.get("username"))
        if (JSON.parse(completions).result[0] == undefined) {
            this.context.closeLoadingHandler()
            this.context.openMessageDialogHandler({
                messageType: "error",
                messageText: ''
            })
        } else {
            axios.defaults.headers.common['Authorization'] = Cookie.get("token")
            axios.patch(`${this.state.baseUrl}data/${this.state.main_dataset_id.toString()}/`, { completions: completions }).then((response) => {
                this.getAnnotateData(this.state.baseUrl)
            }).catch((error) => {
                this.context.openMessageDialogHandler({
                    messageType: "error",
                    messageText: error.response?.data.detail,
                })
            }).finally(() => {
                this.context.closeLoadingHandler()
            })
        }
    }

    onSkipTask = (ls) => {
        this.context.openLoadingHandler()
        axios.defaults.headers.common['Authorization'] = Cookie.get("token")
        axios.post(`${this.state.baseUrl}back/`).then((response) => {
            this.getAnnotateData(this.state.baseUrl)
        }).catch((error) => {
            this.context.openMessageDialogHandler({
                messageType: "error",
                messageText: error.response?.data.detail,
            })
        }).finally(() => {
            this.context.closeLoadingHandler()
        })

    }

    componentDidMount() {
        const baseUrl = `/api/project/${this.props.match.params.username}/${this.props.match.params.projectSlug}/task/${this.props.match.params.taskSlug}/`
        this.getAnnotateData(baseUrl)
        this.setState({
            ...this.state,
            baseUrl: baseUrl
        })
    }



    render() {
        if (this.state.store) {
            return (
                <Wrapper>
                    <MessageSnackbar isOpen={this.state.snackbarIsOpen} messageType={"success"} messageText={"موفقیت‌آمیز بود"} closeHnadler={this.closeSnackbarHandler}/>
                    <Provider store={this.state.store}>
                        <AnnotateApp />
                    </Provider>
                </Wrapper>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default AnnotatePage