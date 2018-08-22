import React, { Component } from 'react';


export default class CartItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>&euro; {this.props.price}</td>
        <td>{this.props.quantity}</td>
        <td>
          <button onClick={this.props.onMinusClick}>-</button><button onClick={this.props.onPlusClick}>+</button>
        </td>
        <td>
          {Number(this.props.quantitySum).toFixed(2)}
        </td>
      </tr>
    );
  }
}