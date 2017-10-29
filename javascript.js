var config = {
    apiKey: "AIzaSyAyCExyUKAi8ZxurGIdXMOI12fekQA-2AM",
    authDomain: "musicapp-e8c67.firebaseapp.com",
    databaseURL: "https://musicapp-e8c67.firebaseio.com",
    projectId: "musicapp-e8c67",
    storageBucket: "",
    messagingSenderId: "317115906434"
};

firebase.initializeApp(config);
var database = firebase.database();
$('#add-train').on('click', () => {

    event.preventDefault();
    //Parse the input
    var name = $('#train-name-input').val().trim();
    var destination = $('#train-destination-input').val().trim();
    var time= $('#train-time-input').val().trim();
    var frequency = $('#train-frequency-input').val().trim();

    //parse moment into time
    time = moment(time, 'HH:mm').subtract(10, 'years').format('x');

    console.log(time);

    //Then you push the object into firebase

    database.ref('/train').push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    })
    $('#train-name-input').val('');
    $('#train-destination-input').val('');
    $('#train-time-input').val('');
    $('#train-frequency-input').val('');

    //put the time into moment js
});

database.ref('train').on('child_added', (snapshot) => {
    //get the data
    var train_object = snapshot.val();
    var remainder = moment().diff(moment.unix(train_object.time), 'minutes')%train_object.frequency;
    var minutes = train_object.frequency - remainder;
    console.log(minutes);
    var arrival = moment().add('minutes', 'm').format('hh:mm A');

    //add stuff to the table
    $('tbody').append('<tr><td>' + train_object.name + '</td><td>' + train_object.destination + 
        '</td><td>' + train_object.frequency + '</td><td>' + train_object.arrival + '</td><td>' +
        minutes + '</td></tr>'); 
});