/*

	Created:	09/07/2017
	Usage:		Run using scipt console for your browser (e.g. firebug within firefox)
				Adds connections for the current page and moves to the next.

*/


// GO TO THE BOTTOM OF THE DOCUMENT TO GET ALL THE PROFILES TO LOAD
$('html, body').scrollTop( $(document).height() );

// PAUSE FOR TWO SECONDS TO GET THE RESULTS
setTimeout(rr_processing,2000);


function rr_processing(){
	$('button').each(function (index, element){

		// EXIT FUNCTION IF CONDITIONS NOT MET
		if ($(this).attr('aria-label') == null) return;
		if ( $(this).attr('aria-label').match('^Connect with') ) return;
		if ( $(this).attr('aria-label').match('{:name}$') ) return;

		// DONT CONNECT IF AN EMAIL IS REQUIRED
		if ( $('h2').text().match('email is required to connect') ){
			$('button.send-invite__cancel-btn').trigger('click');
		} else {
			console.log('send:' + $(this).attr('aria-label') );
			$(this).trigger('click');
			$('div.send-invite__actions > button:last-child').trigger('click');
		}
	});
	
	// GO TO THE NEXT PAGE OF ELEMENTS
	$('button.next').trigger('click');
}
