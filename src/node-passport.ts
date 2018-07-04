import express, { NextFunction } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local'
import path from 'path';
// import { NextFunction } from 'express-serve-static-core';
var LocalStrategy = passportLocal.Strategy;
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(process.cwd(), './data/db.sqlite'));

//#region passport
// passport が ユーザー情報をシリアライズすると呼び出されます
passport.serializeUser(function (id, done) {
    done(null, id);
});

// passport が ユーザー情報をデシリアライズすると呼び出されます
passport.deserializeUser(function (id, done) {
    done(null, { user: id });
    if (true) {
        return done('');
    } else {
        // 結果
        done(null, { user: id });
    }
});

// passport における具体的な認証処理を設定します。
passport.use(new LocalStrategy(
    function (username, password, done) {
        db.serialize(() => {
            var sql = 'SELECT * FROM users WHERE name = ?';
            db.get(sql, [username], (err: any, rows: any) => {
                if (err) {
                    return done(err);
                }
                if (!rows || rows.password != password) {
                    //return done(null, false, request.flash("message", "Invalid username or password."));
                }
                // 保存するデータは必要最低限にする
                return done(null, 'a');
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
