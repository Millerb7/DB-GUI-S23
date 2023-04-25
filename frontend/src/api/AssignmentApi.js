import axios from 'axios';

const url = 'http://localhost:8000/assignments';

export const getAssignmentById = (id) => new Promise((resolve,reject) => {
    axios.get(`${url}/${id}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});

// get all of a users assignments
export const getUserAssignments = (id) => new Promise((resolve,reject) => {
    axios.get(`${url}/${id}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getMissingAssignments = (id) => new Promise((resolve, reject) => {
    axios.get(`${url}/missing/`+ id)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getAssignmentsByCourse = (course_id, user_id, overdue) => new Promise((resolve, reject) => {
    axios.get(`${url}/missing/${course_id}/${user_id}/${overdue}`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getUpcomingAssignments = () => new Promise((resolve, reject) => {
    axios.get(`${url}/duesoon`)
        .then(resp => {
            console.log(resp)
            resolve(resp.data)})
        .catch(error => {
            alert(error);
            reject(error);
        })
});