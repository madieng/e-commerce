import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Container, Row } from "react-bootstrap";
import AuthService from "../../shared/services/auth.service";
import "./Login.css";

const Login = ({ handleClose }) => {
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
        console.log(data);
        setSubmitting(false);
      } else {
        console.log(data);
        setSubmitting(true);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  return (
    <Container>
      <Row>
        <div className="mx-auto w-100">
          <div className="my-5">
            <h4 className="text-center"> Connexion </h4>
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="form-signin">
                  <div className="form-label-group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Adresse email"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-label-group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="d-flex">
                    <Button
                      className="btn btn-secondary mr-2"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Se connecter
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
