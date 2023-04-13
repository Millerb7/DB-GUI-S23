
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
    "course_name": "English",
    "course_id": 123,
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

  export const AddCourse = (course_id) => {
    axios.put(url + '/courses/' + course_id).then((res) => {
        alert(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const getCurrentCourses = () => new Promise((resolve, reject) => {
    axios.get(url + '/courses/completed/' + false)
        .then(resp => resolve(resp.data))
        .catch(error => {
          alert(error);
          reject(error);
        });
  });

  export const getPastCourses = () => new Promise((resolve, reject) => {
    axios.get(url + '/courses/completed/' + true)
        .then(resp => resolve(resp.data))
        .catch(error => {
          alert(error);
          reject(error);
        });
  });

  


 
  //Do I need to clear?
