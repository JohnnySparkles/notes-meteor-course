import React from 'react';
import {Link} from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';


export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: "Password must be more than 8 characters long"});
    }

    this.props.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      }
      else {
        this.setState({error: ''});
      }
    });
  }

  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type={"email"} ref="email" name={"email"} placeholder={"Email"}/>
            <input type={"password"} ref="password" name={"password"} placeholder={"Password"}/>
            <button className="button">Create Account</button>
          </form>
          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default withTracker(({}) => {
  return {
    createUser: () => Accounts.createUser
  }
})(Signup);
