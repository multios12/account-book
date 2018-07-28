import express from 'express';
var router = express.Router();

/* homepage Routing */
router.get('/', (req, res, next) => res.sendfile('../public/index.html'));

//#region API Routings
router.use('/api/', require('./api-login'))
    .use('/api/days', require('./api-days'))
    .use('/api/details', require('./api-details'))
    .use('/api/reports', require('./api-reports'))
    .use('/api/savings', require('./api-savings'))
    .use('/api/settings', require('./api-settings'))
    .use('/api/status', require('./api-status'));
//#endregion

module.exports = router;
