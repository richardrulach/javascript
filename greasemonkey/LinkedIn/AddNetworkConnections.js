/*

	Created:	09/07/2017
	Usage:		Go to the my network page.
				Set the number of new connects you want to make in LOAD_TOTAL
				Run the script to make the connections
*/

var LOAD_TOTAL = 290
var rrRepeater = setInterval(rrRepeater_Run,2000);

function rrRepeater_Run(){
	$('html, body').scrollTop( $(document).height() );
	console.log($('button.button-secondary-small').length);  

	// Stop condition for the interval
	if ($('button.button-secondary-small').length > LOAD_TOTAL){
		console.log('end: ' + $('button.button-secondary-small').length);
		clearInterval(rrRepeater);

		$('button.button-secondary-small').each(function(i,e){
			// Make the connection until the number of available connections have been made.
      if ($(e).find('span:first-child').text() != 'Invite'){
          console.log('Connect');
          if (i < LOAD_TOTAL) $(e).trigger('click');
      }
		});

		$('html, body').scrollTop( 0 );
	} 
}