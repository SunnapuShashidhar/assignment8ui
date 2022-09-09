import axios from 'axios';
import React, { Component } from 'react'
import FilterCard from './FilterCard';
import { Consumer } from '../../context';
import "../Styles/filter.css"
import ReactPaginate from 'react-paginate';

class Filter extends Component {
  state = {
    city: "Mumbai",
    restarents: [
      {
        _id: "1", name: "Harini", description: "A good family restarent", address: "5-12/a", location: "HariNargar", image: "../assets/Images/breakfast.jpg", min_price: "750", contact: "+91780000", cuisine: "North Indian", locality: "Near golhanuman hemple", city: "Mumbai", mealtype: "dinner"
      },
      {
        _id: "2", name: "Poojitha", description: "A good family restarent", address: "5-12/a", location: "HariNargar", image: "../assets/Images/breakfast.jpg", min_price: "550", contact: "+91780000", cuisine: "South Indian", locality: "Near telangana university", city: "Mumbai", mealtype: "lunch"
      },
    ],
    pricesort: true,
    North: false,
    South: false,
    chines: false,
    Fast: false,
    Street: false,
    cost: false,
    count: 0
  }
  onchange = async (event) => {
    const locationName = event.target.value;
    await axios({
      method: "GET",
      url: `https://assignment7ofedureka.herokuapp.com/restarent/getRestaurantByCity?city=${locationName}`,
      handler: { "Content-type": "application/json" }
    }).then((responce) => { this.setState({ restarents: responce.data }) }).catch((e) => { console.log(e) })
    this.setState({ city: locationName });

  }
  handSelct = (handler, event) => {
    event.preventDefault();

    const newCity = {
      city: this.state.city
    }
    handler("addCity", newCity)
  }

