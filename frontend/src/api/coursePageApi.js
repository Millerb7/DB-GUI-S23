
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
    "semester": "Fall",
    "year": 2023,
    "completed": false,
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

  export const getCourseById = (course_id) => {
    axios.get(url + '/courses/' + course_id).then((res) => {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
  //Do I need to clear?