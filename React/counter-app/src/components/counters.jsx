//jshint esversion:6

import React, {Component} from 'react';
import Counter from "./counter";

class Counters extends Component{
  state = {
    counters: [
      {id: 1, value:0},
      {id: 2, value:4},
      {id: 3, value:2},
      {id: 4, value:5}
    ]
  };

  handleDelete = counterId=>{
    const counters = this.state.counters.filter(c=>c.id!==counterId);
    this.setState({counters});
  }
  render(){
    return (
      <React.Fragment>
        {this.state.counters.map(counter=>(
          <Counter
          key={counter.id}
          onDelete = {this.handleDelete}
          value={counter.value}
          id={counter.id}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
