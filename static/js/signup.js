$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#firstname-input");
  const lastNameInput = $("input#lastname-input");
  const userNameInput = $("input#username-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    console.log("Create Button Clicked");
    const userData = {
      FirstName: firstNameInput.val().trim(),
      LastName: lastNameInput.val().trim(),
      Email: emailInput.val().trim(),
      Password: passwordInput.val().trim(),
      UserName: userNameInput.val().trim()
    };

    if (!userData.Email || !userData.Password) {
      console.log("Email and/or Password was blank, try again.");
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.userName, userData.Email, userData.Password);
    firstNameInput.val("");
    lastNameInput.val("");
    userNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the profile page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, username, email, password) {
    $.post("/api/signup", {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      Email: email,
      Password: password
    })
      .then(() => {
        window.location.replace("/profile");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
