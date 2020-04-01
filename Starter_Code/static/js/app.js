// pull in data from json file
d3.json("samples.json").then(function(data) {
    // console.log(data.samples);

    //pull IDs 
    data.names.forEach(function(data) {
        // console.log(data);

    //append ids in drop down menu
      var dropdownmenu = d3.select("#selDataset");
      dropdownmenu.append("option").text(data).property("value", data);

      });
  //filter for id selection in dropdown
  var filteredsamples = data.samples.filter(optionChanged);

  //return IDs equal to dropdown seletion

  const firstSample = data.names[0];
    charts(firstSample);
    builddata(firstSample);

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  charts(newSample);
  builddata(newSample);
}
  });

//
function builddata(sample) {
  d3.json("samples.json").then(function(data){
    console.log(data);

  var PANEL = d3.select("#sample-metadata");

  PANEL.html("");

  Object.entries(data).forEach(([key, value]) => {
    PANEL.append('h5').text(`${key}, ${value}`);
  })

  })
};

function charts(data) {
  d3.json("samples.json").then(function (data) {
    console.log(data);

    var otu_ids = data.otu_ids;
    var otu_lables = data.otu_labels;
    var sample_values = data.sample_values;

    var bubbledata = [{
      x: otu_ids,
      y: sample_values,
      text: otu_lables,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];

    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: {title: 'OTU ID'},
    };

    Plotly.plot('bubble', bubbledata, bubbleLayout);

  });

}



// function optionChanged(ID) {
//   console.log(ID);

// };




