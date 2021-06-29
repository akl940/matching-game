/*
Company: Wachter
JSON array of top 20 Users -- name, data usage, device type

Output data usage and device type on left side w/ row numbers
Output names on the right side in random order

use CSS
 */


window.onload = function display()
{
    var users = //array of user info - name, data usage, device type
    [ //info taken from Wachter Analysis 3.1.2021 file located in LINQ Public - Documents/Business Analysis/Prospective Accounts/Wachter
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
    
    var txt = "<ol>"; //ordered list for data usage/device type to have row numbers
    var txt2 = ""; //separate text element for names
    var nameArray = []; //new array to randomize names

    for(var i in users) //create list output for data usage and device types; add names to new array to shuffle later
    {
        txt += "<li>" + users[i].Data + " GB, " + users[i].Device + "</li>";
        nameArray.push(users[i].Name);      
    }
    txt += "</ol>";

    
    for(let i = nameArray.length - 1; i > 0; i--) //randomize order of names -- fisher-yates: traverse array in reverse and swap with random element
    {
        let j = Math.floor(Math.random() * (i+1)); //random index from 0 to i
        [nameArray[i], nameArray[j]] = [nameArray[j], nameArray[i]]; //swap elements at index i and index j
    }
    for(var i in nameArray) //create output for names
    {
        txt2 += nameArray[i] + "<br>";
    }
    document.getElementById('datadevices_list').innerHTML = txt; //update html elements
    document.getElementById('names_list').innerHTML = txt2;
}




