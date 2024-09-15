const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM Service';
	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(result);
	});
});

router.post('/add', (req, res) => {
	const { orderId, serviceId } = req.body;
	const sql = 'INSERT INTO OrderService (OrderId, ServiceId) VALUES (?, ?)';
	db.query(sql, [orderId, serviceId], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json({ id: result.insertId });
	});
});

module.exports = router;
