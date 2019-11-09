import React, { useContext } from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContext from "./../../context/snackbar.context";
import { makeStyles } from "@material-ui/styles";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  },
  //   info: {
  //     backgroundColor: theme.palette.primary.main
  //   },
  //   warning: {
  //     backgroundColor: amber[700]
  //   },
  icon: {
    fontSize: 20
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));
const MySnackbar = ({ message, variant }) => {
  const classes = useStyles();
  const { openSnackbar, setOpenSnackbar } = useContext(SnackbarContext);

  const handleClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default MySnackbar;
