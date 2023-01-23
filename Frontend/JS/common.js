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