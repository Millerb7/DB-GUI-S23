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
    const { course_name, course_id, semester, year, course_completed, professor_name, student_id } = req.body;
    const query = `INSERT INTO courses (course_name, course_id, semester, year, course_completed, professor_name, student_id) VALUES ('${course_name}','${course_id}','${semester}',${year},${course_completed}, '${professor_name}','${student_id}')`;
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
        res.send(rows);
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
app.get('/assignments/missingassignments', (req, res) => {
    const assignment_id = req.params.assignment_id
    connection.query('SELECT assignment_id FROM assignments WHERE overdue = TRUE;', [assignment_id], (err, rows, fields) => {
        try {
            if (err) throw err;
            console.log(rows);
            res.status(200);
            res.send("Succesfully returned all missing assignments");
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
    console.log('Course ID:', course_id);
    connection.query('SELECT * FROM assignments WHERE course_number = 100 AND overdue = 1', [course_id], (err, rows, fields) => {
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

//Retrieve all assignments due within a week
app.get('/assignments/duesoon', (req, res) => {
    connection.query('SELECT * FROM assignments WHERE assignment_due_date >= CURDATE() AND assignment_due_date <= DATE_ADD(CURDATE(), INTERVAL 1 WEEK)', [], (err, rows, fields) => {
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

//do all those by course id