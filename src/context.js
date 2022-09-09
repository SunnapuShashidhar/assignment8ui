import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  handler = (action, newObject) => {
    switch (action) {
      case "addRestarent":
        this.setState({
          restarent: [newObject, ...this.state.restarent]
        })
        break;
      case "addCity":
        this.setState({
          locationName: [newObject, ...this.state.locationName]
        })
        break;
      // case "addLocation":
      //   this.setState({
      //     locationName: [newObject, ...this.state.locationName],
      //   });
      //   break;
      case "addSuggesstion":
        this.setState({
          filterList: [newObject, ...this.state.filterList]
        });
        break;
      case "addSearchText":
        this.setState({
          serchText: [newObject, ...this.state.serchText]
        })
        break;
      default:
        break;
    }
  };

  state = {
    handler: this.handler,
    restarent: [],
    mealtype: [],
    locationList: [],
    restarentDetailes: [],
    locationName: "",
    filterList: "",
    serchText: "",
    locationName: "Banglor",
    restarents: [],
    locationValue: []
  };

  async componentDidMount() {
    //--------------getRestarent
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurants`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ restarent: responce.data, locationValue: responce.data });

    });
    //-------------------getMeals
    axios({
      method: "GET",
      url: "https://assignment7ofedureka.herokuapp.com/meals/getMeals",
      header: { "Content-type": "application/json" }
    }).then(responce => { this.setState({ mealtype: responce.data }) }).catch()
    //---------------getCityList
    axios({
      methos: "GET",
      url: "https://assignment7ofedureka.herokuapp.com/citylist/getcitylist",
      header: { "Content-type": "application/json" }
    }).then(responce => {
      this.setState({ locationList: responce.data })
    }).catch();
    //-----------------getrRestarentById
    console.log(this.state.restarent)
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantById/${this.state.restarent._id}`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ restarentDetailes: responce.data });
    });
    axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantByCity?city=${this.state.locationName}`,
      header: { "Content-type": "application/json" },
    }).then((responce) => {
      this.setState({ restarents: responce.data });
    });

  }

  render() {
    return (
      <Context.Provider value={this.state} values={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
