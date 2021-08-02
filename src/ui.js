const buyBtns = [...document.querySelectorAll("[data-name]")];
const basketUl = document.querySelector(".basket-list");
const buyAllBtn = document.querySelector(".btn-buy-all");

const basket = new Basket();

const removeItem = (event) => {
  const id = Number(event.target.dataset.id);
  basket.remove(id);
  createBasketuUi();
};

const createBasketuUi = () => {
  basketUl.innerText = "";

  for (const { id, text } of basket.getBasketSummary()) {
    const newLi = document.createElement("li");
    newLi.innerText = text;
    newLi.addEventListener("click", removeItem);
    newLi.dataset.id = id;
    basketUl.appendChild(newLi);
  }

  const basketTotalValue = basket.getTotalValue();
  buyAllBtn.innerText = `Złóż zamówienie na kwotę ${basketTotalValue.toFixed(
    2
  )} zł.`;

  buyAllBtn.disabled = basketTotalValue === 0;
  // if (basketTotalValue > 0) {
  //   // buyAllBtn.removeAttribute("disabled");
  //   buyAllBtn.disabled = false;
  // } else {
  //   // buyAllBtn.setAttribute("disabled", "true");
  //   buyAllBtn.disabled = true;
  // }
};

const addProductToBasket = (event) => {
  const name = event.target.dataset.name;
  const price = Number(event.target.dataset.price);
  //   console.log("2 sposob", this.getAttribute("data-id"));

  const newProduct = new Product(name, price);
  basket.add(newProduct);
  createBasketuUi();
  //   console.log(basket);
};

const buyAllProducts = () => {
  const basketTotalValue = basket.getTotalValue();
  alert(`Zakupiono produkty o wartości ${basketTotalValue.toFixed(2)} zł.`);
  basket.clear();
  createBasketuUi();
};

for (const btn of buyBtns) {
  btn.addEventListener("click", addProductToBasket);
}

// buyBtns.forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     console.log("kliknięty", event.target.dataset.id);
//   });
// });

buyAllBtn.addEventListener("click", buyAllProducts);
createBasketuUi();
