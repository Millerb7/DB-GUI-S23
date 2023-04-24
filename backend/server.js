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
app.get('/user/:id', (req, res) => {
    try {
      const user_id = req.params.id;
      connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, rows, fields) => {
        if (err) throw err;

        console.log(rows[0]);
        res.status(200);
        res.send(rows[0]);
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
    connection.query(`SELECT * FROM users where email = ?`, [req.body.email], (err, rows, fields) => {
        if (err) throw err;

        
        if(rows[0].password == req.body.password) {
            res.status(200);
            res.send(rows[0]);

        } else {
            res.status(201);
            res.send('invalid login attempt');
        }
    });
});

//Calls for Courses 
//
//
//Add a Course
app.post('/courses', (req, res) => {
    const { course_name, course_number, semester, year, course_completed, professor_name, student_id } = req.body;
    const query = `INSERT INTO courses (course_name, course_number, semester, year, course_completed, professor_name, student_id) VALUES ('${course_name}', '${course_number}'  ,'${semester}',${year},${course_completed}, '${professor_name}','${student_id}')`;

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

//Retrieve course by ID
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

//Retrieve courses on completion status - courses/completed/true or courses/completed/false
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

//Retreive course by user & completon status
app.get('/user/courses/:id/completed/:course_completed', (req, res) => {
    try {
        const user_id = req.params.id;
        const course_completed = req.params.course_completed === 'true';
        connection.query('SELECT * FROM courses WHERE student_id = ? AND course_completed = ?', [user_id, course_completed], (err, rows, fields) => { // should pull courses in by student_id and completion status
            if (err) throw err;

            console.log(rows);
            res.status(200);
            res.send(rows);
        });
    } catch (err) {
        console.log(err);
    }
});

//Retrieve Course by user
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

//Can update Course Name, Professor, Semester, Year, and whether or not it is completed by Course ID
app.put('/courses/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    const { course_name, course_number, semester, year, course_completed, professor_name } = req.body;
    const query = `UPDATE courses SET course_name = ?, course_number = ?, course_completed = ?, semester = ?, year = ?, professor_name = ? WHERE course_id = ?`;
    connection.query(query, [course_name, course_number,course_completed, semester, year,  professor_name, course_id], (err, rows, fields) => {
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

//Assignments

//Add Assignment
app.post('/assignments', (req, res)=> {
    const { assignment_name, assignment_id, assignment_due_date, assignment_work_date, course_number, assignment_description, overdue, student_number} = req.body;
    const query = `INSERT INTO assignments 
               (assignment_name, assignment_id, assignment_due_date, assignment_work_date, course_number, assignment_description, overdue, student_number)
               VALUES 
               ('${assignment_name}', ${assignment_id}, '${assignment_due_date}', '${assignment_work_date}', ${course_number}, '${assignment_description}', ${overdue}, ${student_number})`;
    console.log(assignment_id)
        connection.query(query, (err, rows, fields) => {
            if (err) throw err;

            console.log(rows);
            res.status(200);
            res.send("Successfully added assignment!");
        })

})

//Retrieve all assignments
app.get('/assignments', (req, res) => {
    try{
        connection.query('SELECT * FROM assignments', (err, rows, fields) => {
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

//Get assignemnts by course id
app.get('/assignments/courses/:course_id', (req, res) => { // Change :course_number to :course_id
    const course_id = req.params.course_id;
    console.log('Course ID:', course_id);
    connection.query('SELECT * FROM assignments WHERE course_number = ?', [course_id], (err, rows, fields) => {
        try {
            if (err) throw err;
            console.log('Rows: ', rows);
            res.status(200);
            res.send(rows);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }
    });
});



//Delete all assignments
//.delete or .put?
app.delete('/assignments/clear', (req, res) => {
    connection.query('DELETE FROM assignments;', (err, rows, fields) => {
        if (err) throw err;

        res.status(200);
        res.send("Successfully cleared assignments");
    })
})

//Retrieve all missing assignments
app.get('/assignments/missing/:id', (req, res) => {
    console.log(req.params.id)
    const user_id = req.params.id;
    
    connection.query('SELECT * FROM assignments JOIN courses ON assignments.course_id = courses.course_id WHERE assignments.student_number = ? AND assignments.overdue = TRUE', [user_id], (err, rows, fields) => {
        try {
            if (err) throw err;
            console.log(rows);
            res.status(200);
            res.send(rows);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }
    });
});

//Retrieve all missing assignments by course_id
app.get('/assignments/missingassignments/:course_id', (req, res) => {
    const course_id = req.params.course_id;
    connection.query('SELECT * FROM assignments WHERE course_number = 100 AND overdue = 1', [course_id], (err, rows, fields) => {
        try {
            if (err) throw err;
            res.status(200);
            res.send(rows);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }
    });
});

app.get('/assignments/duesoon', (req, res) => {
    // const upcoming = req.params.
    console.log('duesoon');
    connection.query('SELECT * FROM assignments WHERE assignment_due_date >= CURDATE() AND assignment_due_date <= DATE_ADD(CURDATE(), INTERVAL 1 WEEK)', (err, rows, fields) => {
        try {
            console.log(rows);
            if (err) throw err;
            res.status(200);
            res.send(rows);
        } catch (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        }
    });
});

//do all those by course id