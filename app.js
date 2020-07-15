// const userSearch = d3.select("input-group");
// console.log(userSearch);
// const userSearch = dropdownMenu.property("value");

filterit('chelsea');

d3.select(".input-group").on("click", getData);


function getData() {
    var userSearch = d3.select("#input-group");
    // var userSearch = dropdownMenu.property("value");
    console.log('Running getData');
    filterit(userSearch);
}

function filterit(userSearch) {
    Plotly.d3.csv("testing_data.csv", (err, rows) => {

        var tweets = rows.filter(r => ((r.stemmed_tweet).includes(userSearch) === true));
        var dict = [];
        var obj = {};

        tweets.forEach(function(message, i, arr){

            var text = arr[i]['stemmed_tweet'] 
            text.split(" ").forEach(function(el, i, arr) {
            obj[el] = obj[el] ? ++obj[el] : 1;
        })
          })

        Object.entries(obj).forEach(function([key, value]){
        console.log(`${key} ${value}`)
        dict.push({
            x: key,
            value: value
        })
        })
        
        anychart.onDocumentReady(function() {
        // create a tag (word) cloud chart
        var chart = anychart.tagCloud(dict);
        // set a chart title
        chart.title('Most common used words')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        chart.container("cloud");
        // configure the visual settings of the chart
        chart.normal().fill("#1fadad");
        chart.hovered().fill("#93bfec");
        chart.selected().fill("#1f66ad");
        chart.normal().fontWeight(600);
        chart.draw();
        });
    })}

