/**
 * Libraries
 */
import React, { Component } from "react";
import { Result, Spin } from "antd";
import { getEnv } from "mobx-state-tree";
import { observer, inject, Provider } from "mobx-react";
import MessageDialog from "../Modal/MessageDialog/MessageDialog";

/**
 * Core
 */
import Tree from "../../core/Tree";

/**
 * Components
 */
import Completions from "../Completions/Completions";
import Controls from "../Controls/Controls";
import Debug from "../Debug";
import Panel from "../Panel/Panel";
import Predictions from "../Predictions/Predictions";
import Segment from "../Segment/Segment";
import Settings from "../Settings/Settings";
import SideColumn from "../SideColumn/SideColumn";
import RTL from "../../hoc/RTL/RTL";

/**
 * Tags
 */
import * as ObjectTags from "../../tags/object"; // eslint-disable-line no-unused-vars
import * as ControlTags from "../../tags/control"; // eslint-disable-line no-unused-vars
import * as VisualTags from "../../tags/visual"; // eslint-disable-line no-unused-vars

/**
 * Styles
 */
import styles from "./AnnotateApp.module.scss";
import "./AnnotateApp.css";
import { css } from "@mui/styled-engine";

/**
 * App
 */
const AnnotateApp = inject("store")(
  observer(
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          tree: null,
          setTree: false,
        };
      }
      renderSuccess() {
        return <Result status="success" title={getEnv(this.props.store).messages.DONE} />;
      }

      renderNoCompletion() {
        return <Result status="success" title={getEnv(this.props.store).messages.NO_COMP_LEFT} />;
      }

      renderNothingToLabel() {
        return <Result status="success" title={getEnv(this.props.store).messages.NO_NEXT_TASK} />;
      }

      renderNoAccess() {
        return <Result status="warning" title={getEnv(this.props.store).messages.NO_ACCESS} />;
      }

      renderLoader() {
        return <Result icon={<Spin size="large" />} />;
      }

      _renderAll(obj) {
        if (obj.length === 1) return <Segment>{[Tree.renderItem(obj[0].root)]}</Segment>;

        return (
          <div className="ls-renderall">
            {obj.map(c => (
              <div className="ls-fade">
                <Segment>{[Tree.renderItem(c.root)]}</Segment>
              </div>
            ))}
          </div>
        );
      }

      renderAllCompletions() {
        return this._renderAll(this.props.store.completionStore.completions);
      }

      renderAllPredictions() {
        return this._renderAll(this.props.store.completionStore.predictions);
      }

      componentDidMount() {
        const rectangleLabelsModel = document.getElementById("RectangleLabelsModel");
        if (rectangleLabelsModel) {
          const viewModel = document.getElementById("ViewModel").childNodes[0];
          viewModel.classList.add("view-model");
          const sideModel = document.createElement("div");
          sideModel.setAttribute("id", "sideModel");
          sideModel.classList.add("side-model");
          viewModel.appendChild(sideModel);
          const choicesView = document.getElementById("ChoicesModel");
          sideModel.appendChild(choicesView);
          const textAreaModel = document.getElementById("TextAreaModel");
          sideModel.appendChild(textAreaModel);
          sideModel.appendChild(rectangleLabelsModel);
        }
      }

      createSuitableRoot = root => {
        let children = root.children.map(m => {
          return m.type;
        });

        children = children.sort();
        const textOnImageModels = ["rectanglelabels", "choices", "textarea", "image"].sort();

        if (children.every((val, index) => val === textOnImageModels[index])) {
          return Tree.renderItem(root, true);
        } else {
          return Tree.renderItem(root);
        }
      };

      render() {
        const self = this;
        const { store } = self.props;
        const cs = store.completionStore;
        const root = cs.selected && cs.selected.root;
        const { settings } = store;

        const elements = this.createSuitableRoot(root);

        if (store.isLoading) return self.renderLoader();

        if (store.noTask) return self.renderNothingToLabel();

        if (store.noAccess) return self.renderNoAccess();

        if (store.labeledSuccess) return self.renderSuccess();

        if (!root) return self.renderNoCompletion();

        const stEditor = settings.fullscreen ? styles.editorfs : styles.editor;
        const stCommon = settings.bottomSidePanel ? styles.commonbsp : styles.common;
        const stMenu = settings.bottomSidePanel ? styles.menubsp : styles.menu;

        return (
          <RTL>
            <div className={stEditor + " ls-editor" + " app-container"}>
              <Settings store={store} />
              <Provider store={store}>
                <div>
                  {store.hasInterface("panel") && <Panel store={store} />}

                  {store.showingDescription && (
                    <MessageDialog
                      isOpen={store.showingDescription}
                      closeDialog={() => {
                        if (store.showingDescription) {
                          store.toggleDescription();
                          console.log("Close");
                        }
                      }}
                      messageText={store.description}
                    />
                  )}

                  {/* <div className={styles.pins}> */}
                  {/*   <div style={{ width: "100%", marginRight: "20px" }}><PushpinOutlined /></div> */}
                  {/*   <div className={styles.pinsright}><PushpinOutlined /></div> */}
                  {/* </div> */}

                  <div className={stCommon + " ls-common segment-container-left-menu"}>
                    {!cs.viewingAllCompletions && !cs.viewingAllPredictions && (
                      <Segment
                        className={
                          settings.bottomSidePanel
                            ? ""
                            : styles.segment + " ls-segment segment-block-container-left-menu"
                        }
                      >
                        {elements}
                        {/* {this.state.tree} */}
                        {store.hasInterface("controls") && <Controls item={cs.selected} />}
                      </Segment>
                    )}
                    {cs.viewingAllCompletions && this.renderAllCompletions()}
                    {cs.viewingAllPredictions && this.renderAllPredictions()}

                    <div className={stMenu + " ls-menu"}>
                      {store.hasInterface("completions:menu") && <Completions store={store} />}
                      {/* {store.hasInterface("predictions:menu") && <Predictions store={store} />} */}
                      {store.hasInterface("side-column") && !cs.viewingAllCompletions && !cs.viewingAllPredictions && (
                        <SideColumn store={store} />
                      )}
                    </div>
                  </div>
                </div>
              </Provider>
              {store.hasInterface("debug") && <Debug store={store} />}
            </div>
          </RTL>
        );
      }
    },
  ),
);

export default AnnotateApp;
