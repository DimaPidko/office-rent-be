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

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, count, price } = req.body;
	
	const sql = 'UPDATE Office SET Name = ?, Count = ?, Price = ? WHERE Id = ?';
	db.query(sql, [name, count, price, id], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json({ message: 'Office updated successfully' });
	});
});

router.delete('/delete/:id', (req, res) => {
	const { id } = req.params;
	
	const deleteOrderServicesSql = `
		DELETE OrderService FROM OrderService
		INNER JOIN OfficeOrder ON OrderService.OrderId = OfficeOrder.Id
		WHERE OfficeOrder.OfficeId = ?
	`;
	
	const deleteOrdersSql = 'DELETE FROM OfficeOrder WHERE OfficeId = ?';
	
	const deleteOfficeSql = 'DELETE FROM Office WHERE Id = ?';
	
	db.query(deleteOrderServicesSql, [id], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		
		db.query(deleteOrdersSql, [id], (err, result) => {
			if (err) {
				return res.status(500).json({ error: err });
			}
			
			db.query(deleteOfficeSql, [id], (err, result) => {
				if (err) {
					return res.status(500).json({ error: err });
				}
				res.json({ message: 'Office and related data deleted successfully' });
			});
		});
	});
});

router.post('/search', (req, res) => {
	const { date, timeFrom, timeTo } = req.body;
	
	const sql = `
		SELECT Office.*
		FROM Office
		LEFT JOIN OfficeOrder ON Office.Id = OfficeOrder.OfficeId
		AND OfficeOrder.Date = ?
		AND (OfficeOrder.TimeFrom < ? AND OfficeOrder.TimeTo > ?)
		WHERE OfficeOrder.Id IS NULL
	`;
	
	db.query(sql, [date, timeTo, timeFrom], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		}
		res.json(result);
	});
});

module.exports = router;
