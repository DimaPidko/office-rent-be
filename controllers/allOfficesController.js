const db = require('../config/db')

exports.getAllOffices = (req, res) => {
	db.query('SELECT * FROM allOffices', (err, result) => {
		if (err) {
			return res.status(500).json({error: err})
		} else {
			res.status(200).json(result)
		}
	})
}

exports.createNewOffice = (req, res) => {
	const { officeName, officeCount, timeFrom, timeTo, officeServices, officePrice, officeDate } = req.body
	
	db.query('INSERT INTO allOffices (name, count, timeFrom, timeTo, baseRentPrice, services, date) VALUES (?, ?, ?, ?, ?, ?)',
		[officeName, officeCount, timeFrom, timeTo, officeServices, officePrice, officeDate],
		(err, result) => {
			if (err) {
				return res.status(500).json({error: err})
			} else {
				res.status(201).json({id: result.insertId, message: 'Created new Office success'})
			}
		})
}

exports.deleteOffice = (req, res) => {
	const { id } = req.params
	const { officeId } = req.body
	
	db.query('DELETE FROM allOffices WHERE id = ?', [id], (err) => {
		if (err) {
			return res.status(500).json({error: err})
		} else {
			res.status(204).json({message: 'Deleted success'})
		}
	})
}

exports.updateOffice = (req, res) => {
	const { id } = req.params
	const { officeName, officeCount, timeFrom, timeTo, officeServices, officePrice, officeDiscount, officeReserv, officeDate } = req.body

	db.query(
		'UPDATE allOffices SET name = ?, count = ?, timeFrom = ?, timeTo = ?, baseRentPrice = ?, discount = ?, services = ?, isReserv = ?, date = ?',
		[officeName, officeCount, timeFrom, timeTo, officePrice, officeDiscount, officeServices, officeReserv, officeDate],
		(err) => {
			if (err) {
				return res.status(500).json({error: err})
			} else {
				res.status(200).json({message: 'Update success'})
			}
		}
	)
}

exports.getFilterOffices = (req, res) => {
	const { officeDate } = req.body
	
	db.query('SELECT * FROM allOffices WHERE date = ?', [officeDate],
		(err, result) => {
			if (err) {
				return  res.status(500).json({error: err})
			} else {
				res.status(200).json(result)
			}
		})
}

exports.setReserved = (req, res) => {
	const { id } = req.params
	const { officeReserv } = req.body
	
	db.query('UPDATE allOffices SET isReserv = ?', [officeReserv], (err) => {
		if (err) {
			return res.status(500).json({error: err})
		} else {
			res.status(200).json({message: 'Update reservation success'})
		}
	})
}