import React, { Component } from "react";
import Search from "./search.component";
import GalleryService from "../services/gallery.service";

GalleryService.getAllPlants();

export default class Gallery extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: []
    }
  };

  componentDidMount() {
    GalleryService.getAllPlants()
    .then(response => {
      console.log(response.data);
      this.setState({lists: response.data})
    })
  }

  render() {
    return (
      <div className="container">
        <Search/>

        <div className="card-columns">
        <React.Fragment>
            {this.state.lists.map(({ commonName, botanicalName, imageUrl }, index) => (
              <div className="card" key={index}>
                <img className="card-img-top" src={imageUrl} alt={commonName} />
                <div className="card-body">
                  <h5 className="card-title">{commonName}</h5>
                  <p className="card-text">{botanicalName}</p>
                  <a href="#" className="btn btn-primary">See More</a>
                </div>
              </div>
            ))}
        </React.Fragment>
        </div>
      </div>

    );
  }
};
