const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const officeRoutes = require('./routes/officeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const apiService = require('./routes/allOfficesRoute')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/offices', officeRoutes);
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);
app.use('/get', apiService)

const PORT = 3308;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
