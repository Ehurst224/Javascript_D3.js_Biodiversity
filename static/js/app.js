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

  var bar = [{
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
    width: 1100,
    bargap :0.2
  };

Plotly.newPlot("bar", bar, layout);

// Create a bubble chart that displays each sample.

var bubble = {
    // Use otu_ids for the x values.
  x: otu_ids,
  // Use sample_values for the y values.
  y: sample_values,
  // Use otu_labels for the text values.
  text: otu_labels,
  mode: 'markers',
  marker: {
    // Use otu_ids for the marker colors.
    color: otu_ids,
    //Use sample_values for the marker size.
    size: sample_values,
    colorscale: "Earth"
  }
};

var bubble = [bubble];

var layout2 = {
  showlegend: false,
  height: 600,
  width: 1300,
  xaxis: {
    title: {
      text: "OTU ID"
    }
  }
};

Plotly.newPlot('bubble', bubble, layout2);
});

// Display the sample metadata, i.e., an individual's demographic information.

d3.select("#selDataset").on("change", testsubjectid);

const path = "../../samples.json";
console.log(path)
var otu_ids;
function testsubjectid() {
    var dropdownMenu = d3.select("#selDataset");
// Fetch the JSON data and console log it
    d3.json(path).then((data) =>{
    data.names.forEach(element => {
      dropdownMenu.append("option").text(element).property("value")
    });
    metadata(dropdownMenu.property("value"));
});
};

// Display each key-value pair from the metadata JSON object somewhere on the page.

testsubjectid()

function metadata(subjectid){
  d3.json(path).then((data) =>{
     meta = data.metadata
// console.log(meta)
     meta_id = meta.filter(mt=>mt.id==subjectid)
// console.log(meta_id)
  demo_id = meta_id[0]
// Clear out current contents in the panel
    d3.select("#sample-metadata").html("");
// Add new content
    var placeholder = d3.select("#sample-metadata")
    Object.entries(demo_id).forEach(([key,value])=>{
      placeholder.append("p").text(`${key}:${value}`)
    })
  })
}

initialization();
// Update all of the plots any time that a new sample is selected.
function optionChanged(subjectid) {
  console.log(subjectid);
  data2(subjectid);
  metadata(subjectid);
};