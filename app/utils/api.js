import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = (username) => (
  axios.get(`https://api.github.com/users/${username}${params}`)
    .then(({ data }) => data)
);

const getRepos = (username) => (
  axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
);

const getStarCount = (repos) => (
  repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
);

const calculateScore = ({ followers }, repos) => (
  (followers * 3) + getStarCount(repos)
);

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos)
  }))
}

const sortPlayers = (players) => (
  players.sort((a, b) => b.score - a.score)
);

module.exports = {
  battle (players) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI).then(({data}) => data.items);
  }
};
