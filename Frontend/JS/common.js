if (localStorage.getItem("username") ==="undefined" || localStorage.getItem("username") ==="null" || localStorage.getItem("username") ===null) {
    document.querySelector(".lasttab").innerHTML=`<a id="toggle" href="login.html"> Login</a>`
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> login/signup</a>`
}else{
    document.querySelector(".lasttab").innerHTML=`<a id="toggle" href="#"> Logout</a>`
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> ${localStorage.getItem("username")}</a>`
    
}
function dis(){
    document.querySelector("#more").style.display="block"
};
function cart(){
    if(localStorage.getItem("username") == null || localStorage.getItem("username") == "undefined"){
        alert("Login First")
    }else{
        window.location.href="./cart.html"

    }
}
function logout(){
    localStorage.setItem("token",undefined);
    localStorage.setItem("username",undefined);
    location.reload();
}
function logoutdis(){
  document.querySelector("#navbar>#log").style.display="block"
 
}
function logoutremove(){
    document.querySelector("#navbar>#log").style.display="none"
};
function category() {
    document.querySelector("#category").style.display = "block"
}
function out() {
    document.querySelector("#category").style.display = "none"
}
let loader=document.querySelector("#loading");
function loadkar(){
    loader.style.display="none"
}
