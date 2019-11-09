import {
  Avatar,
  Drawer,
  Grid,
  makeStyles,
  Button
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import React, { useContext } from "react";
import Login from "../../../components/login/Login";
import MyDrawer from "../MyDrawer/MyDrawer";
import AuthContext from "./../../context/auth.context";
import DrawerContext from "./../../context/drawer.context";
import Profile from "./Profile";
import Register from "../../../components/register/Register";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles(theme => ({
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
    cursor: "pointer"
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#18BC9C",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#18BC9C",
      color: "#ffffff"
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Buttons = props => {
  const classes = useStyles();
  const { isAuthenticated } = useContext(AuthContext);
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);

  const toggleDrawer = (side, value) => {
    setOpenDrawer({ ...openDrawer, [side]: value });
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <Button
            size="small"
            aria-label="Connexion"
            className={classes.margin}
            onClick={() => toggleDrawer("login", true)}
          >
            <LockIcon fontSize="small" className={classes.extendedIcon} />
            Connexion
          </Button>
        </>
      ) : (
        <>
          <Grid
            container
            justify="center"
            alignItems="center"
            onClick={() => toggleDrawer("profile", true)}
          >
            <Avatar className={classes.purpleAvatar}>OP</Avatar>
          </Grid>
        </>
      )}
      <Drawer
        anchor="right"
        open={openDrawer.register}
        onClose={() => toggleDrawer("register", false)}
      >
        <MyDrawer side="register">
          <Register />
        </MyDrawer>
      </Drawer>
      <Drawer
        anchor="right"
        open={openDrawer.login}
        onClose={() => toggleDrawer("login", false)}
      >
        <MyDrawer side="login">
          <Login />
        </MyDrawer>
      </Drawer>
      <Drawer
        anchor="right"
        open={openDrawer.profile}
        onClose={() => toggleDrawer("profile", false)}
      >
        <MyDrawer side="profile">
          <Profile />
        </MyDrawer>
      </Drawer>
    </>
  );
};

export default Buttons;
