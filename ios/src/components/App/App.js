import React from 'react';
import './App.css';
import Header from '../Header/Header'

const App = ({children}) => {
  return (
    <div className="App">
      <Header />
      { children }
    </div>
  )
}

export default App;
