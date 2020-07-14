const userSearch = d3.select("input-group");
// const userSearch = dropdownMenu.property("value");

filterit('arrest');

d3.selectAll("input-group").on("change", getData);
// d3.selectAll("#selDatasetstate").on("change", getData);

function getData() {
    var dropdownMenu = d3.select("#input-group");
    var userSearch = dropdownMenu.property("value");
    graphit(userSearch);
}

function filterit(userSearch) {
    Plotly.d3.csv("testing_data.csv", (err, rows) => {
        // var word_dict = {};
        const tweets = rows.filter(r => (str.includes(r.userSearch) === 'True'));
        console.log(tweets);

        // function count(rows.stemmed_tweet) {
            // var obj = {};
            
            // str.split(" ").forEach(function(el, i, arr) {
            //   obj[el] = obj[el] ? ++obj[el] : 1;
            // });
            
            // return obj;
          })
          
        //   console.log(count("olly olly in come free"));
    } 

anychart.onDocumentReady(function() {
    var data = [
        {"x": "Mandarin chinese", "value": 1090000000, category: "Sino-Tibetan"},
        {"x": "English", "value": 983000000, category: "Indo-European"},
        {"x": "Hindustani", "value": 544000000, category: "Indo-European"},
        {"x": "Spanish", "value": 527000000, category: "Indo-European"},
        {"x": "Arabic", "value": 422000000, category: "Afro-Asiatic"},
        {"x": "Malay", "value": 281000000, category: "Austronesian"},
        {"x": "Russian", "value": 267000000, category: "Indo-European"},
        {"x": "Bengali", "value": 261000000, category: "Indo-European"},
        {"x": "Portuguese", "value": 229000000, category: "Indo-European"},
        {"x": "French", "value": 229000000, category: "Indo-European"},
        {"x": "Hausa", "value": 150000000, category: "Afro-Asiatic"},
        {"x": "Punjabi", "value": 148000000, category: "Indo-European"},
        {"x": "Japanese", "value": 129000000, category: "Japonic"},
        {"x": "German", "value": 129000000, category: "Indo-European"},
        {"x": "Persian", "value": 121000000, category: "Indo-European"}
    ];
    // create a tag (word) cloud chart
    var chart = anychart.tagCloud(data);
    // set a chart title
    chart.title('15 most spoken languages')
    // set an array of angles at which the words will be laid out
    chart.angles([0])
    // enable a color range
    chart.colorRange(true);
    // set the color range length
    chart.colorRange().length('80%');
    // display the word cloud chart
    chart.container("container");
    chart.draw();
    });