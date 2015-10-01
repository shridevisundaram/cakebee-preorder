//For Firebase
var myFirebaseRef = new Firebase("https://blazing-fire-9669.firebaseio.com/");

$(document).ready(function() {


  	myFirebaseRef.child('launch-timeline').on('value', function(snapshot) {
	  //Update HTML span element launch-timeline
	  $('#launch-timeline').text(snapshot.val());
	});

	//Preparing array of enabled dates
	var twixRangeItr = moment.twix(new Date('2015-11-01'),new Date('2016-10-31')).iterate("days");
	var enabledDatesArray =[];
	while(twixRangeItr.hasNext()){
	    enabledDatesArray.push(twixRangeItr.next().toDate());
	}
	
	//Config for datepicker
  	$('#datetimepicker5').datetimepicker({
		format: 'DD-MM-YYYY',
        enabledDates: enabledDatesArray
    });

  	//pre-order button click logic
  	$('#preorder-button').click(function() {

  		var email = $('#email').val();
  		var city  = $('#city').val();
  		var date = $('#date').val();
  		console.log('Going to save: ' + email, city, date);

  		var preorder = {
  			email: email,
  			city: city,
  			date: date
  		};
  		console.log('Formed JSON as: ' + JSON.stringify(preorder));

  		myFirebaseRef.child('preorders').push(preorder);
    
  	});
});


