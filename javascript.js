var config = {
    apiKey: "AIzaSyDmUOQG0sWgN57n-u26a8pJGeyT0Z3YMWc",
    authDomain: "bootcamp-demo-project.firebaseapp.com",
    databaseURL: "https://bootcamp-demo-project.firebaseio.com",
    projectId: "bootcamp-demo-project",
    storageBucket: "bootcamp-demo-project.appspot.com",
    messagingSenderId: "297576267697"
};
firebase.initializeApp(config);
$(document).ready(function () {
    var snapshotDiv = $('#snapshot');
    var dataDiv = $('#data');
    var firebaseRef = firebase.database().ref('/example-ref');
    firebaseRef.on('child_added',
        function (childRefSnapshot) {
            console.log(childRefSnapshot);
            console.log(childRefSnapshot.val());
            
            var dataObject = childRefSnapshot.val();
            
            var dataAtDataKey = dataObject.name;
            
            var stringifiedObject = JSON.stringify(dataObject, null, 4);
            snapshotDiv.html('<pre>' + stringifiedObject + '</pre>');
            // The dataKey reference came from our object definition.
            // dataDiv is defined as a variable above.
            dataDiv.text(dataAtDataKey);
        }
    );
    $('#submit').on('click', function (event) {
        var newName = $('#name').val().trim();
        firebaseRef.push({ name: newName });
    })
});