
import axios from "axios";

const url = 'http://localhost:8000';

export const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const course = {
    "name": "English",
    "id": 123,
  };

  export const sendJSON = () => {
    console.log(course);
    axios.put(url + '/parse', course).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  export const sendCourses = () => {
    axios.post(url + '/courses', course).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };


  export const getCourses = () => {
    axios.get(url + '/courses').then((res) => {
      alert(JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  };

  //Do I need to clear?