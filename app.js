// var userSearch = d3.select("input-group");
// console.log(userSearch);
console.log("Hello");
var tbody = d3.select("tbody");
var cloud = d3.select("#cloud");
var filters = d3.select("#filters");

filterit('data');

// d3.event.preventDefault();


function getData() {
    // d3.event.preventDefault()
    var userSearch = d3.selectAll("#filters").node().value;
    var userSearch_lower = userSearch.toLowerCase();
    var userSearch_upper = userSearch.toUpperCase();
    var userSearch_Capital = userSearch.charAt(0).toUpperCase() + userSearch.slice(1)
    // d3.event.preventDefault();
    // d3.selectAll("#filters").html("");
    // var userSearch = dropdownMenu.property("value");
    console.log('Running getData');
    console.log(userSearch);
    filterit(userSearch, userSearch_lower, userSearch_upper, userSearch_Capital);
    
}

function filterit(userSearch, userSearch_lower, userSearch_upper, userSearch_Capital) {
    Plotly.d3.csv("testing_data2.csv", (err, rows) => {
        //Filters the tweets that contain the word the user put in the seach bar.
        var tweets = rows.filter(r => ((r.tidy_tweet).includes(userSearch) === true)||((r.tidy_tweet).includes(userSearch_upper) === true)||((r.tidy_tweet).includes(userSearch_lower) === true)||((r.tidy_tweet).includes(userSearch_Capital) === true));
        var dict = [];
        var obj = {};
        // var sentiments = []

        console.log(tweets);
        // console.log(Object.keys(tweets).length);

        // var positive_tweets = rows.filter(r => ((r.sentiment)=== 1));
        // var negative_tweets = rows.filter(r => ((r.sentiment)=== -1));
        // var neutral_tweets = rows.filter(r => ((r.sentiment)=== 0));

        // var pos_num = Object.keys(positive_tweets).length;
        // var neg_num = Object.keys(negative_tweets).length;
        // var neu_num = Object.keys(neutral_tweets).length;
        var sentiments = {"-1":0,"0":0,"1":0}
        tweets.forEach(function(object){
            sentiments[object.sentiment.toString()] += 1
        })
        console.log(sentiments);

        const trace = [{
            type: 'pie',
            values: Object.values(sentiments),
            labels: ["Neutral", "Positive", "Negative"],
            showlegend: true
        }]
        const layout1 = {
            autosize: true,
            title: "Pie Chart",
            width: 500,
            height: 500
        }
        Plotly.newPlot('pie', trace, layout1)
        

        // var sentiments 

        // tweets.forEach((tweet) => {
        //     Object.entries(tweet).forEach(([key, value]) => {
        //         // console.log(key);
        //         // console.log(value);
        //         if (value === 1){
        //             // sentiments.push({
        //             //     x: 'Positive',
        //             //     value: +1
        //             // })
        //             console.log("Positive tweet");
        //         }
        //         else if (value === -1){
        //             // sentiments.push({
        //             //     x: 'Negative',
        //             //     value: +1
        //             // })
        //         }
        //         else {
        //             sentiments.push({
        //                 x: 'Neutral',
        //                 value: +1
        //             })
        //         }
        //     })
        // })
        // console.log(sentiments);

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
            // console.log(`${key} ${value}`)
            // key= key.toLowerCase();
            // console.log(key);
            dict.push({
                x: key,
                value: value
            })
        })
        // d3.selectAll("#filters").on("change", getData);
        wordCloud(dict);
        
        
    })
}

//Makes the word cloud, NEED to add in a condition for the color based on the sentiment type (waiting on csv)
function wordCloud (dict) {
    cloud.html("");
    // console.log(dict);
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
};

d3.selectAll("#filters").on("change", getData);
// d3.selectAll("#filters").on("click", getData);

// Execute a function when the user releases a key on the keyboard

document.addEventListener('keypress', event => {
    if (event.keyCode == 13){
        console.log('enter pressed')
        getData()
    }
})


