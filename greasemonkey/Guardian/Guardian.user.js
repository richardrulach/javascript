// ==UserScript==
// @name        Print Cleaner
// @namespace   com.richardrulach
// @description cleanup guardian website
// @include     https://www.theguardian.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

function cleanUp(){
    $('.top-banner-ad-container').hide();
    $('.l-header-pre').hide();
    $('.l-header-main').hide();
    $('.ad-slot__content').hide();
    $('.ad-slot').hide();
    $('.ad-slot-container').hide();
    $('.contributions__epic').hide();
}

$(document).ready(function(){
   
  cleanUp();  
  setInterval(cleanUp,5000);
});
