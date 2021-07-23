const firebase = require("firebase");

function signUp(req, res) {
  const { email, password } = req.body;

  firebase.default
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) =>
      res.json({
        message: "User created",
        error: false,
        code: 200,
        results: userCredential,
      })
    )
    .catch((error) =>
      res.json({
        message: "Unable to create user with email and password",
        error: true,
        code: 401,
        results: error,
      })
    );
}

function signIn(req, res) {
  const { email, password } = req.body;

  firebase.default
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) =>
      res.json({
        message: "User signed in",
        error: false,
        code: 200,
        results: userCredential,
      })
    )
    .catch((error) =>
      res.json({
        message: "Unable to sign in with email and password",
        error: true,
        code: 401,
        results: error,
      })
    );
}

function signOut(req, res) {
  firebase.default
    .auth()
    .signOut()
    .then(() =>
      res.json({
        message: "User signed out",
        error: false,
        code: 200,
        results: null,
      })
    )
    .catch((error) =>
      res.json({
        message: "There was a problem signing out",
        error: false,
        code: 200,
        results: error,
      })
    );
}

function isAuthenticated(req, res, next) {
  if (firebase.default.auth().currentUser !== null) return next();
  res.json({
    message: "Please sign in to access this command",
    error: true,
    code: 403,
    results: null,
  });
}

function isNotAuthenticated(req, res, next) {
  if (firebase.default.auth().currentUser === null) return next();
  res.json({
    message: "You are already signed in",
    error: true,
    code: 403,
    results: null,
  });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  isAuthenticated,
  isNotAuthenticated,
};
