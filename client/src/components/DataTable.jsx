import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogContent, DialogTitle, Grid2, Typography } from '@mui/material';
import ContactFormDialog from './ContactFormDialog';
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import { apiConnector } from '../services/apiConnector';
import { ContactEndpoints } from '../services/api';
import { toast } from 'sonner';



function EnhancedTableHead(props) {
  const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all rows' }}
          />
        </TableCell>
        <TableCell>Edit</TableCell>
        <TableCell>Delete</TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DataTable({ rows, headCells }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleDialogClose = () => setIsDialogOpen(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const { DELETE_CONTACT_API } = ContactEndpoints
  const [loading, setLoading] = React.useState(false)


  // handle Contact Delete
  const handleContactDelete = async () => {
    setLoading(true)
    const id = rows[selectedIndex]?.id
    const response = await apiConnector("DELETE", `${DELETE_CONTACT_API}/${id}`);
    console.log("DELETE_CONTACT API RESPONSE............", response)
    if (response?.data?.success) {
      toast.success("Contact deleted Succesfully")
    } else {
      toast.error(response.data?.message)
    }
    setOpenDeleteDialog(false)
    setLoading(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((row) => row.id || row._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort((a, b) => {
          if (!orderBy) return 0;
          return order === 'desc'
            ? b[orderBy]?.localeCompare(a[orderBy])
            : a[orderBy]?.localeCompare(b[orderBy]);
        })
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id || row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id || row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id || row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {/* edit button */}
                    <TableCell >
                      <Button onClick={() => {
                        setSelectedIndex(index)
                        setIsDialogOpen(true)
                      }}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                    {/* delete button */}
                    <TableCell >
                      <Button onClick={() => {
                        setSelectedIndex(index)
                        setOpenDeleteDialog(true)
                      }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>

                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
                        {row[headCell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>


      {isDialogOpen &&
        <ContactFormDialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          initialValues={rows[selectedIndex]}
        />}


      {
        openDeleteDialog && (
          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} fullWidth>
            <DialogTitle>Delete Contact Confirmation</DialogTitle>
            <DialogContent style={{ padding: "20px" }}>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to delete this contact? This action cannot be undone.
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Deleting this contact will permanently remove it from your records and you won&apos;t be able to recover the data.
              </Typography>
              <Grid2 container spacing={2} justifyContent="flex-end" style={{ marginTop: "20px" }}>
                <Grid2 item>
                  <Button
                    onClick={() => setOpenDeleteDialog(false)}
                    disabled={loading}
                    variant="outlined"
                    color="success"
                    startIcon={<DoDisturbAltIcon />}
                  >
                    Cancel
                  </Button>
                </Grid2>
                <Grid2 item>
                  <Button
                    onClick={handleContactDelete}
                    disabled={loading}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </Button>
                </Grid2>
              </Grid2>
            </DialogContent>
          </Dialog>

        )}
    </Box>
  );
}

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
};
