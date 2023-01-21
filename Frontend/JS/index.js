let arr = ["https://www.bigbasket.com/media/uploads/banner_images/hp_m_bcd_paneer_460px-020122.jpg", "https://www.bigbasket.com/media/uploads/banner_images/hp_m_cmc_breakfast_460px-020122.jpg", "https://www.bigbasket.com/media/uploads/banner_images/hp_wedding-brida_EP_1600x460px-020122.jpg", "https://www.bigbasket.com/media/uploads/banner_images/HP_EMF_M_WeekdayBangalore-1600x460-160123.jpeg",]
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
if (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null) {
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> ${localStorage.getItem("username")}</a>`
}
// ***********RENDERDATA*********
let temp = []
render()
async function render() {
    await fetch("http://localhost:9168/products").
        then((res) => {
            return res.json()
        }).then((data) => {
            temp = data
            alldata(data)
        });

   await fetch("http://localhost:9168/cart").
        then((res) => {
            return res.json();
        }).then((data) => {
            document.querySelector("#count").innerHTML=data.length+1
        }).catch((err)=>{
            console.log(err)
        })
};
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
        <button _data="${index}" onclick="addtocart(event)">Add <i class="fa-sharp fa-solid fa-cart-plus"></i></button></div>
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

// console.log(input.value)
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
    let index=+event.target.attributes[0].nodeValue
    // console.log(index,event)
    let Image=event.target.offsetParent.children[6].children[index].children[0].currentSrc;
    let Name=event.target.offsetParent.children[6].children[index].children[1].innerHTML;
    let Category=event.target.offsetParent.children[6].children[index].children[2].innerHTML;
    let arr=(event.target.offsetParent.children[6].children[index].children[3].children[1].innerHTML).match(/(\d+)/);
    let Price=arr[0]
   let payload={
    Name,
    Image,
    Category,
    Price

   };
//    console.log(payload)
    if (localStorage.getItem("username") == null || localStorage.getItem("username") == undefined) {
        alert("Login First Please");
        return
    };
    await fetch("http://localhost:9168/cart/addtocart", {
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
    if(localStorage.getItem("username") == null || localStorage.getItem("username") == undefined){
        alert("Login First")
    };
    window.location.href="./cart.html"
}