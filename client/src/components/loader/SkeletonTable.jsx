
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Checkbox } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";


const SkeletonTable = ({ headCells }) => (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    {headCells?.map((headCell, index) => (
                        <TableCell key={index}>
                            {headCell.label === "ID" &&
                                <Checkbox
                                    color="primary"
                                />
                            }
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from({ length: 10 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {headCells.map((_, colIndex) => (
                            <TableCell key={colIndex}>
                                <Skeleton variant="rectangular" width="100%" height={20} />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default SkeletonTable