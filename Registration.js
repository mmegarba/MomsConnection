

//Registration method
function fnRegisterMom(){

    var config = {
    apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
    authDomain: "momsconnection-63998.firebaseapp.com",
    databaseURL: "https://momsconnection-63998.firebaseio.com",
    projectId: "momsconnection-63998",
    storageBucket: "momsconnection-63998.appspot.com",
    messagingSenderId: "102438011730"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();
    // Capture Button Click
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var address1 = $("#address1-input").val().trim();
    var address2 = $("#address2-input").val().trim();
    var city = $("#city-input").val().trim();
    var state = $("#state-input").val().trim();
    var zipcode = $("#zipcode-input").val().trim();
    var email = $("#email-input").val().trim();
    var userId = email.substring(0, email.indexOf("@"));
    var phone = $("#phone-input").val().trim();
    var password = $("#password-input").val().trim();
    var regdate = new Date();
    var childage = $("#childage-input").val().trim();
    var boygirl = "Not Specified";
    boygirl = $('input[name=optradio]:checked').val();

    if($("#chkRemember").is(":checked")){
        var remUser = "yes";
    }
    else{
        var remUser = "no";
    }
    console.log(remUser);
      database.ref('moms/' + userId).set({
        name: name,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode,
        email: email,
        phone: phone,
        password: password,
        regdate: regdate,
        childage: childage,
        boygirl: boygirl,
        rememberUser: remUser
      });

}

//Pull Registration data
function fnFetchMembers(){

    var config = {
    apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
    authDomain: "momsconnection-63998.firebaseapp.com",
    databaseURL: "https://momsconnection-63998.firebaseio.com",
    projectId: "momsconnection-63998",
    storageBucket: "momsconnection-63998.appspot.com",
    messagingSenderId: "102438011730"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //var userId = firebase.auth().currentUser.uid;
    var momsRef = database.ref('moms');
        momsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var moreContact = childSnapshot.val().email + '<br><br>' + childSnapshot.val().phone
        console.log(childData); //will log out each mom record
        console.log(childSnapshot.val().name);
        //load each result into the table on the members.html form
      $("#member-table > tbody").append("<tr><td><button type='button' class='btn btn-default btn-sm' id='openmodal' data-toggle='modal' data-target='#myModal' data-value='" + moreContact + "'><span class='glyphicon glyphicon-pencil'></span></button></td><td>" + childSnapshot.val().name + 
        "</td><td>" + childSnapshot.val().address1 + " " + childSnapshot.val().address2 +
        " " + childSnapshot.val().city + ", " + childSnapshot.val().state + " " + childSnapshot.val().zipcode + "</td><td>" +
        " </span><span id='childinfo'> " + childSnapshot.val().boygirl + " age: " + childSnapshot.val().childage + " </span>" + "</td><td 'align=right'>" +
        "<button type='button' class='btn btn-default btn-sm' id='openmodal' data-toggle='modal' data-target='#myModal' data-value='" + moreContact + "'><span class='glyphicon glyphicon-user'></span> Contact Details</button>" + "</td><tr>");

        });

       // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



};


var userArray = [];
var attemptedLogin = false;
var RememberUser;

function checkSignIn(){
	event.preventDefault();
	var email = $("#usrname").val();
	var password = $("#psw").val();
	var user = "";
if(attemptedLogin === false)

{

	var config = {
	apiKey: "AIzaSyDrLO-RSZ-B6BD4gxJXqCOnMLA19DFHcsI",
	authDomain: "momsconnection-63998.firebaseapp.com",
	databaseURL: "https://momsconnection-63998.firebaseio.com",
	projectId: "momsconnection-63998",
	storageBucket: "momsconnection-63998.appspot.com",
	messagingSenderId: "102438011730"
	};

	firebase.initializeApp(config);
	var database = firebase.database();

    var query = firebase.database().ref("moms/").orderByKey();
    query.once("value")
     .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
	  // console.log(key);
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
		userArray.push(childData);
		// console.log(childData);
	});

    checkUser(email,password,user);
    attemptedLogin = true;

    	});
    }
	else {
			checkUser(email,password,user);
	}

// end of function
};


function SignedIn(user){

$("#SignInLi").empty();


var newSignIn = $("<li>");
var newLogOut = $("<li>");

newSignIn.attr("id","SignInGlyph")
newSignIn.html("<span  class='glyphicon glyphicon-user'></span>" + " " + user )


newLogOut.attr("id","LogOutBtn");
newLogOut.html("<button type='button' id = 'LogOutBtn' onclick='LogOut()' class='btn btn-default btn-sm'> <span class='glyphicon glyphicon-log-out'></span> Log out </button>")
$("#SignInUl").append(newSignIn);
$("#SignInUl").append(newLogOut);


};



function LogOut(){
  var user=getCookie("username");
  if (user != "") {
  deleteCookie("username",user,0);

}

clearToolTip();

	$("#SignInUl").empty();

var newLogin = $("<li>");
newLogin.attr("id","SignInLi")
newLogin.html("<a data-toggle='modal' data-target='#modalSignIn'><span class='glyphicon glyphicon-log-in'></span> Login</a>")
$("#SignInUl").append(newLogin);
};



var foundUser = false;

function checkUser(email,password,user){

		for (var i = 0; i < userArray.length; i++) {


			console.log(userArray[i]);
			if(i === userArray.length-1 &&  userArray[i].email != email && foundUser === false)

			{
				console.log("user not found");
        $("#usrname").tooltip('show');
			}
			if(userArray[i].email === email)
			{

				console.log("user Exist")
				foundUser = true;

				 if(userArray[i].password === password)
				{
					console.log("pass confirmed")

					$("#modalSignIn").modal("hide");
					user = userArray[i].name;
					SignedIn(user);


        // store da cookie
          if (user != "" && user != null) {
              setCookie("username", user, 30);
          }

				}


				if(userArray[i].password != password) {
				console.log("incorrect pass")
        $("#psw").tooltip('show');

				}



		};

};

};



// setting cookies below

function deleteCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}




function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
$("#WelcomeBackUser").html(user)
$("#WelcomeBackModal").modal("show");

        SignedIn(user);
    } else {

      console.log(user)
      // $("#usrname").tooltip("hide")
      // $("#psw").tooltip("hide")

      $("#modalSignIn").modal("show");

    }
}

function clearToolTip(){
console.log("here");


$("#username").val("");
$("#psw").val("");



  $("#username").tooltip('hide');
  $("#psw").tooltip('hide');

}
