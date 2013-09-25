'use strict';

$(document).ready(function(){

    var answer = Math.floor(Math.random()*100);
    var last_distance = null;
    var attempt = 1
    //An array to hold diferent colors
    var colors = ['#4200ff', '#0648ff', '#0084ff', '#009dff', '#00b6ff',
                      '#00d6ff', '#00FF81', '#FFF254', '#FFAD00', '#FF7800',
                      '#ff6300', '#ff2d00', '#FF0300'];


    $('form').on('submit', function (e) {

        e.preventDefault();

        $('#title').fadeOut(100);
        $('#instructions').fadeOut(100);
        $('form').animate({top:'20px'}, 500);

        setTimeout(function () {
            $('#result_container').fadeIn(200);
            $('#newGame').fadeIn(200);
        }, 500);

        var guess = $('#user_input').val();
        var distance = Math.abs(guess - answer);
        // Call validate function to validate the user guess and work on it
        validateGuess(guess);

        //This function validates the user guess and process it
        function validateGuess(guess) {
        if(guess == '') {
           $('#result').text('');
           $('#desc').text('You are not guessing');
          return;
        }else if (guess > 100 || guess != Math.floor(guess) || guess < 1) {
            $('#desc').text("Error: Must be between 1 and 100");
            $('body').css('background', colors[12]);
          return;
        }


        if (guess == answer) {
                $('#result').text(guess);
                $('#desc').text("You are Correct, # of Guess: " + attempt);
                $('body').css('background', colors[9]);
        }
        else if (last_distance == null) {
          initialGuess(guess, answer);
        } else {
          getDistance(last_distance, distance);
        }
        last_distance = distance;
    }

        // This function process the first guess from user and print the message
        function initialGuess (guess, answer){
      if (guess < answer) {
            $('#result').text(guess);
            $('#desc').text("Too low");
            $('body').css('background', colors[0]);
      }
      else if (guess > answer) {
            $('#result').text(guess);
            $('#desc').text("Too High");
            $('body').css('background', colors[10]);
      }
      attempt += 1;
    }

        // for subsequent guesses this function process them
        function getDistance (last_distance, distance){
        if (last_distance > distance){
            $('#result').text(guess);
            $('#desc').text("Getting Warmer");
            $('body').css('background', colors[7]);
        }
        else if (last_distance < distance){
            $('#result').text(guess);
            $('#desc').text("You are cold, try hot Coffee");
            $('body').css('background', colors[2]);
      }
      attempt += 1;
    }

        $('#newGame').click(function(e){
             location.reload();
        });

    });

});
