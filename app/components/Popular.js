import React from 'react';

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
  };

  updateLanguage = lang => {
    this.setState({ selectedLanguage: lang });
  };

  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    const { selectedLanguage } = this.state;

    return (
      <div>
        <ul className="languages">
          {languages.map(lang => {
            return (
              <li
                style={lang === selectedLanguage ? { color: '#d0021b' } : null}
                onClick={() => this.updateLanguage(lang)}
                key={lang}
              >
                {lang}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Popular;
