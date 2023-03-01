import './App.css';
import axios from 'axios';

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
        <button onClick={checkAPI}>Check API</button>
        <button onClick={sendJSON}>Send JSON</button>
      </header>
    </div>
  );
}

export default App;
