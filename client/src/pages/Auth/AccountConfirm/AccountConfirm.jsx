import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "./../../../services/auth.service";

export default class AccountConfirm extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();

    this.state = {
      isActive: undefined
    };
  }

  render() {
    return (
      <section>
        {this.state.isActive === true && (
          <>
            <h3>Account activated!</h3>
            <Link to={"/login"}>Login now!</Link>
          </>
        )}
        {this.state.isActive === false && (
          <>
          <h3>The account couldn't be activated</h3>
          <p>The token to activate your account is incorrect</p>
          </>
        )}  
      </section>
    );
  }

  async updateAccountStatus() {
    try {
      const { confirmationToken } = this.props.match.params;
      await this.service.confirmAccount(confirmationToken);

      this.setState({ isActive: true });
    } catch (err) {
      const { status, data } = err.response;

      if (status === 404 && data.status === 'CONFIRMATION_USER_NOT_FOUND') {
        this.setState({ isActive: false });
      }
      
      console.error(err.message);
    }
  }

  async componentDidMount() {
    this.updateAccountStatus(this.props.match.params.confirmationToken);
  }
}
