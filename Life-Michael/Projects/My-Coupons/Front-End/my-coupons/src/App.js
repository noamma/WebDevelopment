import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Coupons from './components/coupons';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coupons: []
    };
  }

  componentDidMount() {
    fetch("http://localhost/coupons")
      .then(result => result.json())
      .then(coupons => this.setState({ coupons }));
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Coupons
            coupons={this.state.coupons} />
        </main>
      </React.Fragment>
    );
  }

}

export default App;

