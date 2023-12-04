/***** VARIABLES *****/
var form = document.getElementById("form"); // the entire form element
var closeButton = document.getElementById("closeReceiptButton"); // the button on the receipt div that closes the receipt
var receipt = document.getElementById("receipt"); // the div holding the receipt elements/body
var receiptBody = document.getElementById("receiptBody"); // the p element that is used to show the receipt

/***** EVENT LISTENER *****/
form.addEventListener("submit", showReceipt); // adding a listener to the form submit button
closeButton.addEventListener("click", function(){receipt.style.display = "none"}); // adding a listener to the close receipt button
// it calls a function expression that hides the receipt div

function showReceipt(e){ // this is the function that accepts an argument: it is passed an submit event...
    e.preventDefault();  // ...and the event is used to stop the default reload action

    /***** IF/ELSE STATEMENT *****/
    if (validateForm()){ // if true returns the inputs were valid
        var receiptText = calculateReceipt(); 
        receiptBody.innerHTML = receiptText; // updating receipt with returned body
        receipt.style.display = "block"; // receipt div is shown once it is updated
    } else {
        receipt.style.display = "none"; // if inputs were not valid but the user tried to submit a new order the receipt is hidden again
    }
}

function validateForm(){
    var fnameField = document.getElementById("fname"); // vars to hold references to different input fields
    var lnameField = document.getElementById("lname");
    var emailField = document.getElementById("email");
    var cBox1 = document.getElementById("smallShirt");
    var cBox2 = document.getElementById("mediumShirt");
    var cBox3 = document.getElementById("largeShirt");
    var cBox4 = document.getElementById("hoodie");

    if(fnameField.value === ""){ // if the first name is blank
        alert("Please enter your first name."); // alert is shown
        fnameField.focus(); // focus is shifted to the field
        return false; // and false is returned
    }
    if(lnameField.value === ""){ // same for last name
        alert("Please enter your last name.")
        lnameField.focus();
        return false;
    }
    if(emailField.value === ""){ // same for email
        alert("Please enter your email.");
        emailField.focus();
        return false;
    }
    if(!(cBox1.checked || cBox2.checked || cBox3.checked || cBox4.checked)){ // if no items were selected
        alert("It seems you're not buying anything..."); // an alert is shown
        cBox1.focus();
        return false; // and false is returned (avoids calculating prices)
    }

    /***** BOOLEAN *****/
    return true; // if the checks all pass then true is returned and calculation begins
}

function calculateReceipt(){ // this is the function that returns a value to the variable on line 17
    var receiptText; // this var holds the receipt strings that are added throughout this function.
    var total = 0; // initializing var to numeric value to avoid concatenating strings later

    var fnameField = document.getElementById("fname"); // vars to hold references to different input fields
    var lnameField = document.getElementById("lname");
    var cBox1 = document.getElementById("smallShirt");
    var cBox2 = document.getElementById("mediumShirt");
    var cBox3 = document.getElementById("largeShirt");
    var cBox4 = document.getElementById("hoodie");
    /***** ARRAY *****/
    var items = [cBox1, cBox2, cBox3, cBox4]; // adding checkboxes to an array
    var shipping = document.querySelector("input[name=shipping]:checked"); // retrieving the shipping option
    var region = document.getElementById("region"); // retrieving the value from the region select box
    /***** STRING METHOD *****/
    receiptText = "Customer: " + fnameField.value + " " + lnameField.value.substring(0,1); // concatenating the name to add to receipt
    /***** LOOP *****/
    for(var i = 0; i < items.length; i++){ // for every checkbox there is a check
        if(items[i].checked){ // if the box was checked (selected)
            /***** ARITHMETIC OPERATOR *****/
            total = total + parseFloat(items[i].value); // its value is added to the total
        }
    }
    receiptText += "<br>Merch purchased - $" + total.toFixed(2); // adding subtotal line to receipt (br tag used for line breaks instead of \n)
    receiptText += "<br>Shipping and Handling (from " + region.value + ") - $" + parseFloat(shipping.value).toFixed(2); // adding shipping charge/region
    total += + parseFloat(shipping.value).toFixed(2); 
    receiptText += "<br>Balance Due - $" + total.toFixed(2); // printing final total (all floats are formatted to 2 decimals)

    return receiptText; // returning the finished innerHTML to be added to the receipt element
}