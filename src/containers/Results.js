import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { Loading, Player } from './../components';
import { battle } from './../utils/api';

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(
      this.props.location.search,
    );

    const players = await battle([playerOneName, playerTwoName]);
    if (players === null) {
      return this.setState(() => ({
        error:
          'Looks like there was an error. Check that both users exist on Github.',
        loading: false,
      }));
    }

    this.setState(() => ({
      error: null,
      winner: players[0],
      loser: players[1],
      loading: false,
    }));
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <Player
            label="Winner"
            score={winner.score}
            profile={winner.profile}
          />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
      </div>
    );
  }
}

export default Results;
