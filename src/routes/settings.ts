import express from 'express';
import {settings,write} from '../modules/settingStore'

var router = express.Router();

router.get('/', (req, res, next) => res.json(settings));

router.post('outdates/:year/:month', (req, res, next) => {
    var outdate = req.body;
    var outdates:any[] = settings.outdates;
    outdates.forEach(e => {
        
    });
    write();
});

module.exports = router;
