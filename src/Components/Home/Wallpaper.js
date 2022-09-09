import axios from "axios";
import React, { Component } from "react";
import "../Styles/Wallpaper.css";
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { Consumer } from "../../context";
class Wallpaper extends Component {
  state = {
    restarent: [],
    Suggestions: [],
    serchText: "",
  }

  //function that call on change of the selector
  handler = (event) => {
    let locationName = event.target.value;
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantByCity?city=${locationName}`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ restarent: responce.data });
    });
  };

  //function tha call on seach
  handlingSearch = (event) => {
    console.log(this.state.restarent)
    const { restarent } = this.state;
    const serchText = event.target.value;
    let filterList;
    if (serchText === "")
      filterList = [];
    else {
      filterList = restarent.filter((item) => {
        return item.name.toLowerCase().includes(serchText.toLowerCase());
      });
      this.setState({ Suggestions: filterList, serchText: serchText });
    }
  };
  renderingSuggesstions = () => {
    const { Suggestions, serchText } = this.state;
    if (Suggestions === "" && serchText) {
      return (
        <ul>
          <li>Not matched</li>
        </ul>
      );
    } else {
      return (
        <ul className="bg-white">
          {Suggestions && Suggestions.map((item) => {
            return (
              <div className="bg-ligth py-2">
                <img className="img-fluid rounded-circle float-left" height="60px" width="50px" src={require("../assets/Images/lunch.jpg")} alt="" />
                <Link to={`/details/${item._id}`} key={uuid()} className="btn border-0">{`${item.name},${item.city}`}
                </Link>
              </div>
            )
          })}
        </ul>
      );
    }
  };
  // navigateToOtherPage = (restarentId) => {
  //   this.props.history.push(`/details/${restarentId._id}`);
  // }
  render() {
    return (
      <Consumer>
        {(value) => {

          const { locationValue } = value;

          return (
            <div className="container-fluid main text-center">
              <h1 className="mainicon">e!</h1>
              <h5 className="title">Find the best restaurants and cafés</h5>
              <div className="row mx-5 px-5 selcetor-row text-center">
                <div className="col-select mx-1">
                  <select
                    name=""
                    id=""
                    className="Selector mt-2 rounded-0"
                    onChange={this.handler}
                  >
                    <option key="1" className="option" value="">
                      Please select value
                    </option>
                    {locationValue &&
                      locationValue.map((item) => {
                        return (
                          <option className="option"
                            value={item.city}
                          >{`${item.name},${item.city}`}</option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-select mt-1 mx-1 serchcol">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 serch-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="enter restarent name"
                    className="px-5 py-2 rounded-0"
                    onChange={this.handlingSearch}
                  />
                  {this.renderingSuggesstions()}
                </div>
              </div>
            </div>
          );
        }

        }
      </Consumer>
    )
  }
}


export default Wallpaper;