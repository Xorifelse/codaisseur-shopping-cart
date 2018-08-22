import React, { Component } from 'react';

export default class CheckoutButton extends Component {
  render() {
    return (
      <button onClick={this.props.onCheckoutClick}>Calculate Total</button>
    );
  }
}