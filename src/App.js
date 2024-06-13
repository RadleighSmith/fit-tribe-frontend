import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to FitTribe
        </p>
        <p>
          The Fitness Social Media App
        </p>
        <Button variant="primary">Button Test</Button>
      </header>
    </div>
  );
}

export default App;