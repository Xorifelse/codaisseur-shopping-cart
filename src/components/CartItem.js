import React, { Component } from 'react';


export default class CartItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>&euro; {this.props.price}</td>
        <td>{this.props.quantity}</td>
        <td>
          <button onClick={this.props.onPlusClick}>Add</button>
        </td>
        <td>
          <button onClick={this.props.onMinusClick}>Remove</button>
        </td>
      </tr>
    );
  }
}