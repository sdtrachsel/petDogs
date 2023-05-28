import React from 'react';
import './App.css';
import Header from '../header/Header';
import Dogs from '../Dogs/Dogs';

class App extends React.Component{
 constructor(){
  super()
  this.state = {
    favoriteDogs:[]
  }
 }
render(){
  return (
    <div className="App">
      <Header />
      <Dogs />
    </div>
  )
}
}

export default App;