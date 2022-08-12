"use strict";

import { Klasse } from "./klasse.js";
let list = document.getElementById("measurements");

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init() {
    this.fetchData();
    this.filter();
    
  },
  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then(res => res.json())
      .then(data => {
        this.measurements = data.measurements;
      });
  },

  filter() {
    
    //if the measurment type corresponds to the selected measurement type, add it to the filtered array
    this.filtered = this.measurements;
    if(this.selectedMeasurement !== "all") {
     this.filtered = this.measurements.filter(measure => measure.type === this.selectedMeasurement);
    }
    this.selectedMeasurement = document.getElementById("typeFilter").value;

    this.render();
  },

  renderChart() { 
  },

  render() {
    list.innerHTML = "";
    for(let measure of this.filtered) {
      let klasse = new Klasse(measure.value, measure.type, measure.timestamp);
      
      list.innerHTML += klasse.htmlString;
    }

    //when you change the measurement type the list will be filtered
    document.getElementById("typeFilter").addEventListener("change", () => {
      this.filter();
    });
  } 
};


app.init();