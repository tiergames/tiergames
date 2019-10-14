import React, { Component } from "react";
import { Redirect } from 'react-router';
import AuthService from "./../../../services/auth.service";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.service = new AuthService();

    this.state = {
      isMatch: undefined,
      password: "",
      updated: false,
      redirect: false
    };
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.updatePassword();
  }

  render() {
    return (
      <section>
        <h2>Reset password</h2>

        {this.state.isMatch === true && !this.state.updated && <h3>Token match!</h3>}

        {!this.state.updated && (
          <>
            <h4>Generate a new password</h4>

            <form onSubmit={e => this.handleFormSubmit(e)}>
              <div className="field">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                  className="input"
                />
              </div>

              <div className="form-actions">
                <input type="submit" value="Confirm" />
              </div>
            </form>

            <h4>{this.state.message}</h4>
            <h4>{this.state.error ? "Error" : ""}</h4>
          </>
        )}

        {this.state.isMatch === false && (
            <h3>The token to reset your password is incorrect or has expired</h3>
        )}

        {this.state.updated === true && (
          <>
            <h3>Password successfully updated</h3>
            <span>Please wait...</span>
          </>
        )}

        {this.state.redirect && <Redirect to="/login" />}
      </section>
    );
  }

  async checkPasswordToken() {
    try {
      const { resetPasswordToken } = this.props.match.params;
      const checkToken = await this.service.resetPassword(resetPasswordToken);

      this.setState({ isMatch: true, error: false });

    } catch (err) {
      const { status, data } = err.response;

      if (status === 404 && data.status === "RESET-PASSWORD_TOKEN_NOT_FOUND_OR_EXPIRED") {
        this.setState({ isMatch: false, error: true });
      }

      console.error(err.message);
    }
  }

  async updatePassword() {
    const { resetPasswordToken } = this.props.match.params;
    const { password } = this.state;

    try {
      const response = await this.service.updatePassword(
        password,
        resetPasswordToken
      );

      this.setState({
        password: "",
        updated: true,
        error: false
      });

      setTimeout(() => {
        this.setState({
          redirect: true
        });
      }, 2500);

    } catch (err) {
      const { status, data } = err.response;
        
        if (status === 500 && data.status === 'UPDATE-PASSWORD_FAILED') {
          this.setState({ password: "", error: true, updated: false });
        }
        
        console.error(err.message);
    }
  }

  async componentDidMount() {
    this.checkPasswordToken(this.props.match.params.resetPasswordToken);
  }
}
