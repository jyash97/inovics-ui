import React from 'react';
import Input from '../../Presentational/Input';
import ImageCard from '../../Presentational/ImageCard';
import BackButton from '../../Presentational/BackButton';

class Dictionary extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
  }

  async handleQuery(value) {
    const data = await fetch(
      `http://api.wordnik.com/v4/word.json/${value}/definitions?limit=100000&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`
    ).then(response => response.json());
    let dataWord = [];
    data.map(data =>
      dataWord.push({
        title: data.word,
        time: Date(),
        description: data.text,
        partOfSpeech: data.partOfSpeech,
        id: data.sequence
      })
    );
    this.setState({
      data: dataWord
    });
    //te.data.partOfSpeech)
  }

  handleClick(text) {
    this.handleQuery(text);
  }

  extraLinks() {}

  extraData(data) {
    return (
      <div className="my-2">
        <p
          key={data}
          className="border rounded border-primary text-primary text-center d-inline-block px-2 m-1 text-capitalize"
        >
          {this.state.data.partOfSpeech}
        </p>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Input
          category="Word"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <ImageCard
          number={4}
          heading={this.props.match.params.id}
          data={this.state.data}
          extraData={this.extraData}
          extraLinks={this.extraLinks}
        />
        <div className="mx-5">
          <BackButton
            url="/"
            classes="btn-outline-notfound"
            name="Back to home"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Dictionary;
