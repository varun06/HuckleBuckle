$(document).ready(function () {

    // Generate a random number on page load
    var answer = Math.floor(Math.random() * 100);
    console.log(answer);
    // Declare the variables here
    var t = null,
        prev_distance = null,
        tries = 1;

    // colors array holds the value for page background
    var colors = ['#4200ff', '#0648ff', '#0084ff', '#009dff', '#00b6ff',
                      '#00d6ff', '#00FF81', '#FFF254', '#FFAD00', '#FF7800',
                      '#ff6300', '#ff2d00', '#FF0300'];

    $('#user_input').focus();

    $('form').on('submit', function (e) {
        e.preventDefault();
        $('#title').fadeOut(100);

        $('form').animate({top:'20px'}, 500);

        setTimeout(function () {
            $('#result_container').fadeIn(200);
        }, 500);


        var guess = $('#user_input').val();
        validate(guess);

      function validate(guess) {
        if(guess === '') {
            $('#result').text('');
            $('#desc').text('You are not guessing');
            return;
        }
        else if (guess > 100 || guess != Math.floor(guess) || guess < 1) {
            $('#desc').text("Error: Must be between 1 and 100");
            $('body').css('background', colors[12]);
          return;
        } else {
            processGuess(guess);
        }
    }

        function processGuess(guess){
            var distance = Math.abs(guess - answer);

            if (guess === answer) {
                $('#result').text(guess);
                $('#desc').text("Correct, You are a Genius. # of Guess: " + tries);
                $('body').css('background', colors[6]);
            }
            else if (prev_distance === null) {
                firstGuess(guess, answer);
            } else {
                hotOrCold(prev_distance, distance);
            }
            prev_distance = distance;
            }


        function firstGuess(guess, answer) {
            if (guess < answer) {
                $('#result').text(guess);
                $('#desc').text("Too low");
                $('body').css('background', colors[2]);
            }
            else if (guess > answer) {
                $('#result').text(guess);
                $('#desc').text("Too High");
                $('body').css('background', colors[12]);
            }
            tries = tries + 1;
        }

        function hotOrCold(prev_distance, distance) {
            if (prev_distance > distance) {
                $('#result').text(guess);
                $('desc').text("Getting Warmer");
                $('body').css('background', colors[5]);
            }
            else if (prev_distance < distance){
                $('#result').text(guess);
                $('desc').text("You are cold, try hot Coffee");
                $('body').css('background', colors[3]);
            }
            tries = tries + 1;
        }
    });
});


    // $('#newgame').click(function(e){
    //   e.preventDefault();
    //   answer = Math.floor(Math.random()*100);
    //   console.log(answer);
    //   $('#answer_hint').html('');
    // });

    // $('#cheat').click(function(e){
    //   e.preventDefault();
    //   alert(answer);