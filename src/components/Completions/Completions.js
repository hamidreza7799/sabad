import React, { Component, useState } from "react";
import { observer } from "mobx-react";
import { StarOutlined, DeleteOutlined, ForwardOutlined, WindowsOutlined, PlusOutlined } from "@ant-design/icons";

import Utils from "../../utils";
import styles from "./Completions.module.scss";
import "./Completions.css";

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
} from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import { Popconfirm } from "antd";
import RTL from "../../hoc/RTL/RTL";
import Wrapper from "../../components/Wrapper/Wrapper";
import { Divider } from "antd";

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

const Completion = observer(({ item, store }) => {
  const buttonRemove = () => {
    const confirm = () => {
      item.list.deleteCompletion(item);
    };

    return (
      <Popconfirm
        placement="bottomLeft"
        title={"Please confirm you want to delete this completion"}
        onConfirm={confirm}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <BootstrapTooltip title="حذف">
          <IconButton
            disabled={!item.selected}
            size="large"
            className={`${item.selected ? "color-error " : ""} `}
            sx={{
              "& svg": {
                fontSize: "1rem",
                transition: "0.2s",
                transform: "translateX(0) rotate(0)",
              },
              "&:hover, &:focus": {
                bgcolor: "unset",
              },
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </IconButton>
        </BootstrapTooltip>
      </Popconfirm>
    );
  };

  return (
    <ListItem component="div" disablePadding>
      {buttonRemove()}
      <ListItemButton
        sx={{
          height: 56,
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
        onClick={() => {
          !item.selected && store.completionStore.selectCompletion(item.id);
        }}
      >
        <ListItemText
          primary={item.pk}
          primaryTypographyProps={{
            fontWeight: "medium",
            variant: "body2",
          }}
          secondary={item.createdBy}
        />
      </ListItemButton>
      <IconButton
        size="large"
        sx={{
          "& svg": {
            fontSize: "0.875rem",
            transition: "0.2s",
            transform: "translateX(0) rotate(0)",
          },
          "&:hover, &:focus": {
            bgcolor: "unset",
          },
        }}
        onClick={ev => {
          !item.selected && store.completionStore.selectCompletion(item.id);
        }}
      >
        <FontAwesomeIcon icon={faLightbulb} className={`${item.selected ? "on-lightbulb" : ""} `} />
      </IconButton>
    </ListItem>
  );
});

class Completions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { store } = this.props;

    const content = store.completionStore.completions.map(c => {
      return (
        <Wrapper>
          <Completion key={c.id} item={c} store={store} />
        </Wrapper>
      );
    });

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
            <BootstrapTooltip title="تکمیل جدید">
              <IconButton
                size="large"
                sx={{
                  "& svg": {
                    color: "white",
                    fontSize: "1.25rem",
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
                onClick={ev => {
                  ev.preventDefault();
                  const c = store.completionStore.addCompletion({ userGenerate: true });
                  store.completionStore.selectCompletion(c.id);
                  // c.list.selectCompletion(c);
                }}
              >
                <FontAwesomeIcon icon={faPlusSquare} />
              </IconButton>
            </BootstrapTooltip>
            <ListItemButton sx={{ height: 56 }} onClick={this.handleClick}>
              <ListItemText
                primary="تکمیل‌ها"
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
                <FontAwesomeIcon icon={faBook} color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Collapse
            in={this.state.open}
            timeout="auto"
            unmountOnExit
            sx={{
              border: "solid 1px rgba(34, 36, 38, 0.15)",
            }}
          >
            <List component="div" disablePadding className="completion-list">
              {store.completionStore.completions ? content : <p>چیزی موجود نیست</p>}
            </List>
          </Collapse>
        </List>
      </RTL>
    );
  }
}

export default observer(Completions);
