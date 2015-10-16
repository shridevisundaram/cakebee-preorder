//For error reporting
// Pure JavaScript errors handler
window.addEventListener('error', function (err) {
    var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
    ga(
        'send',
        'event',
        'JavaScript Error',
        err.message,
        err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent,
        0,
        true
    );
});

//For Firebase
var myFirebaseRef = new Firebase("https://blazing-fire-9669.firebaseio.com/");

$(document).ready(function() {

  	//Initially hide add another section
  	$('#add-another-section').hide();

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
  	$('#datetimepicker').datetimepicker({
		format: 'DD-MM-YYYY',
        enabledDates: enabledDatesArray
    });
    //To prevent typing
    $('#date').bind("keydown keypress", function(e){
        event.preventDefault();
    });

  	//Pre-order button click logic
  	//1.Prevent default action for form submit
  	$("#preorder-form").submit(function(e){
  	    return false;
  	});
	  //2. Add submitted data to Firebase, clear and hide the section.
  	$('#preorder-button').click(function() {
  		var email = $('#email').val();
  		var mobilenumber= $('#mobilenumber').val();
  		var city  = $('#city').val();
  		var date = $('#date').val();
      var occassion = $('#occassion').val();
  		var preorder = {
  			email: email,
  			mobilenumber: mobilenumber,
  			city: city,
  			date: date,
        occassion: occassion
  		};
  		console.log('Formed JSON as: ' + JSON.stringify(preorder));
  		myFirebaseRef.child('preorders').push(preorder);
  		console.log('Saved.');
  		$("#preorder-form").trigger('reset');
  		//hide pre-order form
  		$( "#preorder-section" ).hide();
  		//show add-another section
  		$( "#add-another-section" ).show();

      //For google analytics
      ga('send', {
        hitType: 'event',
        eventCategory: 'preorder',
        eventAction: 'submit',
      });
  	});
  	
  	//Show preorder section
  	$('#add-another-btn').click(function() {
  		$( "#add-another-section" ).hide();
  		$( "#preorder-section" ).show();

      //For google analytics 
      ga('send', {
        hitType: 'event',
        eventCategory: 'preorder',
        eventAction: 'add-another',
      });
  	});


    //Click event for website
    $('.website-link').click(function() {
      console.log('Website link clicked');
      //For google analytics 
      ga('send', {
        hitType: 'event',
        eventCategory: 'traffic',
        eventAction: 'website-link-click',
      });
    });
    
});
    
  	



