var correctCards = 0;
var tries = 0;
$( init );

function init() 
{
    //set up the modal for instructions
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("startBtn");
    var span = document.getElementsByClassName("close")[0];
    
    btn.onclick = function()
    {
        modal.style.display = "none";
    }
    span.onclick = function() 
    {
        modal.style.display = "none";
    }
    window.onclick = function(event)
    {
        if (event.target == modal)
            {
                modal.style.display = "none";
            }
    }

    //hide elements

    $('#correctImg').hide();
    $('#correctImg').css(
        {
            left: '580px',
            top: '250px',
            width: 0,
            height: 0
        }
    )
    $('#incorrectImg').hide();
    $('#incorrectImg').css(
        {
            left: '580px',
            top: '250px',
            width: 0,
            height: 0
        }
    )

    $('#successMessage').hide();
    $('#successMessage').css( 
        {
            left: '580px',
            top: '250px',
            width: 0,
            height: 0
        } );

    $('#failMessage').hide();
    $('#failMessage').css( 
    {
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    } );    

    //reset the game
    correctCards = 0;
    tries = 5;
    $('#names').html( '' );
    $('#datadevices').html( '' );
    $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: ' + tries + '</b>');


    //json array of users -- names, data usage, device types
    var users = 
    [
        {
            "Name": "Dustin Roach",
            "Data": 226.036,
            "Device": "Smartphone"
        },
        {
            "Name": "Brandon Bright",
            "Data": 63.376,
            "Device": "Tablet"
        },
        {
            "Name": "Robert Buxton",
            "Data": 59.580,
            "Device": "Smartphone"
        },
        {
            "Name": "Tyonne Frazier",
            "Data": 54.503,
            "Device": "Tablet"
        },
        {
            "Name": "Jacob Chambers",
            "Data": 51.844,
            "Device": "Smartphone"
        },
        {
            "Name": "Hunter Clift",
            "Data": 50.521,
            "Device": "Smartphone"
        },
        {
            "Name": "Robert Williams",
            "Data": 49.047,
            "Device": "Smartphone"
        },
        {
            "Name": "Michael Londakos",
            "Data": 42.824,
            "Device": "Smartphone"
        },
        {
            "Name": "Jonatan Perdomo-Guzman",
            "Data": 40.005,
            "Device": "Smartphone"
        },
        {
            "Name": "Lance Thompson",
            "Data": 39.243,
            "Device": "Smartphone"
        },
        {
            "Name": "Mike Lopez",
            "Data": 39.201,
            "Device": "Tablet"
        },
        {
            "Name": "Ryan Parks",
            "Data": 35.677,
            "Device": "Smartphone"
        },
        {
            "Name": "Aaron Cook",
            "Data": 33.310,
            "Device": "Smartphone"
        },
        {
            "Name": "Kerry Jones",
            "Data": 29.890,
            "Device": "Tablet"
        },
        {
            "Name": "Christopher McNeill",
            "Data": 29.053,
            "Device": "Smartphone"
        },
        {
            "Name": "Dwight Allen",
            "Data": 28.423,
            "Device": "Smartphone"
        },
        {
            "Name": "Heidi Roller",
            "Data": 27.029,
            "Device": "Smartphone"
        },
        {
            "Name": "William Parker",
            "Data": 25.388,
            "Device": "Smartphone"
        },
        {
            "Name": "Brent Cooper",
            "Data": 23.501,
            "Device": "Smartphone"
        },
        {
            "Name": "Nick Stone",
            "Data": 23.480,
            "Device": "Smartphone"
        }
    ];

    users.sort((a, b) =>
    {
        return (a.Data - b.Data)*(-1); //sort the array by data usage (mult. by -1 to put in descending order)
    });

    var numbers = []; //array of numbers 1 to total used for checking matches
    for( var i = 0; i < users.length; i++)
    {
        numbers[i] = i+1; //fill in numbers
    }

     //create data usage/device type section -- make data usage 2 decimal points
     for( var i = 1; i <= users.length; i++)
     {
         //assign match number, store info to display later, add to display section, accept drops/handle matches 
         $('<div>' + users[i-1].Data.toFixed(2) + ' GB, ' + users[i-1].Device + '</div>').data( 'number', i ).data('info', users[i-1].Data.toFixed(2) + ' GB, ' + users[i-1].Device).data('name', users[i-1].Name).appendTo( '#datadevices' ).droppable(
             {
                 accept: '#names div',
                 hoverClass: 'hovered',
                 drop: handleMatch
             } );
     }

    for(var i = users.length - 1; i >= 0; i--) //randomize order of names -- traverse array in reverse and swap with random element
    {
        var j = Math.floor(Math.random() * (i+1)); //random index from 0 to i
        [users[i], users[j]] = [users[j], users[i]]; //swap elements at index i and index j

        //shuffle numbers array as well so the numbers still correspond to the correct names - because won't be able to just use index once randomized
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; 
    }
    //create names section
    for( var i = 0; i < users.length; i++)
    {
        //assign match number, add to display section, make draggable
        $('<div>' + users[i].Name + '</div>').data( 'number', numbers[i]).attr( 'id', 'card'+numbers[i] ).appendTo( '#names' ).draggable( 
            {
        
                stack: '#names div', //element currently being dragged is brought to front
                cursor: 'move', //cursor style
                revert: true //element reverts to original position when dragging stops
            } );
    }
}

