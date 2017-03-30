import React from 'react';
import './App.css';
import Header from '../Header/Header';

const App = ({ location, children }: { location: Location, children: ReactComponent[] }): ReactComponent => {
  return (
    <div className="App">
      <Header location={location} />
      { children }
    </div>
  );
};

export default App;
