const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const url = require("url");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());

const dbName = "habitdb";
const tableName = "User1";

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

// Check if table exists and create if not
const createTable = () => {
    let tableName = "user1";
    db.query(`USE ${dbName}`, function (err, results, fields) {
        if (err) throw err;

        db.query(`SHOW TABLES LIKE '${tableName}'`, function (err, results, fields) {
            if (err) throw err;

            if (results.length === 0) {
                console.log("Creating new table!");
                sql = `CREATE TABLE ${dbName}.${tableName} (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    currentDate DATE,
                    habitName VARCHAR(255),
                    count INT DEFAULT 0,
                    target INT DEFAULT 1,
                    effort INT DEFAULT 0,
                    routine VARCHAR(255)
                )`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    console.log("Table created...");
                });
            } else {
                console.log("Table already exists...");
            }
        });
    });
};

// Connect
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database...");
    createTable();
});

app.get("/", (req, res) => {
    res.send("Hello stranger!");
    console.log("Somebody said hi!");
});
app.get("/getData", (req, res) => {
    const { habitName, tableName, dataBase } = req.query;
    console.log("getData", habitName, tableName, dataBase);

    new Promise((resolve, reject) => {
        let sql = `SELECT * FROM ${dataBase}.${tableName} WHERE habitName = '${habitName}' ORDER BY id`;
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                // Convert the result to an object with the date as key
                const data = result.reduce((acc, row) => {
                    acc[row.currentDate + "DERP"] = row;
                    return acc;
                }, {});
                resolve(data);
            }
        });
    })
        .then((data) => {
            console.log("works");
            console.log(data);
            res.json(data); // Return the data to the client
        })
        .catch((err) => {
            res.send(err);
        });
});

// DEPRECATED: Get current date. output = [{CURRENT_DATE: "2024-05-08T22:00:00.000Z"}]
app.get("/getDate", (req, res) => {
    let sql = `SELECT CURRENT_DATE`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
});

// get all data for a given habit
app.get("/getHabitData", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    let sql = `SELECT * FROM Habits WHERE habitName = ? ORDER BY id DESC LIMIT 1`;
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
});

// DEPRECATED: get count for last 7 days
app.get("/getHistory", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    let sql = `SELECT (count) FROM Habits WHERE habitName = ? ORDER BY id DESC LIMIT 8`;
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
});

// Get habit name
app.get("/getHabitName", (req, res) => {
    let sql = "SELECT habitName FROM Habits ORDER BY id DESC LIMIT 1";
    db.query(sql, (err, results) => {
        if (err) throw err;
        const habitName = results[0].HabitName;
        res.send(habitName);
        console.log(habitName);
    });
});

// DEPRECATED: Set habit name
app.post("/setHabitName", (req, res) => {
    const habitName = req.body;
    let sql = "INSERT INTO Habits (habitName) VALUES (?)";
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        res.send(habitName);
        console.log(habitName);
    });
});

// set effort for selected habit today
app.post("/setEffort", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    const effortCount = req.body.effortCount;

    let sql = `UPDATE Habits SET effort = ? WHERE habitName = ? AND currentDate = CURDATE()`;
    db.query(sql, [effortCount, habitName], (err, results) => {
        if (err) throw err;
    });

    console.log("habit ", habitName, "has a effort of: ", effortCount);
});

// Get count for selected habit
app.get("/getCount", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    let sql = "SELECT count FROM Habits WHERE habitName = ? ORDER BY id DESC LIMIT 1";
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        const count = results.count;
        res.send(count.toString());
        console.log(count);
    });
});

// Set count for selected habit today
app.post("/setCount", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    const count = req.body.count;
    let sql = "UPDATE Habits SET count = ? WHERE habitName = ? AND currentDate = CURDATE()";
    db.query(sql, [count, habitName], (err, results) => {
        if (err) throw err;
        console.log("habit ", habitName, "has a count of: ", count);
    });
});

// Get target for selected habit. Bruges til /newHabitRow
app.get("/getTarget", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    let sql = "SELECT target FROM Habits WHERE habitName = ? ORDER BY id DESC LIMIT 1";
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        const target = results[0].target;
        res.json(target);
        console.log(target);
    });
});

// Get routine for selected habit. Bruges til /newHabitRow
app.get("/getRoutine", (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    let sql = "SELECT routine FROM Habits WHERE habitName = ? ORDER BY id DESC LIMIT 1";
    db.query(sql, [habitName], (err, results) => {
        if (err) throw err;
        const routine = results[0].routine;
        res.json(routine);
        console.log(routine);
    });
});

// Create new habit row if it doesn't already exist for today
app.post(`/newHabitRow`, (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const habitName = queryObject.habitName;
    const target = req.body.target;
    const routine = req.body.routine;
    console.log(`habitName = `, habitName);
    console.log(`target = `, target);
    console.log(`routine = `, routine);

    let sql = `INSERT INTO ${dbName}.${tableName} (currentDate, habitName, target, routine) SELECT CURDATE(), ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM ${dbName}.${tableName} WHERE habitName = ? AND currentDate = CURDATE() ORDER BY id DESC LIMIT 1)`;
    db.query(sql, [habitName, target, routine, habitName], (err, results) => {
        if (err) throw err;
        console.log("New habit row added...");
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
