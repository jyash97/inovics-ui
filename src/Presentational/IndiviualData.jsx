import React from 'react';

import './styles/styleIndiviual.css';

const IndiviualData = props => (
  <div
    className="fluid-container  indiviual-container my-0"
    style={{
      backgroundImage: `linear-gradient(to right,rgba(168,218,220,0.25), rgba(238,249,237,.2)),url(${
        props.data.image
      })`
    }}
  >
    <div className="content m-0">
      <div
        className="float-left indiviual-image"
        style={{ width: props.imageWidth }}
      >
        <img
          className="align-middle border-primary"
          src={props.data.poster}
          alt=""
        />
      </div>
      <div
        className="float-right border-primary indiviual-content"
        style={{ width: props.contentWidth }}
      >
        <h1 className="font-weight-light text-primary">{props.data.title}</h1>
        <h5 className="font-weight-normal text-muted text-capitalize">
          {props.data.author ? `By ${props.data.author}` : null}
          {props.data.condition ? `${props.data.condition}` : null}
        </h5>
        <h5 className="font-weight-light text-muted">{props.data.date}</h5>
        <p>{props.data.description}</p>
        {props.extraRender()}
        <div className="my-2">{props.renderBack()}</div>
      </div>
    </div>
  </div>
);

export default IndiviualData;
