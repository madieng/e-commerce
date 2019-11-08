import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  register: {
    width: 450
  },
  login: {
    width: 350
  },
  profile: {
    width: 350
  }
});

const MyDrawer = props => {
  const classes = useStyles();
  return (
    <div className={classes[props.side]} role="presentation">
      {props.children}
    </div>
  );
};

export default MyDrawer;
