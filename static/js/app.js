//Define Url
const url = "../../samples.json"

var sample_values;
var otu_ids;
var otu_labels;

//Use the D3 library to read in samples.json
//Create a horizontal bar chart with a dropdown menu to 
//display the top 10 OTUs found in that individual.
d3.json(url).then(function(data) {
    console.log(data);
    sample_values =  data.samples[0].sample_values.slice(0,10).reverse();
    console.log(sample_values);
    otu_ids =  data.samples[0].otu_ids.slice(0,10).reverse();
    console.log (otu_ids) ;
    otu_labels = data.samples[0].otu_labels.slice(0,10);
    console.log(otu_labels);
    yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();


//Create a horizontal bar chart with a dropdown menu to 
//display the top 10 OTUs found in that individual.
// get only top 10 otu ids 

  var data2 = [{
    // Use sample_values as the values for the bar chart
    x: sample_values,
  // Use otu_ids as the labels for the bar chart  
    y: yticks,
  // Use otu_labels as the hovertext for the chartconst url = "../../samples.json"
    text: otu_labels,
    type: "bar",
    orientation: "h"
  }];

  var layout = {
    height: 600,
    width: 800,
    bargap :0.2
  };

Plotly.newPlot("bar", data2, layout);



var bubble = {
    // Use sample_values as the values for the bar chart
  x: otu_ids,
  // Use otu_ids as the labels for the bar chart  
  y: sample_values,
  // Use otu_labels as the hovertext for the chartconst url = "../../samples.json"
  text: otu_labels,
  mode: 'markers',
  marker: {
    color: otu_ids,
    size: sample_values
  }
};

var bubble = [bubble];

var layout2 = {
  showlegend: false,
  height: 600,
  width: 1200
};

Plotly.newPlot('bubble', bubble, layout2);
});