import axios from "axios";

const url = "http://localhost:8000";

// send user
export const sendUser = (user) => {
  axios
    .post(url + "/user", user)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// login for specific user
export const sendLogin = (email, password) => {
  axios
    .post(url + "/user/", { email, password })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all users
export const getUsers = () => {
  axios
    .get(url + "/users")
    .then((res) => {
        console.log(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete specific user
export const deleteUser = ( user ) => {
  axios
    .put(url + "/users/delete", user)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
