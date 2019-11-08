import React, { useContext } from "react";
import { Dialog, DialogContent, makeStyles } from "@material-ui/core";
import Login from "../../../components/login/Login";
import LoginDialogContext from "./../../context/login-dialog.context";

const useStyles = makeStyles({
  paper: {
    minWidth: "25% !important"
  }
});

const LoginDialog = props => {
  const classes = useStyles();
  const { open, setOpen } = useContext(LoginDialogContext);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose} className={classes.paper}>
      <DialogContent>
        <Login handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
