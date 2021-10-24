import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
      <MuiTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
        <MuiTableCell align="right">{row.calories}</MuiTableCell>
        <MuiTableCell align="right">{row.fat}</MuiTableCell>
        <MuiTableCell align="right">{row.carbs}</MuiTableCell>
        <MuiTableCell align="right">{row.protein}</MuiTableCell>
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

export default function Table(props) {
  return (
    <MuiTableContainer component={Paper}>
      <MuiTable aria-label="collapsible table">
        <MuiTableHead>
          <MuiTableRow>
            <MuiTableCell />
            <MuiTableCell>Dessert (100g serving)</MuiTableCell>
            <MuiTableCell align="right">Calories</MuiTableCell>
            <MuiTableCell align="right">Fat&nbsp;(g)</MuiTableCell>
            <MuiTableCell align="right">Carbs&nbsp;(g)</MuiTableCell>
            <MuiTableCell align="right">Protein&nbsp;(g)</MuiTableCell>
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