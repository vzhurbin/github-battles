import React from 'react';

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
    };
  }

  updateLanguage = lang => {
    this.setState({ selectedLanguage: lang });
  };

  render() {
    const { selectedLanguage } = this.state;
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className="languages">
        {languages.map(lang => (
          <li
            style={lang === selectedLanguage ? { color: '#d0021b' } : null}
            onClick={this.updateLanguage}
            key={lang}
          >
            {lang}
          </li>
        ))}
      </ul>
    );
  }
}

export default Popular;
