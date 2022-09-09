import axios from 'axios';
import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Consumer } from '../../context';

class SignUp extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    password: "",
    submitMessage: "",
    submitMessageTextColor: "",
  };
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (handler, event) => {
    event.preventDefault();

    const newSignUp = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    };
    const responce = await axios.post("https://portfoliomicroservers.herokuapp.com/newuser/", newSignUp)
    let isSuccessful = responce.data.isSuccessful;
    // let isSuccessful = true;
    const { name } = this.state;
    if (isSuccessful) {
      this.setState({
        submitMessage: `Thanks ${name} . Your successfully SignUp `,
        submitMessageTextColor: "text-info",
      });

    }
    else {
      this.setState({
        submitMessage: "Your account already exist!So,Please go for login",
        submitMessageTextColor: "text-danger",
      });
    }

    // handler("ADD_REGESTER", newSignUp);
  };


  render() {
    return (
      <Consumer>
        {(value) => {
          const { submitMessageTextColor, submitMessage } = this.state;
          const { handler } = value;
          return (
            <div className="container my-5 py-5">
              <  h1 className="font-weight-light text-center py-5">
                <span className="text-info">Thanks you!</span> showing interest
              </h1>
              <div className="row justify-content-center">
                <div className="col-11 col-lg-5">
                  <form onSubmit={this.onSubmit.bind(this, handler)}>
                    <div className="form-group">
                      <label htmlFor="name">Name*</label>
                      <input type="text" name="name" placeholder="name" className="form-control" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email*</label>
                      <input type="email" name="email" placeholder="name@example.com" className="form-control" onChange={this.onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">password</label>
                      <input type="password" name="password" placeholder="password" className="form-control" onChange={this.onChange} required />
                    </div>
                    <button type="submit" className="btn btn-danger w-100" style={{ backgroundColor: "red" }}>
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
              <div className="py-5 mx-2 text-center">
                <h5 className={submitMessageTextColor}>{submitMessage}</h5>
              </div>
            </div>
          )
        }}
      </Consumer>
    )


  }


}
export default SignUp;