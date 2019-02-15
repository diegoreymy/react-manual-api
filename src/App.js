import React, { Component } from 'react';
import Endpoints from './components/Endpoints';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="main-header">
        <section className="wrap">
          <h1 className="logo"><a href="/">https://diegoreymy.herokuapp.com/</a></h1>
        </section>
		  </header>
        <Endpoints />
      </div>
    );
  }
}

export default App;
