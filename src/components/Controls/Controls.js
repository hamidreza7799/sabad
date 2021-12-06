import React from "react";
import { observer, inject } from "mobx-react";
import { CheckOutlined, CheckCircleOutlined } from "@ant-design/icons";

import Hint from "../Hint/Hint";
import styles from "./Controls.module.scss";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const TOOLTIP_DELAY = 0.8;

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

export default inject("store")(
  observer(({ item, store }) => {
    /**
     * Buttons of Controls
     */
    let buttons = {
      skip: "",
      update: "",
      submit: "",
    };

    const { userGenerate, sentUserGenerate } = item;
    const { enableHotkeys, enableTooltips } = store.settings;

    /**
     * Task information
     */
    let taskInformation;
    if (store.task) {
      taskInformation = <h4 className={styles.task + " ls-task-info"}>Task ID: {store.task.id}</h4>;
    }

    /**
     * Hotkeys
     */
    if (enableHotkeys && enableTooltips) {
      buttons.submit = <Hint> [ Ctrl+Enter ]</Hint>;
      buttons.skip = <Hint> [ Ctrl+Space ]</Hint>;
      buttons.update = <Hint> [ Alt+Enter] </Hint>;
    }

    let skipButton;
    let updateButton;
    let submitButton;
    let back;

    /**
     * Check for Predict Menu
     */
    back = (
      <BootstrapTooltip title="تسک قبلی">
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          sx={{ direction: "ltr", fontSize: "1rem", minWidth: "110px", color: "black", border: "solid 1px" }}
          onClick={store.skipTask}
        >
          بازگشت
        </Button>
        {/* <Button
        type="primary"
        icon={<CheckCircleOutlined />}
        onClick={store.updateCompletion}
        className="ls-update-btn"
      >
        Update {buttons.update}
      </Button> */}
      </BootstrapTooltip>
    );
    if (!store.completionStore.predictSelect || store.explore) {
      // if (store.hasInterface("skip")) {
      //   skipButton = (
      //     <Tooltip title="Skip task: [ Ctrl+Space ]" mouseEnterDelay={TOOLTIP_DELAY}>
      //       <Button type="ghost" onClick={store.skipTask} className={styles.skip + " ls-skip-btn"}>
      //         Skip {buttons.skip}
      //       </Button>
      //     </Tooltip>
      //   );
      // }

      if ((userGenerate && !sentUserGenerate) || (store.explore && !userGenerate && store.hasInterface("submit"))) {
        submitButton = (
          <BootstrapTooltip title="Save results: [ Ctrl+Enter ]">
            <Button
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faCheck} />}
              sx={{ direction: "ltr", fontSize: "1rem", minWidth: "110px" }}
              onClick={store.submitCompletion}
              color="success"
            >
              تایید
            </Button>
          </BootstrapTooltip>
        );
      }

      if ((userGenerate && sentUserGenerate) || (!userGenerate && store.hasInterface("update"))) {
        updateButton = (
          <BootstrapTooltip title="Update this task: [ Alt+Enter ]">
            <Button
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faPencilAlt} />}
              sx={{ direction: "ltr", fontSize: "1rem", minWidth: "110px" }}
              onClick={store.updateCompletion}
              color="success"
            >
              آپدیت
            </Button>
          </BootstrapTooltip>
        );
      }
    }

    let content = (
      <div
        className={styles.block}
        style={{
          width: "100%",
        }}
      >
        <div
          className={styles.wrapper}
          style={{
            direction: "ltr",
            justifyContent: "start",
          }}
        >
          <div className={styles.container}>{back}</div>
          <div className={styles.container}>
            {/* {skipButton} */}
            {updateButton}
            {submitButton}
          </div>
        </div>
      </div>
    );

    return (item.type === "completion" || store.explore) && content;
  }),
);
