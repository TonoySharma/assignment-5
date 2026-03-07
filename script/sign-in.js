// console.log("sign in functionality comming");

document.getElementById("sign-in-btn").addEventListener("click" , function(){
    // console.log("sign-in-btn button click");
// 1.get username input
    const inputUsername = document.getElementById("input-username");
    const userName = inputUsername .value;
    console.log(userName);
// 2.get password input
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password);
// 3.match username & pass
    if(userName=="admin" && password=="admin123"){
      // alert("Sign In Success");

     window.location.assign("/home.html");
    }else{
        alert("Sign In Failed");
        return;
    }
});