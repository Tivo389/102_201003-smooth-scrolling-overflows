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
        <div className="categoryContainer">
          <div className="category active" onPointerDown={this.categoryOnPointerDown}>
            <img src={circle} alt="circle" width="100%"/>
          </div>
          <div className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={hexagon} alt="hexagon" width="100%"/>
          </div>
          <div className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={square} alt="square" width="100%"/>
          </div>
          <div className="category" onPointerDown={this.categoryOnPointerDown}>
            <img src={triangle} alt="triangle" width="100%"/>
          </div>
        </div>
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
      </div>
    );
  }

  // FUNCTIONS
  // Activate the .category element that is active
  categoryActivateClass = (i) => {
    this.categories.forEach(category => category.classList.remove('active'));
    this.categories[i].classList.add('active');
  };
  // OnPointerDown for the .category element
  categoryOnPointerDown = (e) => {
    this.categories.forEach((category,i) => {
      // Only for the active .category element
      const isActive = e.currentTarget.classList.contains('active');
      if (category === e.currentTarget && !isActive) {
        // Define the index you will be arriving at
        this.arrivalIndex = i;
        // Define the index you will be departing from
        this.getDepartureIndex();
        // Activate the appropriate .category element
        this.categoryActivateClass(i);
        // Scroll the .itemContainer to the appropriate location
        this.itemContainerScrollToActive();
      }
    });
  };
  // While the index is unknown, loop through the this.categories
  getDepartureIndex = () => {
    let indexUnknown = true;
    if (indexUnknown) {
      this.categories.forEach((category,i) => {
        if (category.classList.contains('active') && indexUnknown) {
          this.departureIndex = i;
          indexUnknown = !indexUnknown;
        }
      });
    }
  };
  // Define the component properties that will become necessary
  getVariables = () => {
    // Item
    this.itemContainer = document.querySelector('.itemContainer');
    this.items = this.itemContainer.querySelectorAll('.items');
    this.items.forEach(item => this.itemStartX.push(item.offsetLeft));
    this.icScrollWidth = this.itemContainer.scrollWidth;
    this.itemsElement = document.querySelector('.itemsElement');
    // Category
    this.categoryContainer = document.querySelector('.categoryContainer');
    this.categories = this.categoryContainer.querySelectorAll('.category');
    // Other
    this.getDepartureIndex();
  };
  // On scroll, determine which itemStart values you are between, and activate .category
  itemContainerOnScroll = (e) => {
    const detectionThreshold = e.currentTarget.scrollLeft + (this.itemContainer.offsetWidth * 0.5);
    this.itemStartX.forEach((startValue, i) => {
      const endValue  = (this.itemStartX[i + 1]) ? this.itemStartX[i + 1] : this.icScrollWidth;
      if (detectionThreshold >= startValue && detectionThreshold < endValue) {
        this.categoryActivateClass(i);
      }
    });
  };
  // Perform smooth scroll transition, and upon transitionend, call itemContainerScrollToActiveEnd
  itemContainerScrollToActive= () => {
    this.itemContainer.addEventListener('transitionend', this.itemContainerScrollToActiveEnd);
    this.scrollLeftStart = this.itemContainer.scrollLeft;
    this.itemsElement.classList.add('willAnimate');
    if (this.departureIndex < this.arrivalIndex) {
      this.transformValue = (this.itemStartX[this.arrivalIndex] - this.scrollLeftStart) * -1;
    } else {
      this.transformValue = Math.abs(this.itemStartX[this.arrivalIndex] - this.scrollLeftStart);
    }
    this.itemsElement.style = `transform: translateX(${this.transformValue}px)`;
  };
  // Remove class and styles, and transplant value to scroll left once smooth scroll has ended
  itemContainerScrollToActiveEnd = () => {
    this.itemContainer.removeEventListener('transitionend', this.itemContainerScrollToActiveEnd);
    this.itemsElement.classList.remove('willAnimate');
    this.itemsElement.style = null;
    this.itemContainer.scrollLeft = Math.abs(this.itemStartX[this.arrivalIndex]);
  };
}

export default SmoothScroll;
