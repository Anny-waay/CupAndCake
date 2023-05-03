const favourites_container = document.getElementById('favourites-container');
const favourites_template = document.getElementById("favourites-template");
const favourites_template_error = document.getElementById("error-template");
async function getFavourites(){
  return await fetch(`/api/favourites`, {
    method: 'GET'
  });
}

async function addToFavourites(productId){
  await fetch(`/api/favourites/products/${productId}`, {
    method: 'POST'
  })
}

async function deleteFromFavourites(productId){
  await fetch(`/api/favourites/products/${productId}`, {
    method: 'DELETE'
  })
}

async function displayFavourites(){
  try{
    let favouritesRequest = await getFavourites();
    let favourites = await favouritesRequest.json()
    for (const item of favourites.catalogProduct){
      console.log(item)
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
      a[0].href = `javascript:showProductInfo(\"${item.id}\")`
      favourites_container.appendChild(product);
      wishlist.addEventListener("click", async function(){
        if (wishlist.getAttribute("src") === "images/wishlist.png"){
          await addToFavourites(item.id);
          wishlist.src = "images/wishlist-red.png"
        }
        else{
          await deleteFromFavourites(item.id)
          wishlist.src = "images/wishlist.png"}
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