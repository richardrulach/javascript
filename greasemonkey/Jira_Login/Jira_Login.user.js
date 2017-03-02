// ==UserScript==
// @name        Jira Login
// @namespace   jira
// @description Logs in to jira
// @include     http://192.168.145.127:8080/secure/Dashboard.jspa
// @include     http://192.168.145.127:8080/browse/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

// allow pasting

window.onload = function(){
  
    setTimeout(function(){
        var loginButton = document.getElementById('login');
        if (loginButton != null){
            loginButton.click();
        } else {
            ///////////////////////////////////////////////////
            // THIS IS NOT THE LOGIN PAGE...
            ///////////////////////////////////////////////////

        }
    },1000);  

    $('#footer').css('display','none');
};

