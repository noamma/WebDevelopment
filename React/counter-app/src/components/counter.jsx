//jshint esversion:6

import React, { Component } from 'react';

class Counter extends Component {
  // styles = {
  //   fontSize: 10,
  //   fontWeight: "bold"
  // };

// constructor(){
//   super();
//   this.handleIncrement = this.handleIncrement.bind(this);
// }



// renderTags(){
//   const {tags} = this.state;
//   return tags.length === 0 ? <p>There are no tags!</p> : <ul>{tags.map(tag=><li key={tag}>{tag}</li>)}</ul>;
// }


  render() {
    return (
    <div>
    <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
    <button
      onClick = {() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm">Increment
      </button>
    <button
      onClick = {() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">Delete
      </button>
    </div>
    );
  }

getBadgeClasses(){
  let classes = "badge m-2 badge-";
  classes+=this.props.counter.value === 0 ? 'warning': 'primary';
  return classes;
}

  formatCount(){
    const {value} = this.props.counter;
    return value === 0 ? 'ZERO' : value;
  }
}

export default Counter;
