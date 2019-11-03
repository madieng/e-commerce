const jwtConfig = require("./jwt.config");
const bcrypt = require("bcrypt");

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  User = require("./../models/user.model"),
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
const BCRYPT_SALT_ROUNDS = 12;
const localOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false
};

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          console.log("User already taken.");
          return done(null, false, { message: "User already taken." });
        } else {
          const { firstname, lastname } = req.body;
          const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
          const user = await User.create({
            email,
            password: hash,
            lastname,
            firstname
          });
          console.log("user created.");
          return done(null, user, { message: "user created." });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.log("User not found.");
          return done(null, false, { message: "User not found." });
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          console.log("Wrong Password");
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        console.log("Logged in Successfully");
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter("JWT"),
  secretOrKey: jwtConfig.secret
};

passport.use(
  "jwt",
  new JWTstrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ email: jwt_payload.id });
      if (user) {
        console.log("User found in DB in passport");
        return done(null, user, { message: "User found in DB in passport" });
      } else {
        console.log("User not found in DB");
        return done(null, false);
      }
    } catch (error) {
      done(error);
    }
  })
);
