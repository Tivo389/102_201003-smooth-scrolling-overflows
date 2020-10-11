import React, { Component } from 'react';
import circle from '../images/circle.svg';
import hexagon from '../images/hexagon.svg';
import square from '../images/square.svg';
import triangle from '../images/triangle.svg';

class SmoothScroll extends Component {
  // COMPONENT VARIABLES
  imageCount = [];
  itemStartX = [];

  // LIFECYCLE METHODS
  componentDidMount() {
    this.getVariables();
  }
  componentDidUpdate() {}
  componentWillUnmount() {}

  // RENDER OF COMPONENT
  render() {
    for (let i = 0; i < 7; i++) this.imageCount.push(i);
    return (
      <div className="smoothScrollContainer">
        <div className="itemContainer" onScroll={this.itemContainerOnScroll}>
          <div className="items">
            { this.imageCount.map(
              key => <img src={circle} alt="circle" width="100%" key={key}/>
            )}
          </div>
          <div className="items">
            { this.imageCount.map(
              key => <img src={hexagon} alt="hexagon" width="100%" key={key}/>
            )}
          </div>
          <div className="items">
            { this.imageCount.map(
              key => <img src={square} alt="square" width="100%" key={key}/>
            )}
          </div>
          <div className="items">
            { this.imageCount.map(
              key => <img src={triangle} alt="triangle" width="100%" key={key}/>
            )}
          </div>
        </div>
        <div className="categoryContainer">
          <div className="category active">
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
      </div>
    );
  }

  // FUNCTION
  getVariables = () => {
    // itemContainer
    this.itemContainer = document.querySelector('.itemContainer');
    this.items = this.itemContainer.querySelectorAll('.items');
    this.items.forEach(item => this.itemStartX.push(item.getBoundingClientRect().x));
    this.icScrollWidth = this.itemContainer.scrollWidth;
    // categoryContainer
    this.categoryContainer = document.querySelector('.categoryContainer');
    this.categories = this.categoryContainer.querySelectorAll('.category');
  };
  itemContainerOnScroll = (e) => {
    const detectionThreshold = e.currentTarget.scrollLeft + (window.innerWidth * 0.5);
    this.itemStartX.forEach((startValue, i) => {
      const endValue  = (this.itemStartX[i + 1]) ? this.itemStartX[i + 1] : this.icScrollWidth;
      if (detectionThreshold >= startValue && detectionThreshold < endValue) {
        this.categories.forEach(category => category.classList.remove('active'));
        this.categories[i].classList.add('active');
      }
    });
  };
}

export default SmoothScroll;
