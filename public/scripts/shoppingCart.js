const cart_container = document.getElementById('favourites-container');
const cart_template = document.getElementById("favourites-template");
const cart_template_error = document.getElementById("error-template");
async function getShoppingCart(){
  return await fetch(`/api/shopping-cart`, {
    method: 'GET'
  });
}

async function addProductToShoppingCart(productId){
  await fetch(`/api/shopping-cart/products/${productId}`, {
    method: 'POST'
  })
}

async function deleteProductFromShoppingCart(productId){
  await fetch(`/api/shopping-cart/products/${productId}`, {
    method: 'DELETE'
  })
}

async function displayShoppingCart() {
  try {
    let cartRequest = await getShoppingCart();
    let cart = await cartRequest.json()
    for (const item of cart.catalogProduct) {
      const product = cart_template.content.cloneNode(true);
      let picture = product.getElementById('cart-pic')
      picture.src = item.product.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist.png";
      let favouritesRequest = await getFavourites();
      if (favouritesRequest.status === 200){
        let favourites = await favouritesRequest.json();
        console.log(favourites)
        if (favourites.catalogProduct.some(x => x.id === item.id)){
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
      favourites_container.appendChild(product);
      wishlist.addEventListener("click", async function() {
        if (wishlist.getAttribute("src") === "images/wishlist.png") {
          await addToFavourites(item.product.id);
          wishlist.src = "images/wishlist-red.png"
        } else {
          await deleteFromFavourites(item.product.id)
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
    const error = favourites_template_error.content.cloneNode(true);
    let p = favourites_template_error.querySelectorAll('p');
    console.log(e);
    p.textContent = e.message
    if (e.statusCode === 404)
      p.textContent = "В избранном пока нет товаров"
    if (e.statusCode === 401)
      p.textContent = "Авторизуйтесь, чтобы добавлять продукты в избранное"
    while (favourites_container.firstChild) {
      favourites_container.removeChild(favourites_container.firstChild);
    }
    favourites_container.appendChild(error);
  }
}