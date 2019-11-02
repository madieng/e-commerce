const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("./../models/user.model");

// Inscription
passport.use(
  "register",
  localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

password.use(
  "login",
  localStrategy(
    {
      usernameField: email,
      passwordField: password
    },
    async (email, password, done) => {
      try {
        // On vérifie si l'utilisateur existe
        const user = await UserModel.findOne({ email });
        // Sinon on renvoie une erreur
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        // On vérifie si le mot de passe est valide
        const validate = await user.isValidPassword(password);
        // Sinon on renvoie une erreur
        if (!validate) {
          return done(null, false, { message: "Wrong password." });
        }
        // Si tout se passe bien alors on renvoie l'utilisateur avec un message de succès
        return done(null, user, { message: "Login si successfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
