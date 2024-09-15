const db = require('../config/db')

const querySearchAll = 'SELECT \n' +
	'    Office.Id,\n' +
	'    Office.Name, \n' +
	'    Office.Count, \n' +
	'    Office.Price + IFNULL(SUM(Service.Price), 0) AS Price, \n' +
	'    OfficeOrder.TimeFrom, \n' +
	'    OfficeOrder.TimeTo, \n' +
	'    OfficeOrder.Date\n' +
	'FROM Office\n' +
	'LEFT JOIN OfficeOrder ON OfficeOrder.OfficeId = Office.Id\n' +
	'LEFT JOIN OrderService ON OrderService.OrderId = OfficeOrder.Id\n' +
	'LEFT JOIN Service ON Service.Id = OrderService.ServiceId\n' +
	'GROUP BY \n' +
	'    Office.Id,\n' +
	'    Office.Name, \n' +
	'    Office.Count, \n' +
	'    Office.Price, \n' +
	'    OfficeOrder.TimeFrom, \n' +
	'    OfficeOrder.TimeTo, \n' +
	'    OfficeOrder.Date;\n'

exports.getAllOffices = (req, res) => {
	db.query(querySearchAll, (err, result) => {
		if (err) {
			return res.status(500).json({ error: err });
		} else {
			res.status(200).json(result);
		}
	});
};

