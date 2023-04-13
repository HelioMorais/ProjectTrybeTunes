import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        <div>
          <header data-testid="header-component">
            <h1>TrybeTunes</h1>
            <nav>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pequisa
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Músicas Favoritas
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </nav>
            <span>
              Usuário:
              {' '}
              {userInfo.name}
            </span>
          </header>
        </div>
      );
    }

    if (name === false) {
      return (
        <div>
          <header>
            <h1>TrybeTunes</h1>
            <nav>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Pequisa
              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Músicas Favoritas
              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </nav>
            <Loading />
          </header>
        </div>
      );
    }
  }
}

export default Header;
