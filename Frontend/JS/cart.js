render();
if (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null) {
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> ${localStorage.getItem("username")}</a>`
}
async function render() {
    await fetch("http://localhost:9168/cart").
        then((res) => {
            return res.json();
        }). then((data) => {
            // console.log(data)
            let d = data.filter((item) => {
                return item.UserID == localStorage.getItem("userid")
            })

            document.querySelector("#countin").innerHTML = data.length + 1;
            document.querySelector("#countinin").innerHTML = data.length + 1;
            renderdall(d)
        }).catch((err) => {
            console.log(err)
        })
};
let table = document.querySelector("#tab");

let arrofqty=[]
let arrofprice=[]
let total=0;
function renderdall(data) {

    let filter = data.map((item,index) => {
        arrofqty[index]=1;
        arrofprice.push(+item.Price);
        return `
    <tr style="border: 1px solid black";>
    <td style="width:400px">${item.Name} <spam id="categorytable">( ${item.Category.toLowerCase()} )</spam> </td>
    <td style="width:160px">Rs. ${item.Price} <spam id="undeline" >Mrp. ${Math.floor(1.3*Number(item.Price))}</spam></td>
    <td style="width:160px"><button id="add" _data=${index} onclick="add(event)">+</button><spam id="qty"> ${arrofqty[index]} </spam><button  onclick="minus(event)" _da=${index} id="minus">-</button> </td>
    <td style="width:160px" class="sub">${item.Price} .Rs  ✖️</td>
    <td style="width:160px" id="red">${Math.floor(1.3*Number(item.Price)-Number(item.Price))} .Rs</td>
  </tr>
`
    });
    table.innerHTML = filter.join(" ");
    for( let i=0;i<arrofprice.length;i++){
        total+=arrofprice[i];
    };
    // console.log(arrofprice,total);
    document.querySelector("#total1").innerHTML=total+ " .Rs";
    document.querySelector("#total2").innerHTML=total +" .Rs"
};

function add(event){
    let index=event.target.attributes[1].nodeValue;
    arrofqty[index]+=1
    let qty=document.querySelectorAll("#qty");
    qty[index].innerText=`  ${Number(qty[index].innerText)+1}  `;
    let qty_change=qty[index].innerText;
    let subtotal=Number(arrofprice[index]) * Number(qty_change);
    let x=document.querySelectorAll(".sub");
    x[index].innerHTML=subtotal + " .Rs"+ " ✖️";
    localStorage.setItem("prc",JSON.stringify(arrofprice));
    localStorage.setItem("qty",JSON.stringify(arrofprice))
    total=0;
    for( let i=0;i<arrofprice.length;i++){
        total+=arrofprice[i]*arrofqty[i];
        // console.log(total,arrofprice,arrofqty)
    };
    document.querySelector("#total1").innerHTML=total+ " .Rs";
    document.querySelector("#total2").innerHTML=total +" .Rs"
    
}

function minus(event){
    // console.log("event,index")
    let index=event.target.attributes[1].nodeValue;
    if(arrofqty[index]==1){
        return
    }
    arrofqty[index]+=-1
    let qty=document.querySelectorAll("#qty");
    // console.log(event,index)
    qty[index].innerText=`  ${Number(qty[index].innerText)-1}  `;
    let qty_change=qty[index].innerText;
    let subtotal=Number(arrofprice[index]) * Number(qty_change);
    let x=document.querySelectorAll(".sub");
    x[index].innerHTML=subtotal + " .Rs"+ " ✖️";
    total=0;
    for( let i=0;i<arrofprice.length;i++){
        total+=arrofprice[i]*arrofqty[i];
    };
    document.querySelector("#total1").innerHTML=total+ " .Rs";
    document.querySelector("#total2").innerHTML=total +" .Rs"
    
}

