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
          <div className="itemsElement">
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
        </div>
        <div className="categoryContainer">
          <div
          className="category active" onPointerDown={this.categoryOnPointerDown}>
            <img src={circle} alt="circle" width="100%"/>
          </div>
          <div
          className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={hexagon} alt="hexagon" width="100%"/>
          </div>
          <div
          className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={square} alt="square" width="100%"/>
          </div>
          <div
          className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={triangle} alt="triangle" width="100%"/>
          </div>
        </div>
      </div>
    );
  }

  // FUNCTIONS
  categoryOnPointerDown = (e) => {
    this.categories.forEach((category,i) => {
      const isActive = e.currentTarget.classList.contains('active');
      if (category === e.currentTarget && !isActive) {
        this.endIndex = i;
        this.categoryActivateClass();
        this.itemContainerScrollToActive();
      }
    });
  };
  getStartIndex = () => {
    let indexUnknown = true;
    if (indexUnknown) {
      this.categories.forEach((category,i) => {
        if (category.classList.contains('active') && indexUnknown) {
          this.startIndex = i;
          indexUnknown = !indexUnknown;
        }
      });
    }
  };
  getVariables = () => {
    // itemContainer
    this.itemContainer = document.querySelector('.itemContainer');
    this.items = this.itemContainer.querySelectorAll('.items');
    this.items.forEach(item => this.itemStartX.push(item.getBoundingClientRect().x));
    this.icScrollWidth = this.itemContainer.scrollWidth;
    // itemsElement
    this.itemsElement = document.querySelector('.itemsElement');
    // categoryContainer
    this.categoryContainer = document.querySelector('.categoryContainer');
    this.categories = this.categoryContainer.querySelectorAll('.category');
    // Other
    this.getStartIndex();
  };
  itemContainerOnScroll = (e) => {
    // const detectionThreshold = e.currentTarget.scrollLeft + (window.innerWidth * 0.5);
    // this.itemStartX.forEach((startValue, i) => {
    //   const endValue  = (this.itemStartX[i + 1]) ? this.itemStartX[i + 1] : this.icScrollWidth;
    //   if (detectionThreshold >= startValue && detectionThreshold < endValue) {
    //     this.categoryActivateClass(i);
    //   }
    // });
  };
  itemContainerScrollToActive= () => {
    this.itemContainer.addEventListener('transitionend', this.itemContainerScrollToActiveEnd);
    this.scrollLeftStart = this.itemContainer.scrollLeft;
    this.itemsElement.classList.add('willAnimate');
    if (this.startIndex < this.endIndex) {
      this.transformValue = (this.itemStartX[this.endIndex] - this.scrollLeftStart) * -1;
    } else {
      this.transformValue = this.itemStartX[this.endIndex] - this.scrollLeftStart;
    }
    this.itemsElement.style = `transform: translateX(${this.transformValue}px)`;
  };
  itemContainerScrollToActiveEnd = () => {
    this.itemContainer.removeEventListener('transitionend', this.itemContainerScrollToActiveEnd);
    this.itemsElement.classList.remove('willAnimate');
    this.itemsElement.style = null;
    this.itemContainer.scrollLeft = Math.abs(this.itemStartX[this.endIndex]);
  };
  categoryActivateClass = () => {
    this.categories.forEach(category => category.classList.remove('active'));
    this.categories[this.endIndex].classList.add('active');
  };
}

export default SmoothScroll;
