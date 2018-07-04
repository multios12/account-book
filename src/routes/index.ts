import express from 'express';
import passport from '../node-passport';
import { authorize } from '../node-passport';

var router = express.Router();

/* GET home page. */
router.get('/', isAuthenticated, (req, res, next) => {
    res.sendfile('../public/index.html')
});

router.post("/login", passport.authenticate(
    "local", {successRedirect: "/#/", failureRedirect: "/#/login"
    }));

router.post("/logout", function (request, response) {
    request.logout();
    response.redirect("/#/login");
});

function isAuthenticated(req:express.Request, res:express.Response, next:any){
    if (req.isAuthenticated()) {  // 認証済
        return next();
    }
    else {  // 認証されていない
        res.redirect('/#/login');  // ログイン画面に遷移
    }
}
module.exports = router;
