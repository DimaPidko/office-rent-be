const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM Office';
	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(result);
	});
});

router.post('/', (req, res) => {
	const { name, count, price } = req.body;
	const sql = 'INSERT INTO Office (Name, Count, Price) VALUES (?, ?, ?)';
	db.query(sql, [name, count, price], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json({ id: result.insertId });
	});
});

module.exports = router;
