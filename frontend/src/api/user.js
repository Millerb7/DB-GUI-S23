import axios from "axios";

const url = "http://localhost:8000";

// send user
export const sendUser = (user) => new Promise((resolve, reject) => {
  axios
    .post(url + "/user", user)
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
export const sendLogin = ( firstname, lastname, email, password ) => new Promise((resolve, reject) => {
  axios
    .post(url + "/user/", { firstname, lastname, email, password })
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
    .get(url + "/users")
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
    .put(url + "/users/delete", user)
    .then((res) => {
        console.log(res.data);
        resolve(res.data.user);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});
