import React from 'react';

import { fetchPopularRepos } from '../utils/api';
import { Loading, SelectLanguage, RepoGrid } from './../components';

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async lang => {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null,
    }));

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }));
  };

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? <Loading /> : <RepoGrid repos={repos} />}
      </div>
    );
  }
}

export default Popular;
