import './App.css';
import axios from 'axios';
import Login from './auth/Login'

function App() {
  const url = 'http://localhost:8000';
  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const user = {
    "first": "Hayden",
    "last": "Center",
    "age": 22,
    "admin": true
  };

  const sendJSON = () => {
    console.log(user);
    axios.put(url + '/parse', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const sendUser = () => {
    axios.post(url + '/user', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data));
    }).catch((err) => {
      console.log(err);
    });
  };

  const clearUsers = () => {
    axios.put(url + '/users/clear', user).then((res) => {
      alert(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <button onClick={checkAPI}>Check API</button>
        <button onClick={sendJSON}>Send JSON</button>
        <button onClick={sendUser}>Send User</button>
        <button onClick={getUsers}>Get Users</button>
        <button onClick={clearUsers}>Clear Users</button>
      </header>
      <Login />
    </div>
  );
}

export default App;
