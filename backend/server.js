const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CoolPasswordThanks',
    database: 'DBUI'
});

connection.connect();//Does this connect to SQL?

app.get('/', (req,res) => {
    res.send('hello world');
});

app.put('/parse', (req,res) => {
    console.log(req.body);
    try {
        const body = req.body;
        const name = body["first"] + " " + body["last"];
        const age = body["age"];
        const isAdmin = body["admin"] ? "is admin" : "is not an admin";
        const message = `${name} is ${age} years old and ${isAdmin}`;
        res.status(200);
        res.send(message);
    } catch (err) {
        console.log(err);
    }
});

app.get('/db', (req,res) => {
    connection.query('SHOW TABLES', (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send(rows);
    });
});

// app.post('/user', (req, res) => {
//     const { first, last, age, admin } = req.body;
//     const query = `INSERT INTO users (first_name, last_name, age, admin) VALUES ('${first}','${last}',${age},${admin})`;
//     connection.query(query, (err, rows, fields) => {
//         if (err) throw err;
//         console.log(rows);
//         res.status(200);
//         res.send("Added user!");
//     });
// });

//ryans stuff

app.post('/user', (req,res) => {
    console.log(req.body);
    const { user_id, first_name, last_name, age, admin, courses, totalAssigns, completedAssigns} = req.body;
    const query = `INSERT INTO users (user_id, first_name, last_name, age, admin, courses, totalAssigns, completedAssigns) VALUES ('${user_id}', '${first_name}','${last_name}','${age}','${admin}','${courses}','${totalAssigns}','${completedAssigns}')`;
        connection.query(query, (err,rows,fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(200);
            res.send("Added user");
        });
});

app.get('/users', (req,res) => {
    connection.query('SELECT * FROM users', (err,rows,fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send(rows);
    })
})

//end of ryans stuff

app.put('/users', (req,res) => {
    connection.query('DELETE FROM users', (err, rows, fields) => {
        if (err) throw err;

        res.status(200);
        res.send('Cleared users!');
    });
});

app.post('/login', (req,res) => {
    console.log(req.body);
    connection.query(`SELECT email=${req.body.email} FROM users`, (err, rows, fields) => {
        if (err) throw err;
        
        console.log(rows);
        if(rows.password == req.body.password) {
            res.status(200);
            res.send(rows);

        } else {
            res.status(201);
            res.send('Incorrect Login!');
        }
    });
});


app.post('/courses', (req, res) => {//add course
    const { course_name, course_id, semester, year, course_completed } = req.body;
    const query = `INSERT INTO courses (course_name, course_id, semester, year, course_completed) VALUES ('${course_name}','${course_id}','${semester}',${year},${course_completed})`;
console.log(course_id)
    connection.query(query, (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send("Added course!");
    }); 

});

//Retrieve all courses
app.get('/courses', (req,res) => {
    console.log("here")
    try {
    connection.query('SELECT * FROM courses', (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send(rows);
    });
}
    catch (err) {
        console.log(err);
    }
});

//Can update Course Name and whether or not it is completed 
app.put('/courses/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { course_name, course_completed } = req.body;
    const query = `UPDATE courses SET course_name = ?, course_completed = ? WHERE course_id = ?`;
    connection.query(query, [course_name, course_completed, course_id], (err, rows, fields) => {
      if (err) throw err;
  
      console.log(rows);
      res.status(200);
      res.send("Updated course!");
    });
  });
  
//Delete a course
app.delete('/courses/:course_id',(req, res)=> {
    const course_id = req.params.course_id;
    connection.query('DELETE FROM courses WHERE course_id = ?', [course_id], (err, rows, fields) =>{
        if (err) throw err;

        res.status(200);
        res.send('Course Deleted!');
    });
});

//How would I update the courses?
app.listen(port, () => {
    console.log(`listening to port ${port}`);
});