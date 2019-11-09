import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DrawerContext from "./../../shared/context/drawer.context";
import { Formik, Form } from "formik";
import AuthService from "../../shared/services/auth.service";
import AuthContext from "../../shared/context/auth.context";
import SnackbarContext from "../../shared/context/snackbar.context";
import MySnackbar from "../../shared/components/snackbar/MySnackbar";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = props => {
  const classes = useStyles();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext);
  const { setOpenSnackbar } = useContext(SnackbarContext);
  const [snackbar, setSnackbar] = useState("");

  const validate = values => {
    let errors = {};
    if (!values.email) {
      errors.email = "L'adresse email est obligatoire.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "L'adresse email est invalide.";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await AuthService.login(values);
      if (data.auth) {
        // On redirige l'utilisateur vers la page d'accueil
        setSnackbar("success");
        setIsAuthenticated(true);
        setSubmitting(false);
        setTimeout(() => {
          toggleDrawer("login", false);
        }, 2000);
      } else {
        setIsAuthenticated(false);
        setSubmitting(true);
        setSnackbar("error");
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log("ERROR: ", error);
      setSnackbar("error-sys");
    }

    setOpenSnackbar(true);
  };

  const toggleDrawer = (side, value) => {
    const data = { login: false };
    setOpenDrawer({ ...openDrawer, ...data, [side]: value });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            }) => (
              <Form className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email}
                  error={errors.email !== undefined}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.password}
                  error={errors.password !== undefined}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié ?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => toggleDrawer("register", true)}
                    >
                      {"Créer un compte"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      {snackbar === "success" && (
        <MySnackbar
          message="Vous êtes connecté avec succès."
          variant="success"
        />
      )}
      {snackbar === "error" && (
        <MySnackbar
          message="L'adresse email ou le mot de passe n'est pas correct."
          variant="error"
        />
      )}
      {snackbar === "error-sys" && (
        <MySnackbar
          message="Une erreur est survenue lors de la tentative de connexion."
          variant="error"
        />
      )}
    </>
  );
};

export default Login;
