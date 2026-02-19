import { menuArray } from "./data.js";

let order = [];


const createMenuTemplate = () => {
  let menuTemplate = "";
  menuArray.map(function (item) {
    menuTemplate += ` <li class="item">
          <div class="item-details">
            <div class="item-details-container">
              <span>${item.emoji}</span>
              <div class="item-details-description">
                <h3>${item.name}</h3>
                <span>${[...item.ingredients]}</span>
                <strong>$${item.price}</strong>
              </div>
            </div>
          </div>
           <button class="add-btn" data-btn="order" data-num="${item.id}"><span class="add-btn-content">+</span></button>
        </li>`;
  });
  return menuTemplate;
}

const renderMenuTemplate = () => {
  document.getElementById("items").innerHTML = createMenuTemplate();
}


const createOrderTemplate = () => {
    let orderTemplate = '';
    order.map(function(item){
orderTemplate += `<li class="order-item">
                <div class="order-item-details">
                  <h4 class="order-item-name">${menuArray[item].name}</h4>
                  <button class="order-remove-btn" data-remove='${menuArray[item].id}'>remove</button>
                </div>
                <h4 class="order-item-price">$${menuArray[item].price}</h4>
              </li>
              <hr />`
    })
    
              return orderTemplate;
}

const renderOrderTemplate = () => {
document.getElementById("order").innerHTML = createOrderTemplate()
}

document.addEventListener('click',function(e){
    if(e.target.dataset.num){
        order.push(e.target.dataset.num);
    renderOrderTemplate()
    if(order.length > 0){
        document.getElementById("order-container").classList.remove("order-display")
    }
    }
    if(e.target.dataset.remove){
        order = order.filter(item => item !== e.target.dataset.remove)
        console.log(order);
        renderOrderTemplate()
         if(order.length <= 0){
        document.getElementById("order-container").classList.add("order-display")
    }
    }
 
}) 

document.getElementById('complete-order-btn').addEventListener('click',function(){
    document.getElementById('form').classList.remove('form-display');
})

document.getElementById('pay').addEventListener('click',function(){
    document.getElementById('form').classList.add('form-display');
    document.getElementById("order-container").classList.add("order-display")
    const successMessage = document.createElement("<p>")
    successMessage.textContent = "'Thanks, James! Your order is on its way!'";
     document.getElementById('main').innerHTML += successMessage;
})

renderMenuTemplate();