
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

export const getCourses = () => new Promise((resolve, reject) => {
  axios.get(url + '/courses')
    .then(resp => resolve(resp.data))
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const getCourseById = (course_id) => new Promise((resolve, reject) => {
  axios.get(url + `/courses/${course_id}`)
    .then(resp => {
      resolve(resp.data);
    })
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const editCourse = (course_id, course) => new Promise((resolve, reject) => {
  axios.put(url + `/courses/${course_id}`, course)
    .then(resp => {
      resolve(resp.data);
    })
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const addCourse = (course) => new Promise((resolve, reject) => {
  axios.post(url + '/courses', course)
    .then(resp => {
      resolve(resp.data);
    })
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const getCurrentCourses = () => new Promise((resolve, reject) => {
  axios.get(url + `/courses/completed/${false}`)
    .then(resp => resolve(resp.data))
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const getPastCourses = () => new Promise((resolve, reject) => {
  axios.get(url + `/courses/completed/${true}`)
    .then(resp => resolve(resp.data))
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const getPastCoursesByID = (student_id) => new Promise((resolve, reject) => {
  axios.get(url + `/user/courses/${student_id}/completed/${true}`)
    .then(resp => resolve(resp.data))
    .catch(error => {
      alert(error);
      reject(error);
    });
});

export const getCurrentCoursesByID = (student_id) => new Promise((resolve, reject) => {
  axios.get(url + `/user/courses/${student_id}/completed/${false}`)
    .then(resp => resolve(resp.data))
    .catch(error => {
      alert(error);
      reject(error);
    });
});

 //Be able to pull in courses by student ID
  //Do I need to clear?
//Make sure to check how to pull courses by ID