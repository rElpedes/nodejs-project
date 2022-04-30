// app.get() = ACCESS DATA;
// app.post() = CREATE DATA;
// app.put() = UPDATE DATA;
// app.delete() = DELETE DATA;

const Joi = require("joi"); // Returns a class so Pascal Naming Convention applies
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "new_schema",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send(`This is the localhost:${port}/ directory.`);
});

app.get("/create", (req, res) => {
	res.send(`This is the localhost:${port}/create directory.`);
});

app.get("/reset", (req, res) => {
	res.send(`This is the localhost:${port}/reset directory.`);

	db.query("DELETE FROM login");
});

app.post("/create", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	// const schema = {
	// 	username: Joi.string().min(3).required(),
	// 	password: Joi.string().min(3).required(),
	// };

	// const result = Joi.valid(req.body, schema);
	// console.log(req.body);

	// if (result.error) {
	// 	res.status(400).send(result.error.details[0].message);
	// }
	db.query(
		"INSERT INTO login (username, password) VALUES (?,?)",
		[username, password],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Post Succesful");
				console.log(result);
			}
		}
	);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
