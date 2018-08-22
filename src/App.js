import React, { Component } from 'react';

import CartItem from './components/CartItem'
import CheckoutButton from './components/CheckoutButton'
import products from './productlist'
import Clock from 'react-live-clock'


import './App.css';

class App extends Component {
  state = {
    quantity: {},
    sum: 0.00
  }

  incrementQuantity(productId){
    let obj = {}

    if(!(productId in this.state.quantity)){
      obj = {[productId]: 1}
    } else {
      obj = {[productId]: this.state.quantity[productId] + 1}
    }

    this.setState({
      quantity: Object.assign({}, this.state.quantity, obj)
    })
  }

  decreaseQuantity(productId){
    if(productId in this.state.quantity && this.state.quantity[productId] > 0){
      this.setState({
        quantity: Object.assign({}, this.state.quantity, {[productId]: this.state.quantity[productId] - 1})
      })
    }
  }

  checkout(){
    let sum = 0

    for(let item in this.state.quantity){
      sum += products.find(product => product.id === Number(item)).price * this.state.quantity[item]
    }

    this.setState({sum})
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <td>Lorem Name</td>
              <td>Price</td>
              <td>Amount</td>
              <td></td>
              <td><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Amsterdam'} /></td>
            </tr>
          </thead>
          <tbody>
            {products.map(item =>
              <CartItem
                key={item.name}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={this.state.quantity[item.id]}
                onPlusClick={() => this.incrementQuantity(item.id)}
                onMinusClick={() => this.decreaseQuantity(item.id)}
              />
            )}
            <tr><td colSpan="5">&nbsp;</td></tr>
            <tr>
              <td colSpan="3"></td>
              <td>Sum:</td>
              <td>&euro;{Number(this.state.sum).toFixed(2)}</td>
            </tr>              
            <tr>
              <td colSpan="3"></td>
              <td>Tax:</td>
              <td>&euro;{Number(this.state.sum / 100 * 19).toFixed(2)}</td>
            </tr>    
            <tr>
              <td colSpan="3"></td>
              <td>Total:</td>
              <td>&euro;{Number(this.state.sum + (this.state.sum / 100 * 19)).toFixed(2)}</td>
            </tr>        
            <tr><td colSpan="5"><CheckoutButton onCheckoutClick={() => this.checkout()} /></td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
