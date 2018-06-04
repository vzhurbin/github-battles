import React from 'react';
import PropTypes from 'prop-types';

import PlayerPreview from './PlayerPreview';

export default function Profile({ info }) {
  const {
    login,
    avatar_url,
    name,
    location,
    company,
    followers,
    following,
    public_repos,
    blog,
  } = info;
  return (
    <PlayerPreview username={login} avatar={avatar_url}>
      <ul className="space-list-items">
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && (
          <li>
            {' '}
            <a href={blog}>{blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
};
