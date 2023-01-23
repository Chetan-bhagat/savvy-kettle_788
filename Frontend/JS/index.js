let arr = ["./Images/slidepanner.webp", "./Images/slidebreakfast.webp", "./Images/slidebride.webp", "./Images/slidemeat.webp",]
let slide = document.querySelector("#slidshow");
let sliddetails1 = document.querySelector("#sliddetails1");
let sliddetails2 = document.querySelector("#sliddetails2");
let sliddetails3 = document.querySelector("#sliddetails3");
let sliddetails4 = document.querySelector("#sliddetails4");
let arrdeatils = [sliddetails1, sliddetails2, sliddetails3, sliddetails4];

let i = 0;
let timer = setInterval(() => {
    // console.log(i,arr.length)
    slide.setAttribute("src", arr[i++]);
    if (i == arr.length) {
        i = 0;
    };
    sliddetails1.style.opacity = "0.5";
    sliddetails2.style.opacity = "0.5";
    sliddetails3.style.opacity = "0.5";
    sliddetails4.style.opacity = "0.5";
    arrdeatils[i].style.opacity = "1";


}, 2000);
if (localStorage.getItem("username") ==="undefined") {
    console.log("intari",localStorage.getItem("username"))
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> login/signup</a>`
}else{
    console.log("in",localStorage.getItem("username"))
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> ${localStorage.getItem("username")}</a>`
    
}
// ***********RENDERDATA*********
let temp = [];
render()
async function render() {
    await fetch("https://drab-ruby-gecko-suit.cyclic.app/products").
        then((res) => {
            return res.json()
        }).then((data) => {
            temp = data;
            let limit=data.filter((item,index)=>{
                return index<5
            });
            let remain=data.filter((item,index)=>{
                return index>5 && index<21
            });
            allremaindata(remain)
            alldata(limit)
        });

   await fetch("https://drab-ruby-gecko-suit.cyclic.app/cart").
        then((res) => {
            return res.json();
        }).then((data) => {
            let count=data.filter((item)=>{
                return item.UserID==localStorage.getItem("userid")
            });
            // console.log(count)
           if(localStorage.getItem("username")=="undefined" || localStorage.getItem("username")==null){
            document.querySelector("#count").innerHTML=0
           }else{
            document.querySelector("#count").innerHTML=count.length
           }
        }).catch((err)=>{
            console.log(err)
        })
};
function allremaindata(data) {
    // console.log(data)
    let D = data.map((item,index) => {
        return `<div id="item"><img src="${item.Image}">
        <h4>${item.Name}</h4>
        <p class="category">${item.Category}</p>
        <div class="render1"> <p id="markprice">MRP <spam class="mrp" >Rs. ${String(Math.floor(Number(item.Price) * 1.3))}</spam></p>
        <p class="price">Rs. ${item.Price}</p>
        </div>
        <div class="render2"> <i class="fa-solid fa-truck"><spam id="delivery">Standard Delivery in 48 hrs</spam></i> 
        <button _data1="${item.Name}" _data2="${item.Category}" _data3="${item.Price}" _data4="${item.Image}" onclick="addtocart(event)">Add <i class="fa-sharp fa-solid fa-cart-plus"></i></button></div>
        </div>
       `
    });
    document.querySelector("#renderdata2").innerHTML = D.join(" ");
}
function alldata(data) {
    // console.log(data)
    let D = data.map((item,index) => {
        return `<div id="item"><img src="${item.Image}">
        <h4>${item.Name}</h4>
        <p class="category">${item.Category}</p>
        <div class="render1"> <p id="markprice">MRP <spam class="mrp" >Rs. ${String(Math.floor(Number(item.Price) * 1.3))}</spam></p>
        <p class="price">Rs. ${item.Price}</p>
        </div>
        <div class="render2"> <i class="fa-solid fa-truck"><spam id="delivery">Standard Delivery in 48 hrs</spam></i> 
        <button _data1="${item.Name}" _data2="${item.Category}" _data3="${item.Price}" _data4="${item.Image}" onclick="addtocart(event)">Add <i class="fa-sharp fa-solid fa-cart-plus"></i></button></div>
        </div>
       `
    });
    document.querySelector("#renderdata").innerHTML = D.join(" ");
}

function dis() {
    document.querySelector("#more").style.display = "block"
}
function category() {
    document.querySelector("#category").style.display = "block"
}
function out() {
    document.querySelector("#category").style.display = "none"
}

let input = document.querySelector("#nav2>div>input");
let obtract = document.querySelector("#slidshow");
let obstract2 = document.querySelector("#sliddetails");
let obstract3 = document.querySelector("#middivs");
let input2 = document.querySelector("#mediaqueryfortab>div>input");

input2.addEventListener("input", () => {
    
    let pass = temp.filter((item) => {
        return item.Name.toLowerCase().includes(input2.value.toLowerCase())
    });

    console.log(input2.value);
    if (pass.length == 0) {
        document.querySelector("#renderdata").innerHTML = "Nothing Found"


    } else if (input.value == "") {
        obtract.style.display = "block"
        obstract2.style.display = ""
        obstract3.style.display = ""
        alldata(pass)
    } else {
        alldata(pass)
    }
});
input.addEventListener("input", () => {
    obtract.style.display = "none"
    obstract2.style.display = "none"
    obstract3.style.display = "none"
    let pass = temp.filter((item) => {
        return item.Name.toLowerCase().includes(input.value.toLowerCase())
    });

    // console.log(input.value)
    if (pass.length == 0) {
        alldata(pass)
        document.querySelector("#renderdata").innerHTML = "Nothing Found"


    } else if (input.value == "") {
        obtract.style.display = "block"
        obstract2.style.display = ""
        obstract3.style.display = ""
        alldata(pass)
    } else {
        alldata(pass)
    }
});

async function addtocart(event) {
    console.log(event)
    let Image=event.target.attributes[3].nodeValue;
    let Name=event.target.attributes[0].nodeValue;
    let Category=event.target.attributes[1].nodeValue;
    let Price=event.target.attributes[2].nodeValue;

   let payload={
    Name,
    Image,
    Category,
    Price

   };
//    console.log(payload,event)
//    console.log(payload)
    if (localStorage.getItem("username") == null || localStorage.getItem("username") == undefined) {
        alert("Login First Please");
        return
    };
    await fetch("https://drab-ruby-gecko-suit.cyclic.app/cart/addtocart", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token":localStorage.getItem("token")

        },
        body: JSON.stringify(payload)
    }).
        then((res) => {
            return res.json();
        }).then((data) => {
            if(data.msg=="Added to cart"){
                swal(
                    "Added to cart",
                    "successfully",
                    "success"
                  )
                 setTimeout(()=>{
                    location.reload()
                 },2000)
            }else{
              alert("Login First")
            }
        });

    // ***********get************
    
};


function cart(){
    if(localStorage.getItem("username") == null || localStorage.getItem("username") == "undefined"){
        alert("Login First")
    }else{
        window.location.href="./cart.html"

    }
};

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
}