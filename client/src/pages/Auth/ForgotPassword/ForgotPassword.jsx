import React, { Component } from "react";
import AuthService from "./../../../services/auth.service";
import { ReactComponent as DirectionRight } from "./../../../assets/icons/direction-right.svg";

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.service = new AuthService();

    this.state = {
      email: "",
      submitted: false
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

    const { email } = this.state;
    this.service
      .forgotPassword(email)
      .then(() => {
        this.setState({
          email: "",
          submitted: true
        });
      })
      .catch(err => {
        const { status, data } = err.response;

        if (
          status === 404 &&
          data.status === "FORGOT-PASSWORD_USER_NOT_FOUND"
        ) {
          this.setState({ email: "", submitted: true });
        }

        console.error(err.message);
      });
  }

  render() {
    return (
      <section className="forgot-password">
        <h2 className="section-title">Forgot your password?</h2>

        {!this.state.submitted && (
          <>
            <div className="account-question">
              <p>
                E-mail address you registered with
                Tier
              </p>
            </div>

            <form
              className="home-form"
              onSubmit={e => this.handleFormSubmit(e)}
            >
              <div className="field">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                  className="input"
                />
              </div>

              {/* <div className="form-actions">
                <input type="submit" value="Confirm" />
              </div> */}

              <div className="form-actions">
                <button type="submit">
                  <DirectionRight />
                  Confirm
                </button>
              </div>
            </form>
          </>
        )}
        {this.state.submitted && (
          <>
            <h4>
              If a user with that email exist, a password reset will be e-mailed
              to you
            </h4>
            <small>
              (Don't forget to check your spam folder or resend the email)
            </small>
          </>
        )}
      </section>
    );
  }
}
