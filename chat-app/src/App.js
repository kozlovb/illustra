import React from 'react';
import './App.css';  // Assuming you have default styles here
import Chat from './components/chat';  // Import chat.js from the components folder


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Chat />  {/* Render the chat component */}
      </header>
    </div>
  );
}

export default App;


