import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    buttonEnable: true,
    username: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.enableButton(value);
  };

  enableButton = (value) => {
    const minValue = 3;
    if (value.length >= minValue) {
      this.setState({
        buttonEnable: false,
      });
    } else {
      this.setState({
        buttonEnable: true,
      });
    }
  };

  usernameInfo = () => {
    const { username } = this.state;
    this.setState({
      saveName: false,
    }, () => {
      createUser({ name: username })
        .then(() => this.setState({
          loading: true,
          saveName: true,
        }));
    });
  };

  render() {
    const {
      buttonEnable,
      loading,
      saveName,
    } = this.state;

    if (loading) {
      return <Redirect to="./search" />;
    }
    if (saveName === false) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="username">
            Login:
            <input
              data-testid="login-name-input"
              type="text"
              name="username"
              placeholder="Digite seu nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonEnable }
            onClick={ this.usernameInfo }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
