import { menuArray } from "./data.js";

let order = [];

let totalPrice = 0;

const createMenuTemplate = () => {
  let menuTemplate = "";
  menuArray.map(function (item) {
    menuTemplate += ` <li class="item">
          <div class="item-details">
            <div class="item-details-container">
              <span class="item-emoji">${item.emoji}</span>
              <div class="item-details-description">
                <h3>${item.name}</h3>
                <span>${[...item.ingredients]}</span>
                <strong>$${item.price}</strong>
              </div>
            </div>
          </div>
           <button class="add-btn" data-btn="order" data-num="${item.id}"><span class="add-btn-content">+</span></button>
        </li>`;
  }).join('')
  return menuTemplate;
};

const renderMenuTemplate = () => {
  document.getElementById("items").innerHTML = createMenuTemplate();
};

const createOrderTemplate = () => {
  let orderTemplate = "";
  order.map(function (item) {
    orderTemplate += `<li class="order-item">
                <div class="order-item-details">
                  <h4 class="order-item-name">${menuArray[item].name}</h4>
                  <button class="order-remove-btn" data-remove='${menuArray[item].id}'>remove</button>
                </div>
                <h4 class="order-item-price">$${menuArray[item].price}</h4>
              </li>
              <hr />`;
  });

  return orderTemplate;
};

const renderOrderTemplate = () => {
  document.getElementById("order").innerHTML = createOrderTemplate();
};

document.addEventListener("click", function (e) {
  if (e.target.dataset.num) {
    document.getElementById("msg").classList.add("success-display");
    order.push(e.target.dataset.num);
    totalPrice += menuArray[e.target.dataset.num].price;
    document.getElementById("total-price").textContent = "$" + totalPrice;
    renderOrderTemplate();
    if (order.length > 0) {
      document
        .getElementById("order-container")
        .classList.remove("order-display");
    }
  }
  if (e.target.dataset.remove) {
    order = order.filter((item) => item !== e.target.dataset.remove);
    totalPrice = totalPrice-menuArray[e.target.dataset.remove].price;
    document.getElementById("total-price").textContent = "$" + totalPrice;
    console.log(order);
    renderOrderTemplate();
    if (order.length <= 0) {
      document.getElementById("order-container").classList.add("order-display");
    }
  }
});

document
  .getElementById("complete-order-btn")
  .addEventListener("click", function () {
    document.getElementById("form").classList.remove("form-display");
  });

document.getElementById("pay").addEventListener("click", function (e) {
  e.preventDefault();
  const fullName = document.getElementById("fullName").checkValidity();
  const card = document.getElementById("card").checkValidity();
  const cvv = document.getElementById("cvv").checkValidity();
  if (fullName && card && cvv) {
    document.getElementById("form").classList.add("form-display");
    document.getElementById("order-container").classList.add("order-display");
    document.getElementById("msg").classList.remove("success-display");

    order = [];
    totalPrice = 0;
  }
});

renderMenuTemplate();
