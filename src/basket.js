class Basket {
  constructor() {
    // const ls = this.loadFromLocalStorage();
    // this.items = ls ? ls : [];
    this.items = this.loadFromLocalStorage() ?? [];
    // this.totalValue = 0;
  }

  clear() {
    this.items.length = 0;
    // this.items.splice(0)
    //this.items = []
    this.saveToLocalStorage();
  }

  add(item) {
    this.items.push(item);
    // this.addToTotalValue(item.price);
    this.saveToLocalStorage();
  }
  // addToTotalValue(newPrice) {
  //   this.totalValue += newPrice;
  // }

  getTotalValue() {
    return this.items.reduce((prev, product) => prev + product.price, 0);
  }
  // //   getTotalValue2() {
  //     let sum =0;
  //     for(const product of this.items)
  getBasketSummary() {
    return this.items.map((product, i) => {
      return {
        id: i + 1,
        text: `${i + 1} = ${product.name} = ${product.price.toFixed(2)} zł.`,
      };
    });
  }
  remove(no) {
    this.items.splice(no - 1, 1);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem("basket-items", JSON.stringify(this.items));
  }

  loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("basket-items"));

    // if (itemJson === null) {
    //   return [];
    // } else {
    //   return JSON.parse(itemJson);
    // }
  }
}

class Product {
  constructor(productName, productPrice) {
    this.name = productName;
    this.price = productPrice;
  }
  setNewPrice(newPrice) {
    this.price = newPrice;
  }
}
