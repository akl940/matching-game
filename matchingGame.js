var correctCards = 0;
$( init );

function init() 
{
    //set up the modal for instructions
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("instructionsBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() 
    {
        modal.style.display = "block";
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

    // Hide the success message
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

    // Reset the game
    correctCards = 0;
    tries = 10;
    $('#names').html( '' );
    $('#datadevices').html( '' );
    $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: 10</b>');


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

    var numbers = []; //array of numbers 1 to total used for matching
    for( var i = 0; i < users.length; i++)
    {
        numbers[i] = i+1; //fill in numbers

        //set data usage to two decimal places
        users[i].Data.toFixed(2); //not working
    }

     //create data usage/device type section
     for( var i = 1; i <= users.length; i++)
     {
         $('<div>' + users[i-1].Data + ' GB, ' + users[i-1].Device + '</div>').data( 'number', i ).appendTo( '#datadevices' ).droppable( //assign match number, add to display section, accept drops 
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
        [numbers[i], numbers[j]] = [numbers[j], users[i]]; //shuffle numbers array as well so the numbers still correspond to the correct names
    }
    //create names section
    for( var i = 0; i < users.length; i++)
    {
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
    var datadeviceNum = $(this).data( 'number' ); 
    var nameNum = ui.draggable.data( 'number' );

    //if correct match - change background color, position directly on top of slot, prevent element from being dragged again, increment score

    //if incorrect - decrement number of tries

    if ( datadeviceNum == nameNum ) //correct match
    {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        correctCards++;
        $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: '+ tries + '</b>');
    }
    else
    {
        tries--;
        $('#score').html('<b>SCORE: ' + correctCards + '<br>TRIES LEFT: '+ tries + '</b>');
    }
    
    //If they get 5 correct answers then show success message

    if ( correctCards == 5 ) 
    {
        $('#successMessage').show();
        $('#successMessage').animate( {
            left: '25%',
            top: '50%',
            width: '400px',
            height: '100px',
            opacity: 1
        } );
    }
    if( tries == 0) //they get 10 tries - game over if this reaches 0
    {
        $('#failMessage').show();
        $('#failMessage').animate( {
            left: '25%',
            top: '50%',
            width: '400px',
            height: '100px',
            opacity: 1
        } );
    }
}