import React from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { faCompressArrowsAlt, faExpandArrowsAlt, faCog, faQuestion } from "@fortawesome/free-solid-svg-icons";

import {
  UndoOutlined,
  RedoOutlined,
  SettingOutlined,
  RollbackOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";

import styles from "./Panel.module.scss";
import Hint from "../Hint/Hint";
import "./Panel.css";

/**
 * Panel component with buttons:
 * Undo
 * Redo
 * Reset
 * Show Instructions
 * Settings
 */

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default observer(({ store }) => {
  const { history } = store.completionStore.selected;

  return (
    <div className={styles.container + " ls-panel panel-container"}>
      <div className={`${styles.block} ${styles.block__controls}`}>
        <Button
          type="ghost"
          icon={<UndoOutlined />}
          onClick={ev => {
            history && history.canUndo && history.undo();
            ev.preventDefault();
          }}
        >
          Undo
          {store.settings.enableHotkeys && store.settings.enableTooltips && <Hint>[ Ctrl+z ]</Hint>}
        </Button>
        <Button
          type="ghost"
          icon={<RedoOutlined />}
          onClick={ev => {
            history && history.canRedo && history.redo();
            ev.preventDefault();
          }}
        >
          Redo
        </Button>
        <Button
          type="ghost"
          icon={<RollbackOutlined />}
          onClick={ev => {
            history && history.reset();
          }}
        >
          Reset
        </Button>
        {store.setPrelabeling && (
          <Button
            style={{ display: "none" }}
            onClick={ev => {
              store.resetPrelabeling();
            }}
          >
            {" "}
            Reset Prelabeling
          </Button>
        )}
      </div>

      <div className={styles.block}>
        <IconButton
          className={"tool-button"}
          sx={{
            color: "#3f407d",
          }}
          onClick={ev => {
            store.settings.toggleFullscreen();
            ev.preventDefault();
            return false;
          }}
        >
          <FontAwesomeIcon icon={store.settings.fullscreen ? faExpandArrowsAlt : faCompressArrowsAlt} />
        </IconButton>
        {store.description && store.showingDescription && (
          <BootstrapTooltip title={"توضیحات برنامک"}>
            <IconButton
              className={"tool-button"}
              sx={{
                color: "#3f407d",
              }}
              onClick={ev => {
                store.toggleDescription();
              }}
            >
              <FontAwesomeIcon icon={faQuestion} />
            </IconButton>
          </BootstrapTooltip>
        )}
        {store.description && !store.showingDescription && (
          <BootstrapTooltip title={"توضیحات برنامک"}>
            <IconButton
              className={"tool-button"}
              sx={{
                color: "#3f407d",
              }}
              onClick={ev => {
                store.toggleDescription();
              }}
            >
              <FontAwesomeIcon icon={faQuestion} />
            </IconButton>
          </BootstrapTooltip>
        )}

        <BootstrapTooltip title={"تنظیمات"}>
          <IconButton
            className={"tool-button"}
            sx={{
              color: "#3f407d",
            }}
            onClick={ev => {
              store.toggleSettings();
              ev.preventDefault();
              return false;
            }}
          >
            <FontAwesomeIcon icon={faCog} />
          </IconButton>
        </BootstrapTooltip>
      </div>
    </div>
  );
});
