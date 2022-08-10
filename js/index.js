"use strict";

const app = {
  measurements: [],
  filtered: [],
  selectedMeasurement: "all",
  init() {
    this.fetchData();
  },
  fetchData() {
    fetch("https://thecrew.cc/herexamen/measurements.json")
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  },

  filter() {
  },
  renderChart() { 
  },
  render() {
  }
};


app.init();