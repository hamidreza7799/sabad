import React, { useContext, useEffect, useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import Slider from "@mui/material/Slider";
import UserContext, { UserContextConsumer } from '../../context/UserContext'
import AppContext from '../../context/AppContext'
import './Table.css'
import axios from '../../axios';
import ProgressBar from "./Progress/Progress"
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie'

const styles = makeStyles((theme) => ({
    visibilityIconSuccess: {

        color: theme.palette.success.main

    },
    visibilityIconWarning: {

        color: theme.palette.warning.main

    },
    visibilityIconError: {

        color: theme.palette.error.main

    }
}))

const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function Row(props) {
    const classes = styles()
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment >
            <MuiTableRow key={row.productOwner} sx={{ '& > *': { borderBottom: 'unset' } }} className={props.cssClass}>
                <MuiTableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </MuiTableCell>
                <MuiTableCell component="th" scope="row" align="center">
                    {row.productOwner}
                </MuiTableCell>
                <MuiTableCell align="center">{row.projectName}</MuiTableCell>
                <MuiTableCell align="center">{row.startDate}</MuiTableCell>
                <MuiTableCell align="center">{row.numberOfData}</MuiTableCell>
                <Tooltip title={`${row.completePercent}%`} placement={"right"}>
                    <MuiTableCell align="center">
                        <ProgressBar value={row.completePercent} className={"progress-bar"} />
                    </MuiTableCell>
                </Tooltip>
                <MuiTableCell align="center">
                    <Link to={`/project/${props.username}/${props.projectSlug}/task/${props.taskSlug}`}>
                        <IconButton>
                            <VisibilityIcon className={row.completePercent === 100 ? classes.visibilityIconSuccess : row.completePercent < 50 ? classes.visibilityIconError : classes.visibilityIconWarning} />
                        </IconButton>
                    </Link>
                </MuiTableCell>
            </MuiTableRow>
            <MuiTableRow>
                <MuiTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <MuiTable size="small" aria-label="purchases">
                                <MuiTableHead>
                                    <MuiTableRow>
                                        <MuiTableCell>Date</MuiTableCell>
                                        <MuiTableCell>Customer</MuiTableCell>
                                        <MuiTableCell align="right">Amount</MuiTableCell>
                                        <MuiTableCell align="right">Total price ($)</MuiTableCell>
                                    </MuiTableRow>
                                </MuiTableHead>
                                <MuiTableBody>
                                    {row.history.map((historyRow) => (
                                        <MuiTableRow key={historyRow.date}>
                                            <MuiTableCell component="th" scope="row">
                                                {historyRow.date}
                                            </MuiTableCell>
                                            <MuiTableCell>{historyRow.customerId}</MuiTableCell>
                                            <MuiTableCell align="right">{historyRow.amount}</MuiTableCell>
                                            <MuiTableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </MuiTableCell>
                                        </MuiTableRow>
                                    ))}
                                </MuiTableBody>
                            </MuiTable>
                        </Box>
                    </Collapse>
                </MuiTableCell>
            </MuiTableRow>
        </React.Fragment>
    );
}



const StyledTableRow = styled(Row)(({ theme }) => ({
    '&:nth-of-child(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Table(props) {
    const [getTableData, setGetTableData] = useState(false)
    const [packsData, setPacksData] = useState([])
    const user = useContext(UserContext)
    const app = useContext(AppContext)

    useEffect(() => {
        if (!getTableData) {
            setGetTableData(true)
            app.openLoadingHandler()
            axios.defaults.headers.common['Authorization'] = Cookie.get("token")
            axios.get("/api/annotator/tasks/").then((response) => {
                const packs = response.data.results.map((pack) => {
                    // let startDate = new Date(pack.join_date)
                    // startDate = [startDate.getFullYear(), startDate.getMonth(), startDate.getDay()].join('/')
                    return {
                        id: pack.id,
                        productOwner: pack.task.owner,
                        projectSlug: pack.task.project,
                        projectName: pack.task.subject,
                        startDate: pack.join_date.replace(/T.*/, "").split("-").join("/"),
                        numberOfData: pack.number_of_data,
                        completePercent: pack.progress,
                        task: pack.task,
                        history: [
                            {
                                date: '2020-01-05',
                                customerId: '11091700',
                                amount: 3,
                            },
                            {
                                date: '2020-01-02',
                                customerId: 'Anonymous',
                                amount: 1,
                            },
                        ],
                    }
                })
                setPacksData(packs)
            }).catch((error) => {
                app.openMessageDialogHandler({
                    messageType: "error",
                    messageText: ''
                })
                console.log(error.response?.data)
            }).finally(() => {
                app.closeLoadingHandler()
            })
        }
    })

    const show = () => {
        console.log(packsData)
    }

    return (
        <MuiTableContainer component={Paper} className={'table-container'} sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarColor: "#d4aa70 #e4e4e4",
            scrollbarWidth: "thin",
        }}>
            <MuiTable stickyHeader dir='rtl' aria-label="collapsible table">
                <MuiTableHead onClick={show}>
                    <MuiTableRow>
                        <StyledTableCell align="center" />
                        <StyledTableCell align="center" className={"table-header-cell"} >نام کارفرما</StyledTableCell>
                        <StyledTableCell align="center" className={"table-header-cell"} >نام پروژه</StyledTableCell>
                        <StyledTableCell align="center" className={"table-header-cell"} >تاریخ شروع</StyledTableCell>
                        <StyledTableCell align="center" className={"table-header-cell"} >تعداد داده</StyledTableCell>
                        <StyledTableCell align="center" className={"table-header-cell"} >درصد پیشرفت</StyledTableCell>
                        <StyledTableCell align="center" className={"table-header-cell"} >مشاهده پروژه</StyledTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {packsData.map((pack, index) => {
                        return (
                            <Row
                                key={pack.productOwner}
                                username={pack.productOwner}
                                projectSlug={pack.task.url.split('/').at(-4)}
                                taskSlug={pack.task.url.split('/').at(-2)}
                                row={pack}
                                cssClass={index % 2 === 0 ? "colorful-row" : ""}
                            />
                        )
                    }
                    )}
                </MuiTableBody>
            </MuiTable>
        </MuiTableContainer>
    );
}
