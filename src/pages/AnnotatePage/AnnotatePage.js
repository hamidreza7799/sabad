import React from "react";
import ReactDOM from "react-dom";
import AnnotateApp from "../../components/AnnotateApp/AnnotateApp";
import { Provider } from "mobx-react";
import AppStore from "../../stores/AppStore";
import ProductionEnvironment from "../../env/production";

const environment = ProductionEnvironment;

class AnnotatePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            store: 'null'
        }
    }

    componentDidMount() {
        console.log("This is in annotate page component did mount")
        let params = {
            config:
                `<View>
      <Labels name="labels" toName="audio">
          <Label value="گوینده ۱" alias="s1" background="#F7DC6F"/>
  
      </Labels>
        <AudioPlus name="audio" value="$videoSource"/>
  
    <View visibleWhen="region-selected">
      <Header value="متن گوینده ها" />
    </View>
  
    <TextArea name="transcription" toName="audio"
              rows="4" editable="true" maxSubmissions="2"
              perRegion="true" required="true" />
    <View>
  <Header value="آیا بازه بندی انجام شده است؟"/>
  <Choices name="topic" toName="audio" showInline="true"  choice="single-radio">
  
    <Choice value="تایید"/>
    <Choice value="اصلاح"/>
    <Choice value="مشکل ابتدا و انتها"/>
    <Choice value="سایر"/>
  </Choices>
  </View>
  </View>
  
                    `
            ,
            description: "Description",
            user: {
                pk: 1,
                firstName: "حمیدرضا",
                lastName: "آذرباد"
            },
            interfaces: [
                "panel",
                "update",
                "controls",
                "side-column",
                "completions:menu",
                "completions:add-new",
                "completions:delete",
                "predictions:menu",
            ],
            task: {
                completions: [
                    {
                        result: []
                    }
                ],
                annotations: [],
                predictions: [],
                id: 1,
                data: {
                    videoSource: "http://185.208.77.203:8000/media/user_chitchat/project_armanocr/test-aparat3/data/video/00716_0.mp4"
                }
            }
        };

        if (params && params.task) {
            params.task = environment.getData(params.task);
        }

        /**
         * Configure Application
         */
        const app = AppStore.create(params, environment.configureApplication(params));

        /**
         * Initialize store
         */
        app.initializeStore(environment.getState(params.task));
        this.setState({
            store: app
        })

        console.log(this.state.store)
    }

    render() {
        console.log("This is in annotate page")
        let params = {
            config:
                `<View>
      <Labels name="labels" toName="audio">
          <Label value="گوینده ۱" alias="s1" background="#F7DC6F"/>
  
      </Labels>
        <AudioPlus name="audio" value="$videoSource"/>
  
    <View visibleWhen="region-selected">
      <Header value="متن گوینده ها" />
    </View>
  
    <TextArea name="transcription" toName="audio"
              rows="4" editable="true" maxSubmissions="2"
              perRegion="true" required="true" />
    <View>
  <Header value="آیا بازه بندی انجام شده است؟"/>
  <Choices name="topic" toName="audio" showInline="true"  choice="single-radio">
  
    <Choice value="تایید"/>
    <Choice value="اصلاح"/>
    <Choice value="مشکل ابتدا و انتها"/>
    <Choice value="سایر"/>
  </Choices>
  </View>
  </View>
  
                    `
            ,
            description: "Description",
            user: {
                pk: 1,
                firstName: "حمیدرضا",
                lastName: "آذرباد"
            },
            interfaces: [
                "panel",
                "update",
                "controls",
                "side-column",
                "completions:menu",
                "completions:add-new",
                "completions:delete",
                "predictions:menu",
            ],
            task: {
                completions: [
                    {
                        result: []
                    }
                ],
                annotations: [],
                predictions: [],
                id: 1,
                data: {
                    videoSource: "http://185.208.77.203:8000/media/user_chitchat/project_armanocr/test-aparat3/data/video/00716_0.mp4"
                }
            }
        };

        if (params && params.task) {
            params.task = environment.getData(params.task);
        }

        /**
         * Configure Application
         */
        const app = AppStore.create(params, environment.configureApplication(params));

        /**
         * Initialize store
         */
        app.initializeStore(environment.getState(params.task));
        return (
            <Provider store={app}>
                <AnnotateApp />
            </Provider>
            // <h2>Helllllos</h2>
        )
    }
}

export default AnnotatePage