import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context';
import { v4 as uuid } from "uuid"
import "../Styles/login.css"
class Login extends Component {
  state = {
    email: "",
    password: "",
    submitMessage: "",
    submitMessageTextColor: "",
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (handler, event) => {
    event.preventDefault();

    const newLogin = {
      id: uuid(),
      email: this.state.email,
      password: this.state.password,
    };
    let isSuccessful;
    const responce = await axios.get("https://portfoliomicroservers.herokuapp.com/newuser/checkuser", newLogin)
    if (responce.data.isSuccessful)
      isSuccessful = responce.data.isSuccessful;
    else
      isSuccessful = false;

    if (isSuccessful) {
      this.setState({
        submitMessage: `Thanks alot!. Your successfully Login `,
        submitMessageTextColor: "text-info",
      });

    }
    else {
      this.setState({
        submitMessage: "Oops! somthing went wrong",
        submitMessageTextColor: "text-danger",
      });
    }

    // handler("ADD_LOGIN", newLogin);
  };

  render() {
    return (
      <Consumer>
        {
          (value) => {
            const { submitMessageTextColor, submitMessage } = this.state;
            const { handler } = value;
            return (
              <div className="container mx-auto mt-5 pt-5">
                <div className="form-signin bg-info">
                  <div className="row justify-content-center">
                    <form onSubmit={this.onSubmit.bind(this, handler)}>

                      <h1 className="font-weight-bold text-dark text-center">
                        Login
                      </h1>

                      <div className="text-light">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" placeholder="name@example.com" onChange={this.onChange} required />

                      </div>
                      <div className="form-floating text-light">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.onChange} required />

                      </div>
                      <br />

                      <button className="w-100 btn btn-lg btn-light" type="submit" onClick="Thanks alot!. Your succeswsfully Login">Sign in</button>
                      <br />
                      <div className='mx-5 px-5'>
                        [or]
                      </div>
                      <a href="" className='text-dark px-5 mx-1'>
                        forgot password
                      </a>

                    </form>
                  </div>
                </div>
                <div className="pt-5 mx-2 text-center">
                  <h5 className={submitMessageTextColor}>{submitMessage}</h5>
                </div>
              </div>
            )
          }
        }
      </Consumer>
    )


  }

}

export default Login
