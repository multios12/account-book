import express from 'express';
import passport from '../node-passport';
import { authorize } from '../node-passport';

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => res.sendfile('../public/index.html'));

router.post("/account/login", passport.authenticate(
    "local-login", {successRedirect: "/", failureRedirect: "/login"
    }));

router.post("/account/logout", authorize("group1"), function (request, response) {
    request.logout();
    response.redirect("/home/index");
});

module.exports = router;
