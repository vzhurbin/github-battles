const React = require('react');
const PropTypes = require('prop-types');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
    state = {
      username: '',
    };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState(() => ({ username: value }));
  }

  handleSubmit = (event) => {
    const { onSubmit, id } = this.props;
    const { username } = this.state;
    event.preventDefault();
    onSubmit(id, username);
  }

  render() {
    const { label } = this.props;
    const { username } = this.state;
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

class Battle extends React.Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  };

  handleSubmit = (id, username) => {
    this.setState(() => ({
      [id + "Name"]: username,
      [id + "Image"]: `https://github.com/${username}.png?size=200`,
    }))
  };

  handleReset = (id) => {
    this.setState(() => ({
      [id + 'Name']: '',
      [id + 'Image']: null,
    }))
  };

  render() {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage !== null && (
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button
                className="reset"
                onClick={() => this.handleReset('playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage !== null && (
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button
                className="reset"
                onClick={() => this.handleReset('playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>

        {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button"
              to={{
                pathname: `${match.url}/results`,
                search:
                  `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

module.exports = Battle;
