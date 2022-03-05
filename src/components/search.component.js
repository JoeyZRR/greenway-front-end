import React, { Component, useState } from "react";
import "../css/profile.css";
import GalleryService from "../services/gallery.service";
import { Link } from "react-router-dom";

GalleryService.getAllPlants();
export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      isActive: false,
      inputTerm: '',
      submitted: '',
      plantType:[],
      waterLevel:[],
      lightLevel:[],
      maintenance:[],
      soilType: [],
    }
  };

  componentDidMount() {
    GalleryService.getAllPlants()
    .then(response => {

      this.setState({lists: response.data})

    })
  }

  handleSeachInput = (e) =>{

    const userInput = e.target.value;
    this.setState({inputTerm: userInput});

  }

  submitInput = () => {
    if (this.state.inputTerm == ''){
      return false
    }
    else {
    var submittedInput = this.state.inputTerm;
    this.setState({submitted: submittedInput});
    }

  }

  plantTypeOnChange = (e) =>{
    if (e.target.checked){
    let filterPlantType = this.state.plantType;
    filterPlantType.push(e.target.value);
    this.setState({plantType: filterPlantType});

  }
    else {
      let filterPlantType = this.state.plantType;
      filterPlantType.splice(filterPlantType.indexOf(e.target.value),1);
      this.setState({plantType: filterPlantType});

    }
  };

  waterOnChange = (e) =>{
    if (e.target.checked){
    let filterWater = this.state.waterLevel;
    filterWater.push(e.target.value);
    this.setState({waterLevel: filterWater});

  }
    else {
      let filterWater = this.state.waterLevel;
      filterWater.splice(filterWater.indexOf(e.target.value),1);
      this.setState({waterLevel: filterWater});

    }
  }

  lightOnChange = (e) =>{
    if (e.target.checked){
    let filterLight = this.state.lightLevel;
    filterLight.push(e.target.value);
    this.setState({lightLevel: filterLight});

  }
    else {
      let filterLight = this.state.lightLevel;
      filterLight.splice(filterLight.indexOf(e.target.value),1);
      this.setState({lightLevel: filterLight});

    }
  }

  maintenanceOnChange = (e) =>{
    if (e.target.checked){
    let filterMaintenance = this.state.maintenance;
    filterMaintenance.push(e.target.value);
    this.setState({maintenance: filterMaintenance});

  }
    else {
      let filterMaintenance = this.state.maintenance;
      filterMaintenance.splice(filterMaintenance.indexOf(e.target.value),1);
      this.setState({maintenance: filterMaintenance});

    }
  }

  soilOnChange = (e) =>{
    if (e.target.checked){
    let filterSoil = this.state.soilType;
    filterSoil.push(e.target.value);
    this.setState({soilType: filterSoil});

  }
    else {
      let filterSoil = this.state.soilType;
      filterSoil.splice(filterSoil.indexOf(e.target.value),1);
      this.setState({soilType: filterSoil});

    }
  }

  clearSearch = () =>{
    this.setState({submitted: []});
    this.setState({inputTerm: ''})

  }

  render() {


    const userInput = this.state.submitted
    const plantlist = this.state.lists
    const typeList = this.state.plantType
    const waterList = this.state.waterLevel
    const lightList = this.state.lightLevel
    const maintainList = this.state.maintenance
    const soilList = this.state.soilType


    return (
      <div className="container">


        <div className="search-input">
          <input className="input-text" type="text" value={this.state.inputTerm} onChange={this.handleSeachInput}/>
          <div className="search-clear">
            <button className="btn btn-primary search" type="button" onClick={this.submitInput}>Search</button>
            <button className="btn btn-primary search" type="button" onClick={this.clearSearch}>Clear Search</button>
          </div>

        </div>
        <div className="d-grid gap-2">
            <button className="btn btn-advance filter mx-auto" type="button" onClick={ () => this.setState({isActive: !this.state.isActive})}>Advance Filters</button>
          </div>
        <div id="search" className={this.state.isActive ? "plant-filter" : "plant-filter-hide"}>
          <div className="plant-type">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-flower3" viewBox="0 0 16 16">
            <path d="M11.424 8c.437-.052.811-.136 1.04-.268a2 2 0 0 0-2-3.464c-.229.132-.489.414-.752.767C9.886 4.63 10 4.264 10 4a2 2 0 1 0-4 0c0 .264.114.63.288 1.035-.263-.353-.523-.635-.752-.767a2 2 0 0 0-2 3.464c.229.132.603.216 1.04.268-.437.052-.811.136-1.04.268a2 2 0 1 0 2 3.464c.229-.132.489-.414.752-.767C6.114 11.37 6 11.736 6 12a2 2 0 1 0 4 0c0-.264-.114-.63-.288-1.035.263.353.523.635.752.767a2 2 0 1 0 2-3.464c-.229-.132-.603-.216-1.04-.268zM9 4a1.468 1.468 0 0 1-.045.205c-.039.132-.1.295-.183.484a12.88 12.88 0 0 1-.637 1.223L8 6.142a21.73 21.73 0 0 1-.135-.23 12.88 12.88 0 0 1-.637-1.223 4.216 4.216 0 0 1-.183-.484A1.473 1.473 0 0 1 7 4a1 1 0 1 1 2 0zM3.67 5.5a1 1 0 0 1 1.366-.366 1.472 1.472 0 0 1 .156.142c.094.1.204.233.326.4.245.333.502.747.742 1.163l.13.232a21.86 21.86 0 0 1-.265.002 12.88 12.88 0 0 1-1.379-.06 4.214 4.214 0 0 1-.51-.083 1.47 1.47 0 0 1-.2-.064A1 1 0 0 1 3.67 5.5zm1.366 5.366a1 1 0 0 1-1-1.732c.001 0 .016-.008.047-.02.037-.013.087-.028.153-.044.134-.032.305-.06.51-.083a12.88 12.88 0 0 1 1.379-.06c.09 0 .178 0 .266.002a21.82 21.82 0 0 1-.131.232c-.24.416-.497.83-.742 1.163a4.1 4.1 0 0 1-.327.4 1.483 1.483 0 0 1-.155.142zM9 12a1 1 0 0 1-2 0 1.476 1.476 0 0 1 .045-.206c.039-.131.1-.294.183-.483.166-.378.396-.808.637-1.223L8 9.858l.135.23c.241.415.47.845.637 1.223.083.19.144.352.183.484A1.338 1.338 0 0 1 9 12zm3.33-6.5a1 1 0 0 1-.366 1.366 1.478 1.478 0 0 1-.2.064c-.134.032-.305.06-.51.083-.412.045-.898.061-1.379.06-.09 0-.178 0-.266-.002l.131-.232c.24-.416.497-.83.742-1.163a4.1 4.1 0 0 1 .327-.4c.046-.05.085-.086.114-.11.026-.022.04-.03.041-.032a1 1 0 0 1 1.366.366zm-1.366 5.366a1.494 1.494 0 0 1-.155-.141 4.225 4.225 0 0 1-.327-.4A12.88 12.88 0 0 1 9.74 9.16a22 22 0 0 1-.13-.232l.265-.002c.48-.001.967.015 1.379.06.205.023.376.051.51.083.066.016.116.031.153.044l.048.02a1 1 0 1 1-1 1.732zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
            <h3 className="adv_filt_title">Plant Type</h3>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Annuals" onChange={this.plantTypeOnChange}/>
              &nbsp;Annual
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Bulbs" onChange={this.plantTypeOnChange}/>
              &nbsp;Bulbs
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Cactus - Succulents" onChange={this.plantTypeOnChange}/>
              &nbsp;Cactus
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Climbers" onChange={this.plantTypeOnChange}/>
              &nbsp;Climbers
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Fruit" onChange={this.plantTypeOnChange}/>
              &nbsp;&nbsp;Fruit
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Herbs" onChange={this.plantTypeOnChange}/>
              &nbsp;Herbs
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Fern" onChange={this.plantTypeOnChange}/>
              &nbsp;Fern
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Perennials" onChange={this.plantTypeOnChange}/>
              &nbsp;Perennials
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Rose" onChange={this.plantTypeOnChange}/>
              &nbsp;&nbsp;Rose
            </label>
            <label className="plant-type-item">
              <input className="form-check-input ms-auto" type="checkbox" value="Shrubs" onChange={this.plantTypeOnChange}/>
              &nbsp;&nbsp;Shrubs
            </label>
          </div>

          <div className="col2">
          <div className="water-level">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-moisture" viewBox="0 0 16 16">
            <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
          </svg>
            <h3 className="adv_filt_title">Water Level</h3>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Low" onChange={this.waterOnChange}/>
              &nbsp;Low
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Average" onChange={this.waterOnChange}/>
              &nbsp;Average
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="High" onChange={this.waterOnChange}/>
              &nbsp;High
            </label>

          </div>

          <div className="light-level">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
            <h3 className="adv_filt_title">Light Level</h3>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Full Sun" onChange={this.lightOnChange}/>
              &nbsp;Full Sun
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Partial Sun" onChange={this.lightOnChange}/>
              &nbsp;Partial Sun
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Shade" onChange={this.lightOnChange}/>
              &nbsp;Shade
            </label>
          </div>
          </div>

          <div className="colms">
            <div className="maintenance">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            <h3 className="adv_filt_title">Maintenance</h3>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Low" onChange={this.maintenanceOnChange}/>
              &nbsp;Low
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Average" onChange={this.maintenanceOnChange}/>
              &nbsp;Average
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="High" onChange={this.maintenanceOnChange}/>
              &nbsp;High
            </label>
          </div>

            <div className="soil-type">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-tree-fill" viewBox="0 0 16 16">
              <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5z"/>
            </svg>
            <h3 className="adv_filt_title">Soil Type</h3>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Chalk"  onChange={this.soilOnChange}/>
              &nbsp;Chalk
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Clay"  onChange={this.soilOnChange}/>
              &nbsp;Clay
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Loam"  onChange={this.soilOnChange}/>
              &nbsp;Loam
            </label>
            <label className="plant-type-item">
              <input className="form-check-input me-1" type="checkbox" value="Sand"  onChange={this.soilOnChange}/>
              &nbsp;Sand
            </label>
          </div>
          </div>

        </div>
        <div className="card-columns">
        <React.Fragment>

            {plantlist.filter((search) => {
              if (userInput == '') {
                return search;
              }
              else if (search.commonName.toLowerCase().includes(userInput.toLowerCase())){
                return search
              }
              })
              .filter((type) => {
                if (typeList == '') {
                  return type;

                }
                else if (typeList.some(elem => type.plantType.includes(elem)) === true){
                  return type
                }})
                .filter((water) => {
                  if (waterList == '') {
                    return water;

                  }
                  else if (waterList.some(elem => water.waterNeeds.includes(elem)) === true){
                    return water
                  }
                  })
                  .filter((light) => {
                    if (lightList == '') {
                      return light;

                    }
                    else if (lightList.some(elem => light.lightLevel.includes(elem)) === true){
                      return light
                    }
                    })
                    .filter((mainten) => {
                      if (maintainList == '') {
                        return mainten;

                      }
                      else if (maintainList.some(elem => mainten.maintenance.includes(elem)) === true){
                        return mainten
                      }
                      })
                      .filter((soil) => {
                        if (soilList == '') {
                          return soil;

                        }
                        else if (soilList.some(elem => soil.soilType.includes(elem)) === true){
                          return soil
                        }
                        })
                .map((search, index) => {
                return (
                  <div className="card" key={index}>
                    <img className="card-img-top" src={search.imageUrl} alt={search.commonName} />
                    <div className="card-body">
                      <h5 className="card-title">{search.commonName}</h5>
                      <p className="card-text">{search.botanicalName}</p>
                      <Link to={{
                        pathname: "/plantProfile",
                        state : {
                            commonName : search.commonName,
                            botanicalName : search.botanicalName,
                            imageUrl : search.imageUrl,
                            plantType : search.plantType,
                            soilType : search.soilType,
                            lightLevel : search.lightLevel,
                            waterNeeds : search.waterNeeds,
                            maintenance : search.maintenance,
                            plantId : search.plantId

                        }
                    }}
                    className="btn btn-primary">See More</Link>
                    </div>
                  </div>
                );
              })}




        </React.Fragment>


        </div>

      </div>
    );
  }
}
