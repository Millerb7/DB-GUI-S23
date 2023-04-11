import axios from "axios";

const url = "http://localhost:8000/user";

// send user
export const sendUser = ( first_name, last_name, email, password ) => new Promise((resolve, reject) => {
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
export const sendLogin = (email, password) => new Promise((resolve, reject) => {
  axios
    .post(url + "/login", { email, password })
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
