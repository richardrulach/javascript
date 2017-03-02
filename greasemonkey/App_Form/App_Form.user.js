// ==UserScript==
// @name        GI Show
// @namespace   PHL.CONFIG
// @include     http://efo.*.peppergroup.co.uk/Forms/AppForm.aspx
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant       none
// ==/UserScript==

$('#frameScrollableWorkArea div').each(function(index,elem){
       if ($(elem).attr('title') != null){
          $(elem).append('<div class="giShow">' + $(elem).attr('title') + '</div>');
       }
});
$('.giShow').css('color','darkGreen');
$('.giShow').css('font-weight','bold');
$('.giShow').hide();

$(document).on("keypress", function(e) { 
    if ( e.ctrlKey && ( e.which === 113 ) ) {
      $('.giShow').toggle();
    }
});
