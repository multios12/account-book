import express from 'express';
import path from 'path';

var router = express.Router();

router.get('/', (req, res, next) => res.sendfile(path.join(process.cwd(), './data/items.json')));

module.exports = router;
