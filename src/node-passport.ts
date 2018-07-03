import express, { NextFunction } from 'express';
import passport from 'passport';
import path from 'path';
// import { NextFunction } from 'express-serve-static-core';
var LocalStrategy = require("passport-local").Strategy;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

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
    }, function (request: express.Request, username: String, password: String, done: any) {
        process.nextTick(() => {
            db.serialize(() => {
                var sql = 'SELECT * FROM users WHERE name = ?';
                db.get(sql, [username], (err: any, rows: any) => {
                    if (err) {
                        return done(err);
                    }
                    if (!rows || rows.password != password) {
                        return done(null, false, request.flash("message", "Invalid username or password."));
                    }
                    // 保存するデータは必要最低限にする
                    return done(null, rows.id);
                });
            });
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
        response.redirect("/#/login");
    };
};
//#endregion

export default passport;