  handlePagination = (data) => {
    this.setState({ count: data.selected })
  }
  onSubmitHandler = (event) => {
    event.preventDefault();//to stop the refreshing the page
    const { pricesort, cost, North, South, chines, Fast, Street, restarents } = this.state;
    let FilterOnCuisine = [];
    restarents.map((item) => {
      if (North && item.cuisine == "North Indian") {
        FilterOnCuisine.push(item);
      }
      if (South && item.cuisine == "South Indian") {
        FilterOnCuisine.push(item);
      }

      if (chines && item.cuisine == "chines") {

        FilterOnCuisine.push(item);
      }
      if (Street && item.cuisine == "Street") {
        FilterOnCuisine.push(item);
      }
      if (Fast && item.cuisine == "Fast") {
        FilterOnCuisine.push(item);
      }
    })


    FilterOnCuisine.sort((a, b) => {
      return a.min_price - b.min_price;
    })
    if (!pricesort) {
      console.log(pricesort);
      FilterOnCuisine.sort((a, b) => {
        return b.min_price - a.min_price;
      })
    }
    this.setState({ restarents: FilterOnCuisine });
    let Filter = [];
    FilterOnCuisine.map((item) => {
      if (cost == 100 && item.min_price < 500) {
        Filter.push(item);
      }
      if (cost == 500 && item.min_price >= 500 && item.min_price < 1000) {
        Filter.push(item);
      }
      if (cost == 1000 && item.min_price >= 1000 && item.min_price < 1500) {
        Filter.push(item);
      }
      if (cost == 1500 && item.min_price >= 1500 && item.min_price < 2000) {
        Filter.push(item);
      }
      if (cost == 1500 && item.min_price >= 2000) {
        Filter.push(item);
      }
    })
    if (Filter != "")
      this.setState({ restarents: Filter })

    console.log(pricesort);

    console.log(FilterOnCuisine)
  }
  pageCount = () => {
    if (this.state.restarents.length >= 5)
      return this.state.restarents.length;
    else
      return 5;
  }
  render() {

    return (
      <Consumer>
        {(value) => {
          const { restarent } = value;
          const { restarents, count } = this.state;

          return (
            <div className='container-fluid mt-5'>
              <div className="mainTitle">
                <div className="mt-4">
                  Breakfast Places in  {this.state.city}

                </div>
              </div>
              <div className="row">
                <div className="firstcol col-lg-3 col-md-4 col-sm-6 shadow p-4 m-3 mx-5">

                  <div>
                    <form action={this.onSubmitHandler} onSubmit={this.onSubmitHandler}>
                      <div className="Filter">Filter</div>
                      <div className="head">
                        Select Location
                      </div>
                      <select name="" id="" className="select py-2" onChange={this.onchange}>
                        <option className='px-auto'>Mumbai</option>
                        {
                          restarent.map((item) => {
                            return <option className='select' key={item._id} value={item.city}>{`${item.name},${item.city}`}</option>
                          })
                        }
                      </select>
                      <div className="head mt-2">Cusine</div>
                      <input className='element' onChange={(e) => this.setState({ North: e.target.value })} type="checkbox" name="North" />
                      <label className='element' htmlFor="North">&nbsp; North Indian</label><br />
                      <input className='element' onChange={(e) => this.setState({ South: e.target.value })} type="checkbox" name="South" />
                      <label className='element' htmlFor="South">&nbsp;South Indian</label><br />
                      <input className='element' onChange={(e) => this.setState({ chines: e.target.value })} type="checkbox" name="chines" />
                      <label className='element' htmlFor="chines">&nbsp;Chines</label><br />
                      <input className='element' onChange={(e) => this.setState({ Fast: e.target.value })} type="checkbox" name="Fast" />
                      <label className='element' htmlFor="Fast">&nbsp;Fast Food</label><br />
                      <input className='element' onChange={(e) => this.setState({ Street: e.target.value })} type="checkbox" name="street" />
                      <label className='element' htmlFor="Street">&nbsp;Street Food</label><br />







                      {/*--------------- Cost------------------------- */}
                      <div className='head'>Cost For Two</div>
                      <input className='inputelement' onChange={(e) => this.setState({ cost: e.target.value })} value={100} type="radio" name="cost" id="lessthan500" />
                      <label className='element' htmlFor="lessthan500">&nbsp;less than ₹500</label><br />
                      <input className='inputelement' onChange={(e) => this.setState({ cost: e.target.value })} value={500} type="radio" name="cost" id="500to1000" />
                      <label className='element' htmlFor="500to1000">&nbsp; ₹500 to ₹1000</label><br />
                      <input className='inputelement' onChange={(e) => this.setState({ cost: e.target.value })} value={1000} type="radio" name="cost" id="1000to1500" />
                      <label className='element' htmlFor="1000to1500">&nbsp;₹1000 to ₹1500</label><br />
                      <input className='inputelement' onChange={(e) => this.setState({ cost: e.target.value })} value={1500} type="radio" name="cost" id="1500to2000" />
                      <label className='element' htmlFor="1500to2000">&nbsp; ₹1500 to ₹2000</label><br />
                      <input className='inputelement' onChange={(e) => this.setState({ cost: e.target.value })} value={2000} type="radio" name="cost" id="2000" />
                      <label className='element' htmlFor="2000"> &nbsp;₹2000+</label><br />





                      {/*-------------sort---------------------- */}
                      <div className='head'>Sort</div>
                      <input className='inputelement' onChange="" value={true} type="radio" name="pricesort" id="lowtohigh" />
                      <label className='element' htmlFor="lowtohigh">&nbsp;Price low to high</label><br />

                      <input className='inputelement' onChange={(e) => this.setState({ pricesort: e.target.value })} value={false} type="radio" name="pricesort" id="hightolow" />
                      <label className='element' htmlFor="hightolow"> &nbsp;Price high to low</label><br />

                      <button className='onsubmit btn btn-outline-info px-5 shadow  my-2 w-75' type="submit">Apply</button>
                    </form>
                  </div>
                </div>
                <div className="col-md-7 col-sm-12 mt-2">
                  {
                    restarents && restarents.slice(count, count + 2).map((item) => {
                      return <FilterCard item={item} />
                    })
                  }

                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    containerClassName={"pagination justify-content-center pagecontainer"}
                    previousClassName={"page-item"}
                    marginPagesDisplayed={2}
                    breakLabel={"..."}
                    pageClassName={"page-item rounded"}
                    pageLinkClassName={"page-link mx-2 rounded"}
                    previousLinkClassName={"page-link"}
                    activeClassName={"active"}
                    activeLinkClassName={""}
                    nextClassName={"page-item rounded"}
                    nextLinkClassName={"page-link"}
                    pageCount={this.pageCount()}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePagination}
                  />
                </div>

              </div>
            </div>
          )
        }}
      </Consumer>

    )
  }
}

export default Filter