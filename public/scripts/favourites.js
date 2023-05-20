const favourites_container = document.getElementById('favourites-container');
const favourites_template = document.getElementById("favourites-template");
const favourites_template_error = document.getElementById("error-template");
async function getFavourites(){
  return await fetch(`/api/favourites`, {
    method: 'GET'
  });
}

async function addProductToFavourites(productId) {
  let response = await fetch(`/api/favourites/products/${productId}`, {
    method: 'POST'
  })
  return response.status
}

async function deleteProductFromFavourites(productId){
  await fetch(`/api/favourites/products/${productId}`, {
    method: 'DELETE'
  })
}

async function displayFavourites(){
  try{
    let favouritesRequest = await getFavourites();
    if (favouritesRequest.status === 401)
      throw new Error("Авторизируйтесь, чтобы добавлять товары в избраннное")
    let favourites = await favouritesRequest.json()

    for (const item of favourites.specialProduct){
      const product = favourites_template.content.cloneNode(true);
      let picture = product.getElementById('favourites-pic')
      picture.src = item.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist-red.png";
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[1].textContent = "";
      span[2].textContent = item.prevPrice;
      span[3].textContent = item.newPrice;
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showSpecialInfo(\"${item.id}\")`;
      let button = product.getElementById("shopping-cart-btn");
      favourites_container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          await addProductToFavourites(item.id);
          wishlist.src = "images/wishlist-red.png"
        }
        else{
          await deleteProductFromFavourites(item.id)
          wishlist.src = "images/wishlist.png"}
      });
      button.addEventListener("click", async function(){
        await addProductToShoppingCart(item.id);
      });
    }

    for (const item of favourites.catalogProduct){
      const product = favourites_template.content.cloneNode(true);
      let picture = product.getElementById('favourites-pic')
      picture.src = item.picture;
      let wishlist = product.getElementById('wishlist-btn')
      wishlist.src = "images/wishlist-red.png";
      let h4 = product.querySelectorAll("h4");
      h4[0].textContent = item.name;
      let span = product.querySelectorAll("span");
      span[0].textContent = item.price;
      span[4].textContent = "";
      let a = product.querySelectorAll("a");
      a[0].href = `javascript:showProductInfo(\"${item.id}\")`;
      let button = product.getElementById("shopping-cart-btn");
      favourites_container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          await addProductToFavourites(item.id);
          wishlist.src = "images/wishlist-red.png"
        }
        else{
          await deleteProductFromFavourites(item.id)
          wishlist.src = "images/wishlist.png"}
      });
      button.addEventListener("click", async function(){
        await addProductToShoppingCart(item.id);
      });
    }
  } catch (e) {
    const error = favourites_template_error.content.cloneNode(true);
    let p = error.querySelectorAll('p');
    p[0].textContent = e.message
    while (favourites_container.firstChild) {
      favourites_container.removeChild(favourites_container.firstChild);
    }
    favourites_container.appendChild(error);
  }
}