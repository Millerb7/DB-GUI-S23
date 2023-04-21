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
