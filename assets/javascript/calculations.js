// Firebase API
var config = {
    apiKey: "AIzaSyDpVtHbMSEYyq8qzZBXHbSTMsJWpZ1wavM",
    authDomain: "il-train-activity.firebaseapp.com",
    databaseURL: "https://il-train-activity.firebaseio.com",
    projectId: "il-train-activity",
    storageBucket: "",
    messagingSenderId: "627947285562"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#button").on("click", function (event) {
    event.preventDefault();

    var train = $("#trainInput").val().trim();
    var dest = $("#destinationInput").val().trim();
    var time = $("#timeInput").val().trim();
    var freq = $("#frequencyInput").val().trim();

    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    console.log(train, dest, time, freq);

    database.ref().push({
        TrainName: train,
        Destination: dest,
        FirstTrainTime: time,
        Frequency: freq,

    });

})

// Reference database and pull existing entries
// or add new entries from the database
database.ref().on("child_added", function (childSnapshot) {

    // Store the properties and values in variables
    var tName = childSnapshot.val().TrainName;
    var tDestination = childSnapshot.val().Destination;
    var tFrequency = childSnapshot.val().Frequency;
    var tFirstTrain = childSnapshot.val().FirstTrainTime;

    // Prep first train time and creat blank variables
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var tMinutes;
    var tArrival;
  
    // Calculate next arrival
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % tFrequency;
    tMinutes = tFrequency - tRemainder;
    
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);

    // Add each train's data into the table
    $("#tableInput").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
        tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

