var login_btn = document.getElementById("login_link");
var signup_btn = document.getElementById("signup_link");
var login_page = document.getElementById("login");
var signup_page = document.getElementById("signup");

login_btn.onclick = function()
{
    login_page.style.display ="block";
    signup_page.style.display="none";
}

signup_btn.onclick = function()
{ 
    signup_page.style.display="block";
    login_page.style.display ="none";
}
