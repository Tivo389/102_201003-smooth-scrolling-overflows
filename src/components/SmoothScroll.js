import React, { Component } from 'react';
import circle from '../images/circle.svg';
import hexagon from '../images/hexagon.svg';
import square from '../images/square.svg';
import triangle from '../images/triangle.svg';

class SmoothScroll extends Component {
  // COMPONENT VARIABLES
  imageCount = [];

  // LIFECYCLE METHODS
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  // RENDER OF COMPONENT
  render() {
    for (let i = 0; i < 7; i++) this.imageCount.push(i);
    return (
      <div className="smoothScrollContainer">
        <div className="categoryContainer">
          <p className="category">Circle</p>
          <p className="category">Hexagon</p>
          <p className="category">Squares</p>
          <p className="category">Triangle</p>
        </div>
        <div className="itemContainer">
          <div className="items">
            { this.imageCount.map(key => <img src={circle} alt="circle" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={hexagon} alt="circle" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={square} alt="circle" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={triangle} alt="circle" key={key}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default SmoothScroll;
