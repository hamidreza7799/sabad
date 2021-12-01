import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { getType } from "mobx-state-tree";
import { Form, Input, Button, Tag, Badge } from "antd";
import { DeleteOutlined, LinkOutlined, PlusOutlined, CompressOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import { NodeMinimal } from "../Node/Node";
import Hint from "../Hint/Hint";
import styles from "./Entity.module.scss";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { faTrashAlt, faCircle, faLink } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wrapper from "../Wrapper/Wrapper";
import "./Entity.css";

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

const { Paragraph, Text } = Typography;

const templateElement = element => {
  return (
    <Text key={element.pid} className={styles.labels}>
      برچسب‌ها:&nbsp;
      {element.selectedValues().map(title => {
        let bgColor = element.findLabel(title).background ? element.findLabel(title).background : "#000000";

        return (
          <Tag key={element.findLabel(title).id} color={bgColor} className={styles.tag}>
            {title}
          </Tag>
        );
      })}
    </Text>
  );
};

const RenderStates = observer(({ node }) => {
  const _render = s => {
    if (getType(s).name.indexOf("Labels") !== -1) {
      return templateElement(s);
    } else if (getType(s).name === "RatingModel") {
      return <Paragraph>Rating: {s.getSelectedString()}</Paragraph>;
    } else if (getType(s).name === "TextAreaModel") {
      const text = s.regions.map(r => r._value).join("\n");
      return (
        <Paragraph className={styles.row}>
          <Text>Text: </Text>
          <Text mark className={styles.long}>
            {text}
          </Text>
        </Paragraph>
      );
    } else if (getType(s).name === "ChoicesModel") {
      return <Paragraph>Choices: {s.getSelectedString(", ")}</Paragraph>;
    }

    return null;
  };

  return <Fragment>{node.states.filter(s => s.holdsState).map(s => _render(s))}</Fragment>;
});

export default observer(({ store, completion }) => {
  const node = completion.highlightedNode;

  return (
    <Fragment>
      {node && (
        <Wrapper>
          <p
            className={styles.row}
            style={{
              marginTop: "15px",
              direction: "rtl",
            }}
          >
            <NodeMinimal node={node} /> (id: {node.id}){" "}
            {!node.editable && <Badge count={"readonly"} style={{ backgroundColor: "#ccc" }} />}
          </p>
          <div
            className={styles.statesblk + " ls-entity-states"}
            style={{
              direction: "rtl",
              paddingRight: "10px",
            }}
          >
            {node.score && (
              <Fragment>
                <Text>
                  Score: <Text underline>{node.score}</Text>
                </Text>
              </Fragment>
            )}

            {node.normalization && (
              <Text>
                Normalization: <Text code>{node.normalization}</Text>
                &nbsp;
                <DeleteOutlined
                  type="delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    node.deleteNormalization();
                  }}
                />
              </Text>
            )}

            {node.states && <RenderStates node={node} />}
          </div>
        </Wrapper>
      )}

      {!node && (
        <p
          style={{
            marginBottom: "20px",
            direction: "rtl",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          نتیجه‌ای انتخاب‌ نشده‌است!!!
        </p>
      )}

      <div className={styles.block + " ls-entity-buttons buttons-container"}>
        {/* <Tooltip placement="topLeft" title="Hide: [h]"> */}
        {/*   <Button */}
        {/*     className={styles.button} */}
        {/*     onClick={() => { */}
        {/*         node.toggleHidden(); */}
        {/*         //node.unselectRegion(); */}
        {/*         //node.selectRegion(); */}
        {/*         // completion.startRelationMode(node); */}
        {/*     }} */}
        {/*   > */}
        {/*     { node.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined /> } */}
        {/*     {store.settings.enableHotkeys && store.settings.enableTooltips && <Hint>[ h ]</Hint>} */}
        {/*   </Button> */}
        {/* </Tooltip> */}

        <Fragment>
          <BootstrapTooltip title="Create Relation: [r]">
            <IconButton
              disabled={!(node && node.editable)}
              className={"tool-button"}
              sx={{
                color: "#3f407d",
              }}
              onClick={ev => {
                completion.startRelationMode(node);
              }}
            >
              <FontAwesomeIcon icon={faLink} />
              {store.settings.enableHotkeys && store.settings.enableTooltips && <Hint>[ r ]</Hint>}
            </IconButton>
          </BootstrapTooltip>
        </Fragment>

        <BootstrapTooltip title="Unselect: [u]">
          <IconButton
            disabled={!(node && node.editable)}
            className={"tool-button"}
            sx={{
              color: "#3f407d",
            }}
            onClick={ev => {
              completion.highlightedNode.unselectRegion();
            }}
          >
            <FontAwesomeIcon icon={faCircle} />
            {store.settings.enableHotkeys && store.settings.enableTooltips && <Hint>[ u ]</Hint>}
          </IconButton>
        </BootstrapTooltip>

        <BootstrapTooltip title="Delete Entity: [Backspace]">
          <IconButton
            disabled={!(node && node.editable)}
            className={"tool-button"}
            sx={{
              color: "red",
            }}
            onClick={ev => {
              completion.highlightedNode.deleteRegion();
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            {store.settings.enableHotkeys && store.settings.enableTooltips && <Hint>[ Bksp ]</Hint>}
          </IconButton>
        </BootstrapTooltip>
      </div>
    </Fragment>
  );
});
