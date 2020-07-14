// const userSearch = d3.select("input-group");
// console.log(userSearch);
// const userSearch = dropdownMenu.property("value");

filterit('chelsea');

d3.select(".input-group").on("click", getData);
// d3.selectAll("#selDatasetstate").on("change", getData);

function getData() {
    var userSearch = d3.select("#input-group");
    // var userSearch = dropdownMenu.property("value");
    console.log('Running getData');
    filterit(userSearch);
}

function filterit(userSearch) {
    Plotly.d3.csv("testing_data.csv", (err, rows) => {

        var tweets = rows.filter(r => ((r.stemmed_tweet).includes(userSearch) === true));


        var dict = []
        console.log(dict);


        var obj = {};
        tweets.forEach(function(message, i, arr){

            var text = arr[i]['stemmed_tweet']
            
            text.split(" ").forEach(function(el, i, arr) {

            obj[el] = obj[el] ? ++obj[el] : 1;
            // console.log(obj[el]);
            // console.log("El:");
            // console.log(el);
        })
            
            // console.log(dict);
          })
        Object.entries(obj).forEach(function([key, value]){
        console.log(`${key} ${value}`)
        dict.push({
            x: key,
            value: value
        })
        // console.log(dict);
        })

        
        anychart.onDocumentReady(function() {
        // create a tag (word) cloud chart
        var chart = anychart.tagCloud(dict);
        // set a chart title
        chart.title('Most common used words')
        // set an array of angles at which the words will be laid out
        chart.angles([0])
        chart.container("container");
        chart.draw();
        });

        // console.log(obj);

    })}

// function wordCloud(obj) {
//     console.log(obj['chelsea']);
//     // create a tag (word) cloud chart
//     var chart = tagCloud(obj);
//     // set a chart title
//     chart.title('15 most spoken languages')
//     // set an array of angles at which the words will be laid out
//     chart.angles([0])
//     // enable a color range
//     chart.colorRange(true);
//     // set the color range length
//     chart.colorRange().length('80%');
//     // display the word cloud chart
//     chart.container("container");
//     chart.draw();
//   }