const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/linkedin", passport.authenticate("linkedin", { state: "LSDFJ" }));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/login",
  })
);
router.get("/login/success", (req, res) => {
  if (req.user) {
    // res.json(req.user);
    return res.send("login success")
  }
});

router.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return error;
    }
    res.redirect('/')
  });
});

module.exports = router;
