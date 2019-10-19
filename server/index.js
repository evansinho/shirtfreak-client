/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
import express from "express";
import "@babel/polyfill";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
// import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from'swagger-jsdoc';
import routes from "./routes";

// Instantiate the app
const app = express();

// Define our app port.
const port = process.env.PORT || 8000;

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(200).json({
    status: 200,
    message: "Welcome To shirt Api"
  })
);

app.use(routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
  next();
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
