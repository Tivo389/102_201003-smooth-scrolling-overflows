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
          <div className="category">
            <img src={circle} alt="circle" width="100%"/>
          </div>
          <div className="category">
            <img src={hexagon} alt="hexagon" width="100%"/>
          </div>
          <div className="category">
            <img src={square} alt="square" width="100%"/>
          </div>
          <div className="category">
            <img src={triangle} alt="triangle" width="100%"/>
          </div>
        </div>
        <div className="itemContainer">
          <div className="items">
            { this.imageCount.map(key => <img src={circle} alt="circle" width="100%" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={hexagon} alt="hexagon" width="100%" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={square} alt="square" width="100%" key={key}/>) }
          </div>
          <div className="items">
            { this.imageCount.map(key => <img src={triangle} alt="triangle" width="100%" key={key}/>) }
          </div>
        </div>
      </div>
    );
  }
}

export default SmoothScroll;
