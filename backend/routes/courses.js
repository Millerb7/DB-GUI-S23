// const express = require('express');

// const router = express.Router();


/**
 * https://expressjs.com/en/guide/routing.html#express-router
 * 
 * A router is a special Express object that can be used to define how to route and manage
 * requests. We configure a router here to handle a few routes specific to students
 */

// const bodyParser = require('body-parser');
// router.use(bodyParser.json());


// router.post('/courses', (req, res) => {//add course
//     const { course_name, course_id } = req.body;
//     const query = `INSERT INTO courses (course_name, course_id, semester, year, completed) VALUES ('${course_name}','${course_id}')`;

//     connection.query(query, (err, rows, fields) => {
//         if (err) throw err;

//         console.log(rows);
//         res.status(200);
//         res.send("Added course!");
//     }); 

// });

// router.get('/courses', (req,res) => {//get all courses
//     console.log("here")
//     try {
//     connection.query('SELECT * FROM courses', (err, rows, fields) => {
//         if (err) throw err;

//         console.log(rows);
//         res.status(200);
//         res.send(rows);
//     });
// }
//     catch (err) {
//         console.log(err);
//     }
// });

// router.put('/courses', (req,res) => {//Will this clear all or only one?
//     connection.query('DELETE FROM courses', (err, rows, fields) => {
//         if (err) throw err;

//         res.status(200);
//         res.send('Cleared Course!');
//     });
// });

// //How would I update the courses?
// module.exports = router;