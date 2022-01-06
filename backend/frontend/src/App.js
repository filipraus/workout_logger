import './App.css';

import Calendar from './components/calendar/calendar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>workout logger</h1>
      </header>
      <main className="App-main">
        <Calendar />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
