import passport from 'passport';
var LocalStrategy = require("passport-local").Strategy;

//#region passport
// passport が ユーザー情報をシリアライズすると呼び出されます
passport.serializeUser(function (id, done) {
    done(null, id);
});

// passport が ユーザー情報をデシリアライズすると呼び出されます
passport.deserializeUser(function (id, done) {
    if (true) {
        return done('');

    } else {
        // 結果
        done(null, { user: '' });

    }
});

// passport における具体的な認証処理を設定します。
passport.use(
    "local-login",
    new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, function (request: any, username: any, password: any, done: any) {
        process.nextTick(() => {
            // User.findOne({ "email": username }, function (error, user) {
            //     if (error) {
            //         return done(error);
            //     }
            //     if (!user || user.password != password) {
            //         return done(null, false, request.flash("message", "Invalid username or password."));
            //     }
            //     // 保存するデータは必要最低限にする
            //     return done(null, user._id);
            // });
        });
    })
);

// 認可処理。指定されたロールを持っているかどうか判定します。
export var authorize = function (role: any) {
    return function (request: any, response: any, next: any) {
        if (request.isAuthenticated() &&
            request.user.role === role) {
            return next();
        }
        response.redirect("/login");
    };
};
//#endregion

export default passport;
