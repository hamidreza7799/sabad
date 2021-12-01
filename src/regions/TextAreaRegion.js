import React from "react";
import { observer, inject } from "mobx-react";
import { types, getParentOfType } from "mobx-state-tree";

import { Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import WithStatesMixin from "../mixins/WithStates";
import NormalizationMixin from "../mixins/Normalization";
import RegionsMixin from "../mixins/Regions";
import Registry from "../core/Registry";
import { TextAreaModel } from "../tags/control/TextArea";
import { guidGenerator } from "../core/Helpers";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./TextAreaRegion.css";
import styles from "./TextAreaRegion/TextAreaRegion.module.scss";
import "antd/dist/antd.css";

const { Paragraph, Text } = Typography;

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

const Model = types
  .model("TextAreaRegionModel", {
    id: types.optional(types.identifier, guidGenerator),
    pid: types.optional(types.string, guidGenerator),
    type: "textarearegion",

    _value: types.string,
    // states: types.array(types.union(ChoicesModel)),
  })
  .views(self => ({
    get parent() {
      return getParentOfType(self, TextAreaModel);
    },
  }))
  .actions(self => ({
    setValue(val) {
      self._value = val;
    },
  }));

const TextAreaRegionModel = types.compose(
  "TextAreaRegionModel",
  WithStatesMixin,
  RegionsMixin,
  NormalizationMixin,
  Model,
);

const HtxTextAreaRegionView = ({ store, item, editTag }) => {
  const classes = [styles.mark];
  const params = {};
  const { parent } = item;
  const { relationMode } = item.completion;

  if (relationMode) {
    classes.push(styles.relation);
  }

  if (item.selected) {
    classes.push(styles.selected);
  } else if (item.highlighted) {
    classes.push(styles.highlighted);
  }

  if (parent.editable) {
    params["editable"] = {
      onChange: str => {
        item.setValue(str);

        // here we update the parent object's state
        if (parent.perregion) {
          const reg = item.completion.highlightedNode;
          reg && reg.updateSingleState(parent);

          // self.regions = [];
        }
      },
    };
  }

  let divAttrs = {};
  if (!parent.perregion) {
    divAttrs = {
      onClick: item.onClickRegion,
      onMouseOver: () => {
        if (relationMode) {
          item.setHighlight(true);
        }
      },
      onMouseOut: () => {
        /* range.setHighlight(false); */
        if (relationMode) {
          item.setHighlight(false);
        }
      },
    };
  }

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <BootstrapTooltip title={item._value.length > 20 ? item._value : ""}>
        <div
          style={{
            width: "30%",
          }}
        >
          <Text
            style={{
              cursor: "pointer",
              backgroundColor: "#f6ffed",
              border: "solid 1px #b7eb8f",
              borderRadius: "5px",
              margin: 0,
              padding: "0.7em 1em",
              direction: "rtl",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            ellipsis={{
              tooltip: "",
            }}
          >
            {item._value}
          </Text>
        </div>
      </BootstrapTooltip>
      <BootstrapTooltip title={"ویرایش"}>
        <IconButton
          className={"edit-button"}
          onClick={ev => {
            const reg = item.completion.highlightedNode;
            item.completion.deleteRegion(item);

            reg && reg.updateSingleState(parent);
            console.log(item._value);
            item.setValue(item._value);
            editTag(item);
            ev.preventDefault();
            return false;
          }}
          sx={{
            color: "#3f407d",
          }}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </IconButton>
      </BootstrapTooltip>
      <BootstrapTooltip title={"حذف"}>
        <IconButton
          className={"delete-button"}
          onClick={ev => {
            const reg = item.completion.highlightedNode;
            item.completion.deleteRegion(item);

            reg && reg.updateSingleState(parent);

            ev.preventDefault();
            return false;
          }}
          sx={{
            color: "red",
            "&:after": {
              content: '""',
              position: "absolute",
              height: "50%",
              display: "block",
              left: 0,
              width: "1px",
              bgcolor: "black",
            },
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </BootstrapTooltip>
    </div>
  );
};

const HtxTextAreaRegion = inject("store")(observer(HtxTextAreaRegionView));

Registry.addTag("textarearegion", TextAreaRegionModel, HtxTextAreaRegion);

export { TextAreaRegionModel, HtxTextAreaRegion };
