import React, { Component, useState } from "react";
import { Button, Popconfirm, Card } from "antd";
import { observer } from "mobx-react";
import { DeleteOutlined } from "@ant-design/icons";

import Hint from "../Hint/Hint";
import Entities from "../Entities/Entities";
import Entity from "../Entity/Entity";
import Relations from "../Relations/Relations";
import styles from "./SideColumn.module.scss";

import RTL from "../../hoc/RTL/RTL";
import Wrapper from "../Wrapper/Wrapper";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPlusSquare,
  faCaretDown,
  faCaretUp,
  faLightbulb,
  faMarker,
  faBook,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Component Side with:
 * Completions
 * Entities
 * Relations
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

class SideColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openListItem: true,
    };
  }

  buttonRemove = c => {
    const confirm = () => {
      c.deleteAllRegions();
    };

    return (
      <Popconfirm
        placement="bottomLeft"
        title={"Please confirm you want to delete all labeled regions"}
        onConfirm={confirm}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <BootstrapTooltip title="حذف همه‌ی نتایج">
          <IconButton
            size="large"
            sx={{
              "& svg": {
                color: "white",
                fontSize: "1.15rem !important",
                transition: "0.2s",
                transform: "translateX(0) rotate(0)",
              },
              "&:hover, &:focus": {
                bgcolor: "unset",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                height: "80%",
                display: "block",
                left: 0,
                width: "1px",
                bgcolor: "white",
              },
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </IconButton>
        </BootstrapTooltip>
      </Popconfirm>
    );
  };

  toggleListItem = () => {
    this.setState({
      ...this.state,
      openListItem: !this.state.openListItem,
    });
  };
  render() {
    const { store } = this.props;
    const completion = store.completionStore.selected;
    const c = store.completionStore.selected;
    const node = completion.highlightedNode;
    const { regions } = c.regionStore;

    return (
      <RTL>
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: "20px" }} component="div">
          <ListItem
            component="div"
            disablePadding
            sx={{
              backgroundColor: "#3f407d",
            }}
          >
            {this.buttonRemove(c)}
            <ListItemButton sx={{ height: 56 }} onClick={this.toggleListItem}>
              <ListItemText
                primary="نتایج"
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "body2",
                }}
              />
              <ListItemIcon
                sx={{
                  minWidth: "0px",
                  marginRight: "10px",
                  color: "white",
                }}
              >
                <FontAwesomeIcon icon={faPoll} color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />
          <Collapse
            in={this.state.openListItem}
            timeout="auto"
            unmountOnExit
            sx={{
              border: "solid 1px rgba(34, 36, 38, 0.15)",
            }}
          >
            <List component="div" disablePadding className="completion-list">
              <Entity store={store} completion={completion} />

              <Entities store={store} regionStore={completion.regionStore} />

              <Relations store={store} item={completion} />
            </List>
          </Collapse>
        </List>
      </RTL>
    );
  }
}

export default observer(SideColumn);
