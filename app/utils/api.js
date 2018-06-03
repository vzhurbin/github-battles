import axios from 'axios';

const id = "6719388fac813f4361f9";
const sec = "f967926b3fd3e5f8ea90293698f9e1fd86ab3034";
const params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = async (username) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}${params}`);

  return data;
};

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

const getUserData = async (player) => {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ])

  return {
    profile,
    score: calculateScore(profile, repos)
  }
}

const sortPlayers = (players) => (
  players.sort((a, b) => b.score - a.score)
);

export const battle = async (players) => {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError)

  return results === null
    ? results
    : sortPlayers(results);
}

export const fetchPopularRepos = async (language) => {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  const repos = await axios.get(encodedURI)
    .catch(handleError)

  return repos.data.items;
}
