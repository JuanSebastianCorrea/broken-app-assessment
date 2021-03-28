const express = require('express');
const axios = require('axios');
const ExpressError = require('./expressError');
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
	console.log(req.body.developers);

	try {
		if (!req.body.developers) throw new ExpressError('developers GitHub username required', 400);

		const results = await Promise.all(
			req.body.developers.map((d) => {
				return axios.get(`https://api.github.com/users/${d}`);
			})
		);

		const out = results.map((r) => ({ name: r.data.name, bio: r.data.bio }));

		return res.json(out);
	} catch (err) {
		next(err);
	}
});

// ** 404 handler */

app.use(function(req, res, next) {
	const e = new ExpressError('Not Found', 404);
	next(e);
});

/** general error handler */

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.json({
		error: err.message
	});
});

module.exports = app;
