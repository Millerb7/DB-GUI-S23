import { Assignment } from '@mui/icons-material';
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
    axios.get(`${url}/user/${id}`)
        .then(resp => {console.log(resp) 
            resolve(resp.data)})
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
        .then(resp => {
            console.log(resp.data)
            resolve(resp.data)})
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getUpcomingAssignments = () => new Promise((resolve, reject) => {
    axios.get(`${url}/duesoon`)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getUpcoming = (userId) => new Promise((resolve, reject) => {
    axios.get(`${url}/missing/${userId}/0`)
        .then(resp => {
            console.log(resp)
            resolve(resp.data)})
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const getAssignmentsByDay = (date) => new Promise((resolve, reject) => {
    axios.get(`${url}/date/${date}`)
        .then(resp => {
            console.log(resp)
            resolve(resp.data)
        })
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const addAssignment = (assignment) => new Promise((resolve, reject) => {
    console.log(assignment)
    axios.post(`${url}`, assignment)
        .then(resp => {
            console.log(resp)
            resolve(resp.data)
        })
        .catch(error => {
            alert(error);
            reject(error);
        })
});

export const editAssignment = (id, assignment) => new Promise((resolve, reject) => {
    axios.put(`${url}/${id}`, assignment)
        .then(resp => {
            console.log(resp)
            resolve(resp.data)
        })
        .catch(error => {
            alert(error);
            reject(error);
        })
});