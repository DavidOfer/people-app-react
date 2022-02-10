import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Person } from '../../models/PersonModel';

const useStyles = makeStyles({
  paper:{
    position: "relative",
  },
  tableBody: {
      '& > tr:nth-child(odd)': {
        backgroundColor: 'rgb(200,200,200)',
    }
  },
  loading:{
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    '& > h3': {
      display:'inline-block',
      height:'30px',
      width:'250px',
      color:'white'
  }
  }
});


interface TableProps {
  isLoading:boolean,
  count:number,
  rows: Person[],
  page: number
  handleChangePage: (event: unknown, newPage: number) => void,
  sortByHandler:(field:string)=>void,
}


const PaginationTable: React.FC<TableProps> = ({ isLoading,count, rows, page, sortByHandler,handleChangePage}) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  };
  const emptyRows =
    rowsPerPage - rows.length;

  return (
    <TableContainer component={Paper} className={classes.paper}>
                {isLoading && <div className={classes.loading}><h3>Loading...(1s intentional delay)</h3></div>}
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={e=>sortByHandler('idNumber')}>ID</TableCell>
            <TableCell onClick={e=>sortByHandler('firstName')}>First Name</TableCell>
            <TableCell onClick={e=>sortByHandler('lastName')}>Last Name</TableCell>
            <TableCell onClick={e=>sortByHandler('gender')}>Gender</TableCell>
            <TableCell onClick={e=>sortByHandler('birthDate')}>Birth Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {rows
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={row.idNumber}>
                <TableCell component="th" scope="row">
                  {row.idNumber}
                </TableCell>
                <TableCell >{row.firstName}</TableCell>
                <TableCell >{row.lastName}</TableCell>
                <TableCell >{row.gender}</TableCell>
                <TableCell >{new Date(row.birthDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default PaginationTable;
