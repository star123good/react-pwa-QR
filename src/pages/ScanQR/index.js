import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Table, TableBody, TableCell, TableContainer, 
    // TableHead, 
    TableRow, Paper } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import QrScanner from "../../components/QRScanner";
import useStyles from "./styles";
import { QR, isValidateQR } from "../../models/QR";


const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function ScanQR(props) {
    var classes = useStyles();
    
    const [data, setData] = useState(QR);
    // console.log("[ScanQR]", data);
    
    return (
        <>
            <Grid container className={classes.gridScan} >
                <QrScanner 
                    setData={(d) => setData({ ...data, ...d })}
                />
            </Grid>
            {
                isValidateQR(data)
                ?
                (
                    <Grid container className={classes.gridTable} >
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="customized table">
                                {/* <TableHead>
                                    <TableRow>
                                        <TableCell>Key</TableCell>
                                        <TableCell align="right">Values</TableCell>
                                    </TableRow>
                                </TableHead> */}
                                <TableBody>
                                    {Object.keys(QR).map((key, id) => (
                                        <StyledTableRow key={id}>
                                            <TableCell component="th" scope="row">{key}</TableCell>
                                            <TableCell align="right">{data[key]}</TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )
                :
                <></>
            }
            
        </>
    );
}

export default withRouter(ScanQR);