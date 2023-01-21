render();
if (localStorage.getItem("username") !== undefined && localStorage.getItem("username") !== null) {
    document.querySelector("#username").innerHTML = `<a href="login.html"><ion-icon name="person-outline"></ion-icon> ${localStorage.getItem("username")}</a>`
}
async function render() {
    await fetch("http://localhost:9168/cart").
        then((res) => {
            return res.json();
        }).then((data) => {
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
function renderdall(data) {
    console.log(data)
    let filter = data.map((item) => {
        return `
    <tr style="border: 1px solid black";>
    <td style="width:400px">${item.Name} <spam id="categorytable">( ${item.Category.toLowerCase()} )</spam> </td>
    <td style="width:160px">Rs. ${item.Price} <spam id="undeline" >Mrp. ${Math.floor(1.3*Number(item.Price))}</spam></td>
    <td style="width:160px"><button id="add" onclick="add()">+</button><spam id="qty"> 1 </spam><button onclick="minus()" id="minus">-</button> </td>
    <td style="width:160px">${item.Price} .Rs</td>
    <td style="width:160px" id="red">${Math.floor(1.3*Number(item.Price)-Number(item.Price))} .Rs</td>
  </tr>
`
    });
    table.innerHTML = filter.join(" ")
}