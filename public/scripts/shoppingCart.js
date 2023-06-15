const cart_container = document.getElementById('cart-container');
const cart_template = document.getElementById("cart-template");
const cart_template_error = document.getElementById("error-template");
async function getShoppingCart(){
  return await fetch(`/api/shopping-cart`, {
    method: 'GET'
  });
}

async function addProductToShoppingCart(productId){
  let response = await fetch(`/api/shopping-cart/products/${productId}`, {
    method: 'POST'
  })
  return response.status;
}

async function deleteProductFromShoppingCart(productId){
  await fetch(`/api/shopping-cart/products/${productId}`, {
    method: 'DELETE'
  })
}

async function displayShoppingCart() {
  try {
    let cartRequest = await getShoppingCart();
    if (cartRequest.status === 401)
      throw new Error("Авторизируйтесь, чтобы добавлять товары в корзину")
    if (cartRequest.status === 404)
      throw new Error("В корзине пока нет товаров")
    let cart = await cartRequest.json()

    for (const item of cart.specialProduct) {
      const product = cart_template.content.cloneNode(true);
      let picture = product.getElementById('cart-pic')
      picture.src = item.special.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      let favouritesRequest = await getFavourites();
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        if (favourites.catalogProduct.some(x => x.id === item.special.id)){
          wishlist.src = "images/wishlist-red.png";
        }
      }
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.special.name;
      let span = product.querySelectorAll("span");
      span[1].textContent = "";
      span[2].textContent = item.special.prevPrice;
      span[3].textContent = item.special.newPrice;
      span[5].textContent = item.amount;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showSpecialInfo(\"${item.special.id}\")`
      let buttons = product.querySelectorAll("button");
      cart_container.appendChild(product);
      wishlist.addEventListener("click", async function() {
        if (wishlist.getAttribute("src") === "images/wishlist.png") {
          await addProductToFavourites(item.special.productId);
          wishlist.src = "images/wishlist-red.png"
        } else {
          await deleteProductFromFavourites(item.special.productId)
          wishlist.src = "images/wishlist.png"
        }
      });
      buttons[0].addEventListener("click", async function(){
        await deleteProductFromShoppingCart(item.special.productId);
        window.location.reload();
      });
      buttons[1].addEventListener("click", async function(){
        await addProductToShoppingCart(item.product.productId);
        window.location.reload();
      });
    }

    for (const item of cart.catalogProduct) {
      const product = cart_template.content.cloneNode(true);
      let picture = product.getElementById('cart-pic')
      picture.src = item.product.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      let favouritesRequest = await getFavourites();
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        if (favourites.catalogProduct.some(x => x.id === item.product.id)){
          wishlist.src = "images/wishlist-red.png";
        }
      }
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.product.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.product.price;
      span[4].textContent = "";
      span[5].textContent = item.amount;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showProductInfo(\"${item.product.id}\")`
      let buttons = product.querySelectorAll("button");
      cart_container.appendChild(product);
      wishlist.addEventListener("click", async function() {
        if (wishlist.getAttribute("src") === "images/wishlist.png") {
          await addProductToFavourites(item.product.id);
          wishlist.src = "images/wishlist-red.png"
        } else {
          await deleteProductFromFavourites(item.product.id)
          wishlist.src = "images/wishlist.png"
        }
      });
      buttons[0].addEventListener("click", async function(){
        await deleteProductFromShoppingCart(item.product.id);
        window.location.reload();
      });
      buttons[1].addEventListener("click", async function(){
        await addProductToShoppingCart(item.product.id);
        window.location.reload();
      });
    }
  } catch (e) {
    const error = cart_template_error.content.cloneNode(true);
    let p = error.querySelectorAll('p');
    p[0].textContent = e.message
    while (cart_container.firstChild) {
      cart_container.removeChild(cart_container.firstChild);
    }
    cart_container.appendChild(error);
  }
}