import React, { Component } from 'react';

import CartItem from './components/CartItem'
import CheckoutButton from './components/CheckoutButton'
import Clock from 'react-live-clock'

// Fetching random data with Faker
import products from './productlist' // item = [{id, name, price}, {...}]

import './App.css';

class App extends Component {
  state = {
    quantity: {}, // {itemId: Quantity}
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

    for(let productId in this.state.quantity){
      sum += products.find(product => product.id === Number(productId)).price * this.state.quantity[productId]
    }

    this.setState({sum})
  }

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <tr>
              <td className="clock" colSpan="5"><Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Amsterdam'} /></td>
            </tr>
            <tr>
              <td>Lorem Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map(item =>
              <CartItem
                key={`${item.name} ${item.id}`}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={this.state.quantity[item.id]}
                quantitySum={Number(this.state.quantity[item.id] * item.price) || 0}
                onPlusClick={() => this.incrementQuantity(item.id)}
                onMinusClick={() => this.decreaseQuantity(item.id)}
              />
            )}
          </tbody>
          <tfoot>
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
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
