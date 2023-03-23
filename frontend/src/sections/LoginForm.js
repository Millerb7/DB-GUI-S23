import React, { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios.post("/login", { email: email, password: password })
      .then((response) => {
        console.log("logged in");
        console.log(response.data);
        // window change
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={() => {setEmail(email);}} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={() => {setPassword(email);}} />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
  );
}