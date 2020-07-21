var tbody = d3.select("tbody");
var pos_cloud = d3.select("#positive_cloud");
var neg_cloud = d3.select("#negative_cloud");
var filters = d3.select("#filters");
var input = document.getElementById("filters");

filterit('data');

function getData() {
    // Prevent the page from refreshing
    // d3.event.preventDefault();

    var userSearch = d3.selectAll("#filters").node().value;

    filterit(userSearch);
    
}

function filterit(userSearch, userSearch_lower, userSearch_upper, userSearch_Capital) {
    Plotly.d3.json(`/search/${userSearch}`, (err, tweets) => {

        var positive_tweets = tweets.filter(function(tweet){
            return tweet.sentiment ==1;
        });
        var negative_tweets = tweets.filter(function(tweet){
            return tweet.sentiment ==0;
        });
        
        //Varaibles needed for wordCloud
        var pos_dict =[];
        var neg_dict =[];

        var pos_obj = {};
        var neg_obj = {};


        //Create a dictionary to count the number of sentiments for the pie chart.
        var sentiments = {"0":0,"1":0}
        tweets.forEach(function(object){
            sentiments[object.sentiment.toString()] += 1
        })

        //Create the pie chart
        const trace = [{
            type: 'pie',
            values: Object.values(sentiments),
            labels: ["Negative", "Positive"],
            showlegend: true,
            marker:{
                colors:['lightcoral', 'palegreen' ]
            }
        }]
        const layout1 = {
            autosize: true,
            title: "Sentiment Distribution",
            width: 1200,
            height: 500
        }
        Plotly.newPlot('pie', trace, layout1)


        // TABLE Complete the event handler function for the form
            function runEnter(tweets) {
                tbody.html("");
                //Show the table 
                tweets.forEach((tweet) => {
                    var row = tbody.append("tr");
                    Object.entries(tweet).forEach(([key, value]) => {
                        if ((key === 'user')||(key === ('tweet'))||(key === 'sentiment')){
                            var cell = row.append("td");
                            cell.text(value);
                        }
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
        wordCloud(pos_dict, "positive_cloud", "Most common words within Positive Tweets","#C5F2C8","67EE70" , pos_cloud);
        wordCloud(neg_dict, "negative_cloud", "Most common words within Negative Tweets", "EB9F9F", "E56363", neg_cloud);
    })
}

//Makes the word cloud, NEED to add in a condition for the color based on the sentiment type (waiting on csv)
function wordCloud (dict, cloudtype, title, color1, color2, id) {
    id.html("");
    // create a tag (word) cloud chart
    var chart = anychart.tagCloud(dict);
    // set a chart title
    chart.title(title)
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    // set text spacing
    chart.textSpacing(3);  
    chart.container(cloudtype);
    // configure the visual settings of the chart
    // create and configure a color scale.
    var customColorScale = anychart.scales.linearColor();
    customColorScale.colors([color1, color2]);

    // set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);
    chart.hovered().fill("#93bfec");
    chart.selected().fill("#1f66ad");
    chart.normal().fontWeight(600);
    chart.draw();
};

d3.selectAll("#filters").on("change", getData);

document.addEventListener('keypress', event => {
    if (event.keyCode == 13){
        console.log('enter pressed')
        getData()
    }
})


