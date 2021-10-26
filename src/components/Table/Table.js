import React, { useContext, useEffect, useState } from 'react';
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

const StyledTableCell = styled(MuiTableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
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
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <MuiTableRow key={row.name} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <MuiTableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </MuiTableCell>
                <MuiTableCell component="th" scope="row">
                    {row.name}
                </MuiTableCell>
                <MuiTableCell align="left">{row.calories}</MuiTableCell>
                <MuiTableCell align="center">{row.fat}</MuiTableCell>
                <MuiTableCell align="center">{row.carbs}</MuiTableCell>
                <MuiTableCell align="center">
                    <Slider
                        aria-label="Always visible"
                        defaultValue={50}
                        marks={[
                            {
                                value: 50,
                                label: "50%"
                            },
                        ]}
                        disabled={true}
                    />
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


const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const StyledTableRow = styled(Row)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Table(props) {
    const [getTableData, setGetTableData] = useState(false)
    const user = useContext(UserContext)
    const app = useContext(AppContext)
    axios.defaults.headers.common['Authorization'] = user.token

    useEffect(() => {
        if (!getTableData) {
            setGetTableData(true)
            axios.defaults.headers.common['Authorization'] = user.token
            app.openLoadingHandler()
            axios.get("/api/annotator/tasks/").then((response) => {

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
        console.log(user)
    }

    return (
        <MuiTableContainer component={Paper} className={'table-container'}>
            <MuiTable dir='rtl' aria-label="collapsible table">
                <MuiTableHead onClick={show}>
                    <MuiTableRow>
                        <StyledTableCell align="center" />
                        <StyledTableCell align="left">نام کارفرما</StyledTableCell>
                        <StyledTableCell align="left">نام پروژه</StyledTableCell>
                        <StyledTableCell align="center">تاریخ شروع</StyledTableCell>
                        <StyledTableCell align="center">تعداد داده</StyledTableCell>
                        <StyledTableCell align="center">درصد پیشرفت</StyledTableCell>
                    </MuiTableRow>
                </MuiTableHead>
                <MuiTableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />

                    ))}
                </MuiTableBody>
            </MuiTable>
        </MuiTableContainer>
    );
}