
var config = 
{
    apiKey: "AIzaSyCRxwMjm-evRHWYGup7ouNkZaCujuhCAuU",
    authDomain: "trainschedulerapp-63414.firebaseapp.com",
    databaseURL: "https://trainschedulerapp-63414.firebaseio.com",
    projectId: "trainschedulerapp-63414",
    storageBucket: "trainschedulerapp-63414.appspot.com",
    messagingSenderId: "1090117086081"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#submit").on("click", function() 
{
    event.preventDefault();

    var trainName = $("#inputTrainName").val().trim();
    var destination = $("#inputDestination").val().trim();
    var trainStart = moment($("#inputFirstTrainTime").val().trim(), "hh:mm").format();
    var frequency = $("#inputFrequency").val().trim();

    console.log(frequency);
    console.log(trainStart);
    
    var firstTrain = moment(trainStart, "hh:mm").subtract(1, "years");

    console.log(firstTrain);
    
    var currentTime = moment();
    
    var timeDiff = currentTime.diff(moment(firstTrain), "minutes");

    console.log(timeDiff);
    
    var remainder = timeDiff % frequency;

    console.log(remainder);
    
    var timeTillNext = frequency - remainder;

    console.log(timeTillNext);
    
    var nextTrain = moment().add(timeTillNext, "minutes").format("hh:mm a");

    console.log(nextTrain);

    var train = 
    {
        name: trainName,
        destination: destination,
        trainStart: trainStart,
        frequency: frequency,
        min: timeTillNext,
        next: nextTrain
    }

    database.ref().push(train);

    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputFirstTrainTime").val("");
    $("#inputFrequency").val("");

});

database.ref().on("child_added", function(childSnap, snapshot) 
{

    var name = childSnap.val().name;
    var destination = childSnap.val().destination;
    var trainStart = childSnap.val().trainStart;
    var frequency = childSnap.val().frequency;
    var min = childSnap.val().min;
    var next = childSnap.val().next;

    $("#train-info > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");
});

