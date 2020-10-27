import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Grid, TextField, Typography } from "@material-ui/core";
import QRCode from "qrcode.react";
import useStyles from "./styles";
import { QR } from "../../models/QR";


function GenerateQR(props) {
    var classes = useStyles();

    const [data, setData] = useState(QR);
    // console.log("[GenerateQR]", data);
    
    return (
        <>
            <Grid container className={classes.gridForm} >
            <Typography variant="h5" component="h5">Type the follow fields.</Typography>
                {Object.keys(QR).map((key, id) => (
                    <div key={id} className={classes.textWrapper} >
                        <TextField 
                            id="standard-basic" 
                            label={key} 
                            placeholder={key} 
                            className={classes.text}
                            value={data[key]}
                            onChange={(e) => setData({ ...data, [key]: e.target.value })}
                        />
                    </div>
                ))}
            </Grid>
            <Grid container className={classes.gridScan} >
                <QRCode 
                    value={JSON.stringify(data)} 
                    size={200}
                />
            </Grid>
        </>
    );
}

export default withRouter(GenerateQR);