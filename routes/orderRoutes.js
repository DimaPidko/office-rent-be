const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM OfficeOrder';
	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(result);
	});
});

router.post('/', (req, res) => {
	const { officeId, timeFrom, timeTo, date } = req.body;
	const sql = 'INSERT INTO OfficeOrder (OfficeId, TimeFrom, TimeTo, Date) VALUES (?, ?, ?, ?)';
	db.query(sql, [officeId, timeFrom, timeTo, date], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json({ id: result.insertId });
	});
});

module.exports = router;
