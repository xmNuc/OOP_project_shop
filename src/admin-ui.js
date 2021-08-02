const addProductForm = document.querySelector(".form-add-product");
const nameInput = document.querySelector('[name="product-name"]');
const priceInput = document.querySelector('[name="prouct-price"]');
const productUl = document.querySelector(".products-list");

const saveProductToLocalStorage = (name, price) => {
  const productList = JSON.parse(localStorage.getItem("shop-products")) ?? [];
  productList.push({ name, price });
  localStorage.setItem("shop-products", JSON.stringify(productList));
};

const addProductToShop = (name, price) => {
  const newLi = document.createElement("li"); //tworzymy <li>

  const newStrong = document.createElement("strong"); //Tworzymy <strong>
  newStrong.innerText = name;

  const newPriceText = document.createTextNode(` - ${price.toFixed(2)}`); //Element textowy"""

  const newBtn = document.createElement("button"); //tworzymy przycusk
  newBtn.classList.add("btn-buy-product");
  newBtn.dataset.name = name;
  newBtn.dataset.price = String(price);
  newBtn.innerText = "Kup";
  newBtn.addEventListener("click", addProductToBasket);

  newLi.appendChild(newStrong); //<li><strong>...
  newLi.appendChild(newPriceText); //<li><strong>..." - "
  newLi.appendChild(newBtn); //<li><strong>..." - " <button>

  productUl.appendChild(newLi); //dodajemy do listy produktów do <ul>
};

const loadProductsFromLocalStorage = () => {
  const productList = JSON.parse(localStorage.getItem("shop-products")) ?? [];

  for (const { name, price } of productList) {
    addProductToShop(name, price);
  }
};

const handleAddProductFormSubmit = (event) => {
  event.preventDefault();
  const nameFromInput = nameInput.value;
  const priceFromInput = Number(priceInput.value);

  addProductToShop(nameFromInput, priceFromInput);
  saveProductToLocalStorage(nameFromInput, priceFromInput);
};

// const addProductToShop = (event) => {
//   event.preventDefault();

//   const name = nameInput.value;
//   const price = Number(priceInput.value);

//   const newLi = document.createElement("li"); //tworzymy <li>

//   const newStrong = document.createElement("strong"); //Tworzymy <strong>
//   newStrong.innerText = name;

//   const newPriceText = document.createTextNode(` - ${price.toFixed(2)}`); //Element textowy"""

//   const newBtn = document.createElement("button"); //tworzymy przycusk
//   newBtn.classList.add("btn-buy-product");
//   newBtn.dataset.name = name;
//   newBtn.dataset.price = String(price);
//   newBtn.innerText = "Kup";
//   newBtn.addEventListener("click", addProductToBasket);

//   newLi.appendChild(newStrong); //<li><strong>...
//   newLi.appendChild(newPriceText); //<li><strong>..." - "
//   newLi.appendChild(newBtn); //<li><strong>..." - " <button>

//   productUl.appendChild(newLi); //dodajemy do listy produktów do <ul>
// };

addProductForm.addEventListener("submit", handleAddProductFormSubmit);
loadProductsFromLocalStorage();
