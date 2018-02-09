import React from 'react';
import IndiviualData from '../Presentational/IndiviualData';
import BackButton from '../Presentational/BackButton';
import Navbar from '../Navbar';

class WeatherIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      status: ''
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  async handleLoad(city) {
    if (city !== '') {
      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=50a34e070dd5c09a99554b57ab7ea7e2`
      ).then(response => response.json());
      if (data.message !== 'city not found') {
        let img = data.weather[0].description;
        switch (img) {
          case 'rain':
          case 'shower rain': {
            img = 1;
            break;
          }
          case 'thunderstorm': {
            img = 2;
            break;
          }
          case 'mist':
          case 'haze':
          case 'smoke': {
            img = 3;
            break;
          }
          case 'few clouds':
          case 'broken clouds':
          case 'scattered clouds':
          case 'overcast clouds': {
            img = 4;
            break;
          }
          case 'clear sky': {
            img = 5;
            break;
          }
          case 'snow': {
            img = 6;
            break;
          }
          default: {
            img = 0;
          }
        }
        const dataCities = {
          title: data.name ? `${data.name} (${data.sys.country})` : null,
          description: data.main.temp ? `${data.main.temp} °C` : null,
          condition: data.weather[0].description
            ? data.weather[0].description
            : null,
          image: `${process.env.PUBLIC_URL}/images/weather${img}.jpg`,
          id: data.weather[0].id ? data.weather[0].id : null
        };
        this.setState({
          data: dataCities,
          status: 'loaded'
        });
      }
    }
  }
  renderButtons() {}

  componentDidMount() {
    this.handleLoad(this.props.match.params.id);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        {this.state.data ? (
          <IndiviualData
            data={this.state.data}
            imageWidth="0%"
            contentWidth="100%"
            extraRender={this.renderButtons}
            renderBack={() => (
              <BackButton url="/weather" name="back to weather" />
            )}
          />
        ) : (
          <h5>Data unavailable.</h5>
        )}
      </React.Fragment>
    );
  }
}

export default WeatherIndividual;
