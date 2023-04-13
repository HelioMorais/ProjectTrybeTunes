import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    userInfo: [],
    name: false,
  };

  componentDidMount() {
    getUser().then((element) => (this.setState({
      name: true,
      userInfo: element,
    })));
  }

  render() {
    const {
      name,
      userInfo,
    } = this.state;
    if (name) {
      return (
        <header data-testid="header-component">
          <h1>TrybeTunes</h1>
          <span data-testid="header-user-name">
            Usuário:
            {' '}
            {userInfo.name}
          </span>
        </header>
      );
    }

    if (name === false) {
      return (
        <header data-testid="header-component">
          <h1>TrybeTunes</h1>
          <Loading />
        </header>
      );
    }
  }
}

export default Header;
