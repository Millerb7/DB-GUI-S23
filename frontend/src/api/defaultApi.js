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

  