import React from 'react';

import BackButton from '../Presentational/BackButton';
import Input from '../Presentational/Input';
import Navbar from '../Navbar';

class NewsByChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filter: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(text) {
    if (text !== '') {
      const filter = this.state.data.filter(data => {
        if (data.name.toUpperCase().indexOf(text.toUpperCase()) === 0) {
          return 1;
        }
        return 0;
      });
      this.setState({
        filter
      });
    } else {
      this.setState({
        filter: this.state.data
      });
    }
  }

  handleClick(text) {
    this.handleQuery(text);
  }

  async componentDidMount() {
    const sources = await fetch('https://newsapi.org/v1/sources?language=en')
      .then(r => r.json())
      .then(r => r.sources);
    this.setState({
      data: sources,
      filter: sources
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Input
          handleQuery={this.handleQuery}
          handleClick={this.handleClick}
          category="channel"
        />
        <div className="p-2 px-4 mx-4">
          <h4 className="text-uppercase text-dark font-weight-normal">
            All Channels
          </h4>
          {this.state.filter.map(data => (
            <BackButton
              url={`/news/channel/${data.id}`}
              key={data.id}
              name={data.name}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default NewsByChannel;
