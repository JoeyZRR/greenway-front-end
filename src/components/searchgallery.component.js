import React, { Component } from "react";
import Search from "./search.component";

export default class SearchGallery extends Component {
  constructor() {
    super();
    this.state = {
      filterList: [
        {
          id: 11,
          name: "Low",
          value: "Low"
        },
        {
          id: 12,
          name: "Average",
          value: "Average"
        },
        {
          id: 13,
          name: "High",
          value: "High"
        }
      ],
      searchLists: [
        {
          "plantId":1,
          "botanicalName":"Actinidia deliciosa",
          "commonName":"Kiwifruit",
          "plantType":"Climbers, Fruit",
          "lightLevel":"Full Sun",
          "waterNeeds":"Average",
          "maintenance":"Average",
          "soilType":"Loam, Sand",
          "imageUrl":"https://greenwayplants.s3.amazonaws.com/Kiwifruit.jpg"
        },
        {
          "plantId":2,"botanicalName":"Adiantum capillus-veneris",
          "commonName":"Southern Maidenhair Fern",
          "plantType":"Fern",
          "lightLevel":"Partial Sun, Shade",
          "waterNeeds":"Average",
          "maintenance":"Low",
          "soilType":"Chalk, Clay, Loam, Sand",
          "imageUrl":"https://greenwayplants.s3.amazonaws.com/SouthernMaidenhairFern.jpeg"
        },
        {
          "plantId":3,"botanicalName":"Aeonium",
          "commonName":"Sunburst",
          "plantType":"Cactus - Succulents",
          "lightLevel":"Full Sun, Partial Sun",
          "waterNeeds":"Low, Average",
          "maintenance":"Low",
          "soilType":"Loam, Sand",
          "imageUrl":"https://greenwayplants.s3.amazonaws.com/Sunburst.jpeg"
        },
        {
          "plantId":4,"botanicalName":"Agave victoriae-reginae",
          "commonName":"Queen Victoria Century Plant",
          "plantType":"Cactus - Succulents",
          "lightLevel":"Full Sun",
          "waterNeeds":"Low",
          "maintenance":"Low",
          "soilType":"Loam, Sand",
          "imageUrl":"https://greenwayplants.s3.amazonaws.com/QueenVictoriaCenturyPlant.jpeg"
        },
        {
          "plantId":5,"botanicalName":"Alcea rosea",
          "commonName":"Hollyhock",
          "plantType":"Annuals",
          "lightLevel":"Full Sun",
          "waterNeeds":"Average",
          "maintenance":"High",
          "soilType":"Chalk, Clay, Loam, Sand",
          "imageUrl":"https://greenwayplants.s3.amazonaws.com/Hollyhock.jpeg"
        }
      ],
      activeFilter: []
    };
  }

  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({ activeFilter: filterList.map(filter => filter.value) });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
  }

  render() {
    const { filterList, activeFilter } = this.state;
    let filteredList;
    if (
      activeFilter.length === 0 ||
      activeFilter.length === filterList.length
    ) {
      filteredList = this.state.searchLists;
    } else {
      filteredList = this.state.searchLists.filter(item =>
        this.state.activeFilter.includes(item.maintenance)
      );
    }

    return (
      <div className="searchContainer">

        <Search/>

        <form>
          <h1>Maintenance</h1>
          <label htmlFor="myInput">All</label>
          <input
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            checked={activeFilter.length === filterList.length}
          />
          {this.state.filterList.map(filter => (
            <React.Fragment>
              <label htmlFor={filter.id}>{filter.name}</label>
              <input
                id={filter.id}
                type="checkbox"
                checked={activeFilter.includes(filter.value)}
                onClick={() => this.onFilterChange(filter.value)}
              />
            </React.Fragment>
          ))}
        </form>

        <div className="card-columns">
        <React.Fragment>
          {filteredList.map(item => (
            <div className="card" key={item.plantId}>
              <img className="card-img-top" src={item.imageUrl} alt={item.commonName} />
              <div className="card-body">
                <h5 className="card-title">{item.commonName}</h5>
                <p className="card-text">{item.botanicalName}</p>
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
