import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';
class Payment extends Component {
  state = {
    payments: []
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantById/${this.props.match.params.id}`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ payments: responce.data });
    });
  }
  handlePayments = () => {
    const { payments } = this.state;
    return payments.min_price
  }
  render() {
    return (
      <div className='container mt-5'>
        {
          this.handlePayments()
        }
      </div>
    )


  }
}

export default Payment;