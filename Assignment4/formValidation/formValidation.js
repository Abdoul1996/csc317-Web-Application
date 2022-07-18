/*
Reg Form to toggle with showing the password
 */
function myFunction() {
    var x = document.getElementById("pwd");
    var y = document.getElementById("pwdConfirm");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password"; 
    }
    if (y.type === "password") {
        y.type = "text";
      } else {
        y.type = "password";
      }
  }

/*
Reg Form to validate the user input
*/
function myValidation() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;
    var pwdConfirm = document.getElementById("pwdConfirm").value;
    var message = document.getElementById("message");
    var alert = "";
    console.log("You clicked submit.");
  
    var pwdConfirm = false;
    var usernameCheck = false;
   
    // check username + if it begins with [a-z A-Z]
    var re_aplhanum = /^[a-zA-Z]+$/;
    if (
      ("a" > username[0] || username[0] > "z") &&
      ("A" > username[0] || username[0] > "Z")
    ) {
      alert += "Username must start with a-z or A-Z.<br>";
    }

    // check length and alphanumeric charaters of username
    else if (username.length < 3 || !re_aplhanum.test(username)) {
        alert +=
        "Username must include 3 or more alphanumeric characters.<br>";
    } else {
      usernameCheck = true;
    }
  
    //checking pwd validation, individually
    var re_num = /[0-9]/;
    var re_uppercase = /[A-Z]/;
    var re_specialchar = /[/*-+!@#$^&*]/;
    
    // checking the pwd length
    if (pwd.length < 8) {
      console.log("I'm testing the length");
      alert += "Password must be 8 or more characters.<br>";
    }

    // checking for at least one number
    else if (!re_num.test(pwd)) {
      console.log("I am in at leat one number test");
      alert += "Password must contain at least one number.<br>";
    }

    // checking the uppercase letter
    else if (!re_uppercase.test(pwd)) {
        alert += "Password must contain at least one uppercase letter.";
    }

    // checking special character
    else if (!re_specialchar.test(pwd)) {
        alert +=
        "Password must contain one special character.(/*-+!@#$^&*).<br>";
    }

    // checking if passwords match
    else if (pwd !== pwdConfirm) {
        alert += "Both passwords must match!";
    } else {
        pwdConfirm = true;
    }
  
    if (pwdConfirm && usernameCheck) {
      // success
      document.getElementById("regForm").submit();
    } else {
      //show the alerts
      message.innerHTML = alert;
      message.style.color = "red";
    }
  }
