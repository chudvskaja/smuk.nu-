const productsList = document.querySelector(".products-list");
const cartProductList = document.querySelector('.cart-content__list');
const cartEl = document.querySelector('.cart');
const fullPrice = document.querySelector('.fullprice');
let price = 0;

function fetchProducts() {
  fetch("../data/products.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((product) => renderProductList(product))
    .catch((error) => console.log(error));
}

fetchProducts();

const plusFullPrice = (currentPrice) => {
  return price += currentPrice;
}

const minusFullPrice = (currentPrice) => {
  return price -= currentPrice;
}

const printFullPrice = () => {
  fullPrice.textContent = `${price} kr.`
}

const printQuantity = () => {
  let length = document.querySelector(".cart-content__list").children.length;
  length > 0 ? cartEl.classList.add("active") : cartEl.classList.remove("active");
  
}





function renderProductList(product) {
    const markup = product
      .map((product) => {
        if (product.recommended === true)
        { 
        return `<li class="product-item" id="${product.id}">
        <img class="product-image" src="${product.image}">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price} kr.</p>
        ${product.discountInPercent ? `<div class="discount">Spar ${product.discountInPercent}%</div>` : ''}
        <button type="button" class="btn-product">Læg i kurv</button>
        </li>`
        }})

        .join("");
    productsList.innerHTML = markup;

    const productsBtn = document.querySelectorAll('.btn-product');
    productsBtn.forEach(el => {
    let idEl =  el.closest(".product-item").getAttribute("id");
    el.addEventListener("click",  (e) => {
    let self = e.currentTarget;
    let parent = self.closest(".product-item");
    let imgEl = parent.querySelector(".product-image").getAttribute('src');
    console.log(imgEl);
    let titleEl = parent.querySelector(".product-title").textContent;
    let priceEl = parseInt(parent.querySelector(".product-price").textContent);
   


    plusFullPrice(priceEl);
    console.log(price);
    printFullPrice();
    document.querySelector(".cart-content__list").insertAdjacentHTML("afterbegin", generateCartProduct(imgEl, titleEl, priceEl, idEl))
    printQuantity();
      })
    }) 

   
  
}

const generateCartProduct = (image, title, price, id ) => {
  return `
  <li class="cart-content__item">
  <article class="cart-content__product cart-product" data-id="${id}">
  <img class="cart-product__img" src="${image}">
  <div class="cart-product__text">
      <h3 class="cart-product__title">${title}</h3>
      <span class="cart-product__price">${price} kr.</span>
  </div>
  <button class="cart-product__delete" aria-label="delete-product">
      <i class="fa-solid fa-trash"></i>
  </button>
  </article>
</li>
  `
}


const deleteProducts = (productParent) => {
  let id =  productParent.querySelector(".cart-product").dataset.id;
  console.log(id);
}
deleteProducts();

/*  */
   
cartProductList.addEventListener("click", (e) => {
  if(e.target.classList.contains(".cart-product__delete")){
    deleteProducts(e.target.closest(".cart-content__item"));
  }
})