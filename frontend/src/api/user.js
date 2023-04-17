import axios from "axios";

const url = "http://localhost:8000/user";

<<<<<<< HEAD
// send user
export const sendUser = ( first_name, last_name, email, password ) => new Promise((resolve, reject) => {
=======
// create a new user
export const createUser = (user) => new Promise((resolve, reject) => {
>>>>>>> 7c894641465dd7813512785f9a4b07dab95f5add
  axios
    .post(url, { first_name, last_name, email, password })
    .then((res) => {
        console.log(res.data);
        resolve(res.data.user);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

// login for specific user
export const sendLogin = ( email, password ) => new Promise((resolve, reject) => {
  axios
<<<<<<< HEAD
    .post(url + "/login", { email, password })
=======
    .post(url + "/user/login", { email, password })
>>>>>>> 7c894641465dd7813512785f9a4b07dab95f5add
    .then((res) => {
      console.log(res.data);
      resolve(res.data);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

// get all users
export const getUsers = () => new Promise((resolve, reject) => {
  axios
    .get(url)
    .then((res) => {
        console.log(JSON.stringify(res.data));
        resolve(res.data.user);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});

// delete specific user
export const deleteUser = ( user ) => new Promise((resolve, reject) => {
  axios
    .delete(url + `/delete/${user.id}`)
    .then((res) => {
        console.log(res.data);
        resolve(res.data.user);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});
