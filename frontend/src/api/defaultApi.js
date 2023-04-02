import axios from "axios";

const url = 'http://localhost:8000';

export const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const user = {
    "first": "Hgit yden",
    "last": "Center",
    "age": 22,
    "admin": true
  };

  export const sendJSON = () => {
    console.log(user);
    axios.put(url + '/parse', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  export const sendUser = () => {
    axios.post(url + '/user', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  export const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  };

  export const clearUsers = () => {
    axios.put(url + '/users/clear', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };