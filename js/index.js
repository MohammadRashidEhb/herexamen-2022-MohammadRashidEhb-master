"use strict";

import { Klasse } from "./klasse.js";
let myChart;
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

    //thanks to https://stackoverflow.com/questions/40056555/destroy-chart-js-bar-graph-to-redraw-other-graph-in-same-canvas 
    //for the chartjs solution

    //thanks to https://www.chartjs.org/docs/latest/getting-started/ for the chartjs documentation

    if(myChart) {
      myChart.destroy();
    }

    //make a doughnut chart with the data from the filtered array
    let ctx = document.getElementById("chart").getContext('2d');
     myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.filtered.map(measure => measure.timestamp.toLocaleString("nl-BE")),
        datasets: [{
          label: '# of Votes',
          data: this.filtered.map(measure => measure.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  },

  render() {
    list.innerHTML = "";
    for(let measure of this.filtered) {
      let klasse = new Klasse(measure.value, measure.type, measure.timestamp);
      
      list.innerHTML += klasse.htmlString;
    }

    this.renderChart();

    //when you change the measurement type the list will be filtered
    document.getElementById("typeFilter").addEventListener("change", () => {
      this.filter();
    });
  } 
};


app.init();