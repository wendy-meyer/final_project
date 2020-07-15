var userSearch = d3.select("input-group");
console.log(userSearch);
// const userSearch = dropdownMenu.property("value");
var tbody = d3.select("tbody");
filterit('Chelsea');

d3.select(".input-group").on("click", getData);


function getData() {
    var userSearch = d3.select("#input-group");
    // var userSearch = dropdownMenu.property("value");
    console.log('Running getData');
    filterit(userSearch);
}

function filterit(userSearch) {
    Plotly.d3.csv("testing_data2.csv", (err, rows) => {
        console.log(userSearch);
        //Filters the tweets that contain the word the user put in the seach bar.
        var tweets = rows.filter(r => ((r.tidy_tweet).includes(userSearch) === true));
        var dict = [];
        var obj = {};
        console.log(tweets);

        //NEED Enter a 'table summary' that shows the top 5 results from the filtered tweets.
        // Complete the event handler function for the form
            function runEnter(tweets) {
                tbody.html("");
                //Show the table 
                tweets.forEach((tweet) => {
                    var row = tbody.append("tr");
                    Object.entries(tweet).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                    });
                });
            }
            runEnter(tweets);
        //NEED Enter a dictionary for counting the number of tweets for each sentiment. 

        //Walks through the filtered tweets and counts how many times each word was used across all tweets.
        tweets.forEach(function (message, i, arr) {
            var text = arr[i]['tidy_tweet']
            text.split(" ").forEach(function (el, i, arr) {
                obj[el] = obj[el] ? ++obj[el] : 1;
            })
        })
        //Puts the results into a dictionary format that anychart can read to make the word cloud
        Object.entries(obj).forEach(function ([key, value]) {
            console.log(`${key} ${value}`)
            dict.push({
                x: key,
                value: value
            })
        })
        //Makes the word cloud, NEED to add in a condition for the color based on the sentiment type (waiting on csv)
        anychart.onDocumentReady(function () {
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
    })
}

