import { Avatar, Drawer, Grid, makeStyles } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import React, { useContext } from "react";
import Login from "../../../components/login/Login";
import MyDrawer from "../MyDrawer/MyDrawer";
import AuthContext from "./../../context/auth.context";
import DrawerContext from "./../../context/drawer.context";
import Profile from "./Profile";
import Register from "../../../components/register/Register";
const useStyles = makeStyles({
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500],
    cursor: "pointer"
  }
});

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
          <button
            className="btn btn-info my-2 mr-2 my-sm-0"
            onClick={() => toggleDrawer("register", true)}
          >
            Inscription
          </button>
          <button
            className="btn btn-success my-2 mr-2 my-sm-0"
            onClick={() => toggleDrawer("login", true)}
          >
            Connexion
          </button>
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
