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

connection.connect();

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

app.post('/user', (req,res) => {
    console.log(req.body);
    const { first_name, last_name, email, password } = req.body;
    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${user_id}', '${first_name}','${last_name}','${email}','${password}')`;
        connection.query(query, (err,rows,fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(200);
            res.send(rows);
        });
});

//ryans stuff

//add user
app.post('/user', (req,res) => {
    console.log(req.body);
    const { first_name, last_name, email, password} = req.body;
    const query = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${user_id}', '${first_name}','${last_name}','${email}','${password}')`;
        connection.query(query, (err,rows,fields) => {
            if (err) throw err;
            console.log(rows);
            res.status(200);
            res.send(rows);
        });
});

//get all users
app.get('/users', (req,res) => {
    connection.query('SELECT * FROM users', (err,rows,fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send(rows);
    })
})


//get user by id
app.get('/users/:id', (req, res) => {
    try {
      const user_id = req.params.id;
      connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, rows, fields) => {
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

//end of ryans stuff

app.put('/users', (req,res) => {
    connection.query('DELETE FROM users', (err, rows, fields) => {
        if (err) throw err;

        res.status(200);
        res.send('Cleared users!');
    });
});

app.post('/user/login', (req,res) => {
    console.log(req.body);
    connection.query(`SELECT * FROM users where email=${req.body.email}`, (err, rows, fields) => {
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
    const { course_name, semester, year, course_completed, professor_name, student_id } = req.body;
    const query = `INSERT INTO courses (course_name, semester, year, course_completed, professor_name, student_id) VALUES ('${course_name}','${semester}',${year},${course_completed}, '${professor_name}','${student_id}')`;

    connection.query(query, (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send("Added course!");
    }); 

});

//Retrieve all courses
app.get('/courses', (req,res) => {
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

//Get course by ID
app.get('/courses/:id', (req, res) => {
    try {
      const course_id = req.params.id;
      connection.query('SELECT * FROM courses WHERE course_id = ?', [course_id], (err, rows, fields) => {
        if (err) throw err;

        console.log(rows);
        res.status(200);
        res.send(rows[0]);//returnring one record
    });
}
    catch (err) {
        console.log(err);
    }
});

//Pull courses on completion status - courses/completed/true or courses/completed/false
app.get('/courses/completed/:course_completed', (req, res) => {
    try {
      const course_completed = req.params.course_completed === 'true';
      connection.query('SELECT * FROM courses WHERE course_completed = ?', [course_completed], (err, rows, fields) => {
        if (err) throw err;
  
        console.log(rows);
        res.status(200);
        res.send(rows);
      });
    } catch (err) {
      console.log(err);
    }
  });


//remove :username - make route on frontend
app.get('/user/courses/:id', (req, res) => {
    try {
      const user_id = req.params.id;//req.user.username
      connection.query('SELECT * FROM courses WHERE student_id = ?', [user_id], (err, rows, fields) => {//should pull courses in by student_id
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
    const { course_name,  semester, year, course_completed, professor_name } = req.body;
    const query = `UPDATE courses SET course_name = ?, course_completed = ?, semester = ?, year = ?, professor_name = ? WHERE course_id = ?`;
    connection.query(query, [course_name, course_completed, semester, year,  professor_name, course_id], (err, rows, fields) => {
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

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});