$(document).ready(function() {
    clearFields();

   $('#submit-btn').click(function() {
        clearErrors();

        // sendEmail1();

        let name = getInput($('#name').val());
        let email = getInput($('#email').val());
        let tel = getInput($('#tel').val());
        let information = getInput($('#information').val());

        if(checkForm(email, information)) {
            console.log('Submitted!!');
            sendEmail(name, email, tel, information);
        }
   })
    
});

function sendEmail1() {
    $.ajax({

    // The URL for the request
    url: "http://www.gel.co.th/mail-scripts/phpinfo.php",

    // The data to send (will be converted to a query string)
    data: {
        id: 123
    },

    // Whether this is a POST or GET request
    type: "GET",

    // The type of data we expect back
    dataType : "json",
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
    $( "<h1>" ).text( json.title ).appendTo( "body" );
    $( "<div class=\"content\">").html( json.html ).appendTo( "body" );
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
    })
    // Code to run regardless of success or failure;
    .always(function( xhr, status ) {
    alert( "The request is complete!" );
    });
}

function sendEmail(name, email, tel, information) {
    let api = "http://www.gel.co.th/mail-scripts/index.php";
  
    let jsonData = JSON.stringify({name: name, email: email, tel: tel, information: information});
    // let jsonData = {"name":"EE","email":"ee@ee.com","tel":"ee-ee","information":"info ee"};
    console.log(jsonData);

    $.ajax({
        type: "POST",
        url: api,
        data: jsonData
        //dataType: "json"
    })
    .done(function(data) {
        console.log('Done');
        // console.log('Finish submission. Data: ' + data);

        /*
        if(data.status === false) {
            console.log('Error: ' + data.msg);
            alert('Error: ' + data.msg);
        }
        else {
            console.log('Success');
            alert('Email has been sent to our staff');
        }
        */
    })
    .fail(function(xhr, status, errorThrown) {
        console.log("Fail: " + status + ", " + errorThrown);                            
        console.log(xhr.responseText);
        console.dir(xhr);
    })
    .always(function(xhr, status) {                            
        console.log('Always: ');
    });
}

// function success(data) {
//     console.log('Send email successfully');
// }


function getInput(input) {
    return input;
}

function clearErrors() {
    $('#email-error').hide();
    $('#information-error').hide();
}

function clearFields() {
    $('#name').val("");
    $('#email').val("");
    $('#information').val("");
}

function checkForm() {
    let error = false;

    console.log($('#email').val() + ":before");
    console.log($('#information').val() + ":before");

    if( $('#email').val() == null
        || $('#email').val() == undefined
        || $('#email').val() === '') {
        error = true;
        
        $('#email-error').text('Please enter your email.');
        $('#email-error').show();
        console.log($('#email').val() + ":after");
    }
    else {
        if ( (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('#email').val())) === false ) {
            console.log('Wrong email format!');

            $('#email-error').text('Wrong email format!');
            $('#email-error').show();
            error = true;
        }
    }

    if( $('#information').val() == null
        || $('#information').val() == undefined
        || $('#information').val() === '') {
        error = true;

        $('#information-error').text('Please enter information to report.');
        $('#information-error').show();
        console.log($('#information').val() + ":after");
    }
    
    return !error;
}