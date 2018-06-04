import React from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    label: 'Username',
  };

  state = {
    username: '',
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState(() => ({ username: value }));
  };

  handleSubmit = event => {
    const { onSubmit, id } = this.props;
    const { username } = this.state;
    event.preventDefault();
    onSubmit(id, username);
  };

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
        <button className="button" type="submit" disabled={!username}>
          Submit
        </button>
      </form>
    );
  }
}

export default PlayerInput;
