import React, { Component } from 'react'
import { Consumer } from '../../context';
import "../Styles/detailes.css"
import axios from "axios"
import { Link } from "react-router-dom"
import Payment from '../Filter/Payment';
class Detailes extends Component {
  state = {
    restarentDetailes: []
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantById/${this.props.match.params.id}`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ restarentDetailes: responce.data });
    });
  }

  render() {

    return (
      <Consumer>
        {(value) => {
          const { restarentDetailes, handlepaymrnt } = this.state;
          const image = restarentDetailes.image;
          return (
            <div className='container pb-4 mt-5'>

              <img className='w-100 mt-2 mainimg' src={require("../assets/Images/breakfast.jpg")} alt="" />
              <div className='resname'>{restarentDetailes.name}</div>
              <div>
                <Link to={`/payments/${restarentDetailes._id}`} className="btn btn-info mx-auto">Order</Link>

              </div>

              <div className="restarendetailes">
                <div className="underline"></div>
                <div className="restarentdata">
                  <input type="radio" name="header" id="header1" checked={true} />
                  <label className="header cuisinehead" htmlFor="header1">
                    Overview
                  </label>
                  <div className="content">
                    <div className="aboutplc">About this place</div>
                    <div className="cuisinehead">Cuisine</div>
                    <div className="cuisinedata">{restarentDetailes.cuisine}</div>
                    <div className="cuisinehead">Average Cost</div>
                    <div className="cuisinedata pb-4">{`${restarentDetailes.min_price} for two people(approx)`}</div>
                  </div>
                </div>
                <div className="restarentdata">
                  <input type="radio" name="header" id="header2" />
                  <label className="header cuisinehead" htmlFor="header2">Contact
                  </label>
                  <div className="content">
                    <div className="aboutplc">Contact Detailes</div>
                    <div className="cuisinehead">location</div>
                    <div className="cuisinedata">{restarentDetailes.location}</div>
                    <div className="cuisinehead">locality</div>
                    <div className="cuisinedata">{restarentDetailes.locality}</div>
                    <div className="cuisinehead">City</div>
                    <div className="cuisinedata">{restarentDetailes.city}</div>
                    <div className="cuisinehead">Contact Detailes</div>
                    <div className="cuisinedata pb-4">{`for more detailes make a call to ${restarentDetailes.contact}`}</div>
                  </div>
                </div>
              </div>
            </div>


          )
        }}
      </Consumer>
    )
  }
}

export default Detailes;