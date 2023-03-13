import { useState, useEffect } from 'react';
import axios from 'axios';


export default function Login () {

    const url = 'http://localhost:8000';
    const [ user, setUser ] = useState(undefined);

    useEffect(() => {
        sessionStorage.setItem("userId", user.id);
    }, [ user ]);

    const getUser = (email,password) => new Promise((resolve, reject) => {
        axios.get(url + '/login', JSON.stringify(email, password))
        .then(res => resolve(res.data))
        .catch(err => {
            reject(err);
        });
    });

    const onSubmit = (values, actions) => {
        if(values.email !== undefined && values.password !== undefined) {
            getUser(values.email, values.password).then(user =>{
                if(user === 'incorrect user'){

                }
            });
        }
    }


    return (
        <form>
            <label for="username">Username</label>
            <textarea 
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"name="username"></textarea>
            <label for="password">Password</label>
            <textarea 
            fullWidth
            autoComplete="password"
            type="email"
            label="Email address"name="password"></textarea>
            <button type="button">Login</button>
        </form>
    );
}