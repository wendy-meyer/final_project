var tbody = d3.select("tbody");
var pos_cloud = d3.select("#positive_cloud");
var neg_cloud = d3.select("#negative_cloud");
var filters = d3.select("#filters");

filterit('data');


function getData() {
    var userSearch = d3.selectAll("#filters").node().value;
    var userSearch_lower = userSearch.toLowerCase();
    var userSearch_upper = userSearch.toUpperCase();
    var userSearch_Capital = userSearch.charAt(0).toUpperCase() + userSearch.slice(1)

    console.log('Running getData');
    console.log(userSearch);
    filterit(userSearch, userSearch_lower, userSearch_upper, userSearch_Capital);
    
}

function filterit(userSearch, userSearch_lower, userSearch_upper, userSearch_Capital) {
    Plotly.d3.csv("testing_data2.csv", (err, rows) => {
        //Filters the tweets that contain the word the user put in the seach bar.
        var tweets = rows.filter(r => ((r.tidy_tweet).includes(userSearch) === true)||((r.tidy_tweet).includes(userSearch_upper) === true)||((r.tidy_tweet).includes(userSearch_lower) === true)||((r.tidy_tweet).includes(userSearch_Capital) === true));
        var positive_tweets = tweets.filter(function(tweet){
            return tweet.sentiment ==1;
        });
        var negative_tweets = tweets.filter(function(tweet){
            return tweet.sentiment ==-1;
        });
        
        //Varaibles needed for wordCloud
        var pos_dict =[];
        var neg_dict =[];

        var pos_obj = {};
        var neg_obj = {};

        console.log(tweets);

        //Create a dictionary to count the number of sentiments for the pie chart.
        var sentiments = {"-1":0,"0":0,"1":0}
        tweets.forEach(function(object){
            sentiments[object.sentiment.toString()] += 1
        })
        console.log(sentiments);

        //Create the pie chart
        const trace = [{
            type: 'pie',
            values: Object.values(sentiments),
            labels: ["Neutral", "Positive", "Negative"],
            showlegend: true,
            marker:{
                colors:['lightgray', 'palegreen', 'lightcoral']
            }
        }]
        const layout1 = {
            autosize: true,
            title: "Pie Chart",
            width: 500,
            height: 500
        }
        Plotly.newPlot('pie', trace, layout1)

        // //Create the bar chart
        // const trace2 = [{
        //     type: 'bar',
        //     x: tweets.map(d => d.user),
        //     y: tweets.map(d => d.tidy_tweets),
        //     orientation: 'h'
        // }]
        // const layout2 = {
        //     autosize: true,
        //     title: "Tweets by User",
        //     width: 1000,
        //     height: 600,
        //     yaxis: {
        //         automargin: true
        //       }
        // }
        // Plotly.newPlot('bar', trace2, layout2)

        // TABLE Complete the event handler function for the form
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

        //Walks through the filtered tweets and counts how many times each word was used across all tweets.
        
        positive_tweets.forEach(function (message, i, arr) {
            var text = arr[i]['tidy_tweet']
            text.split(" ").forEach(function (el, i, arr) {
                pos_obj[el] = pos_obj[el] ? ++pos_obj[el] : 1;
            })
        })
        negative_tweets.forEach(function (message, i, arr) {
            var text = arr[i]['tidy_tweet']
            text.split(" ").forEach(function (el, i, arr) {
                neg_obj[el] = neg_obj[el] ? ++neg_obj[el] : 1;
            })
        })
        //Puts the results into a dictionary format that anychart can read to make the word cloud

        ////Version with all the sentiments in one.
        // Object.entries(obj).forEach(function ([key, value]) {
        //     dict.push({
        //         x: key,
        //         value: value
        //     })
        // })

        //positive version
        Object.entries(pos_obj).forEach(function ([key, value]) {
            pos_dict.push({
                x: key,
                value: value
            })
        })
        //negative version
        Object.entries(neg_obj).forEach(function ([key, value]) {
            neg_dict.push({
                x: key,
                value: value
            })
        })
        wordCloud(pos_dict, "positive_cloud", "Most common works within Positive Tweets","green", pos_cloud);
        wordCloud(neg_dict, "negative_cloud", "Most common works within Negative Tweets", "red", neg_cloud);
    })
}

//Makes the word cloud, NEED to add in a condition for the color based on the sentiment type (waiting on csv)
function wordCloud (dict, cloudtype, title, color, id) {
    id.html("");
    // create a tag (word) cloud chart
    var chart = anychart.tagCloud(dict);
    // set a chart title
    chart.title(title)
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    chart.container(cloudtype);
    // configure the visual settings of the chart
    chart.normal().fill(color);
    chart.hovered().fill("#93bfec");
    chart.selected().fill("#1f66ad");
    chart.normal().fontWeight(600);
    chart.draw();
};

d3.selectAll("#filters").on("change", getData);
// d3.selectAll("#filters").on("click", getData);

// Execute a function when the user releases a key on the keyboard
// document.addEventListener('keyup', fucntion(event){
//     if (event.keyCode === 13){
//         event.preventDefault();
//         document.getElementById("srchbtn");
//         console.log('enter pressed');
//         getData()
//     }
// });
document.addEventListener('keypress', event => {
    if (event.keyCode == 13){
        console.log('enter pressed')
        getData()
    }
})


