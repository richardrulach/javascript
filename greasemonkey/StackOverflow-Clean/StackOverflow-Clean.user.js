// ==UserScript==
// @name        StackOverflow-Clean
// @namespace   com.richardrulach
// @include     http://stackoverflow.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
  
   $('#footer').hide();
   $('[id^=adzerk]').hide();
   $('[id^=clc]').hide();
   $('#hireme').hide();
  
});