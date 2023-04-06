import axios from 'axios';

export const getAssignmentById = (id) => new Promise((resolve,reject) => {
    axios.get(`${apiEndpoint}/${id}`, apiConfig)
        .then(resp => resolve(resp.data))
        .catch(error => {
            alert(error);
            reject(error);
        })
});
