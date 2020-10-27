import React from "react";
import { withRouter } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import BuildIcon from "@material-ui/icons/Build";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CropFreeIcon from '@material-ui/icons/CropFree';
import useStyles from "./styles";
import { useUserDispatch, signOut, useUserState } from "../../context/UserContext";

function BottomSidebar({ history }) {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const classes = useStyles();
  
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
          <IconButton 
            component={Link}
            to="/generate"
            edge="start" 
            color="inherit" 
            aria-label="open drawer"
          >
            <BuildIcon />
          </IconButton>
        <Fab 
          component={Link}
          to="/scan"
          color="secondary" 
          aria-label="add" 
          className={classes.fabButton}
        >
          <CropFreeIcon />
        </Fab>
        <div className={classes.grow} />
        {
          userState.isAuthenticated
          ?
          (
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="sign out"
              onClick={(event) => signOut(event, userDispatch, history)}
            >
              <ExitToAppIcon />
            </IconButton>
          )
          :
          (
            <IconButton 
              component={Link}
              to="/login"
              edge="end" 
              color="inherit" 
              aria-label="sign in / up"
            >
              <VpnKeyIcon />
            </IconButton>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(BottomSidebar);