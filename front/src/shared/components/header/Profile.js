import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React, { useContext } from "react";
import AuthContext from "./../../context/auth.context";
import DrawerContext from "./../../context/drawer.context";
import AuthService from "./../../services/auth.service";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const Profile = props => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setOpenDrawer({ ...openDrawer, ...{ profile: false } });
  };
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Damien Dupont
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="Mon profil" />
      </ListItem>
      {/* <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItem> */}
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText onClick={handleLogout} primary="Déconnexion" />
      </ListItem>
    </List>
  );
};

export default Profile;
