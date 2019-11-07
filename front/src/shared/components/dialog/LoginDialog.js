import React from "react";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import Login from "../../../components/login/Login";

const useStyles = makeStyles({
  paper: {
    minWidth: "25% !important"
  }
});

const LoginDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose} className={classes.paper}>
      <DialogContent>
        <Login handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