//match checking when elements dropped
function handleMatch( event, ui ) 
{
    var datadeviceNum = $(this).data( 'number' ); //get numbers for match checking
    var nameNum = ui.draggable.data( 'number' );

    if ( datadeviceNum == nameNum ) //correct match
    {
        //green check animation
        $('#check').width(200);
        $('#check').height(200);
        $('#correctImg').css(
            {
                
                "position": "fixed",
                "top": "25%",
                "left": "45%",
            }
        );
        $('#correctImg').fadeTo(900, 1);
        $('#correctImg').fadeTo(900, 0);
       
        ui.draggable.addClass( 'correct' ); //change background color to green to show match
        ui.draggable.draggable( 'disable' ); //prevent name element from being dragged again
        $(this).droppable( 'disable' ); //prevent other elements from being dropped on this slot
        $(this).css({"border-style":"solid"}); //change dashed border

        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } ); //position name element directly on top of slot
        ui.draggable.draggable( 'option', 'revert', false ); //prevent element from reverting to original position after drop

        ui.draggable.html($(this).data('name') + "|" + $(this).data('info')); //update inner html to show both the matched name and data/device info

        correctCards++; //increment score
        $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: '+ tries + '</b>'); //update score display
    }
    else //incorrect match
    {
        //red x animation
        $('#x').width(200);
        $('#x').height(200);
        $('#incorrectImg').css(
            {
                "position": "fixed",
                "top": "25%",
                "left": "45%"
            }
        );
        $('#incorrectImg').fadeTo(900, 1);
        $('#incorrectImg').fadeTo(900, 0);
       
        tries--; //decrement number of tries left
        $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: '+ tries + '</b>'); //update score display
    }
    
    //If they get 3 correct answers then show success message
    if ( correctCards == 3 ) 
    {
        $('#successMessage').delay(1000).show(0);
        $('#successMessage').animate( {
            left: '23%',
            top: '50%',
            width: '400px',
            height: '130px',
            opacity: 1
        }, 800 ); //delay 800 to wait for green check animation to fade first
    }
    if( tries == 0) //they get 10 tries - game over if this reaches 0
    {
        $('#failMessage').delay(1000).show(0);
        $('#failMessage').animate( {
            left: '23%',
            top: '50%',
            width: '400px',
            height: '130px',
            opacity: 1
        }, 800 ); //delay 800 to wait for red x animation to fade first
    }
}