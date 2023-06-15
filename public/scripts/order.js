async function getOrders(){
  return await fetch(`/api/customer/orders`, {
    method: 'GET'
  });
}

async function displayOrders() {
  const orders_container = document.getElementById('orders-container');
  const order_template = document.getElementById("order-template");
  const order_template_error = document.getElementById("order-error-template");

  try {
    let response = await getOrders();
    if (response.status === 404)
      throw new Error("У вас пока нет заказов")
    let orders = await response.json()

    for (const item of orders) {
      const order = order_template.content.cloneNode(true);
      let h3 = order.querySelectorAll("h3");
      h3[0].textContent += item.id;
      let p = order.querySelectorAll("p");
      p[0].textContent += item.creationDate.substring(0, 10) + " " + item.creationDate.substring(11, 16);
      p[1].textContent += item.deliveryDate.substring(0, 10) + " " + item.deliveryDate.substring(11, 16);
      p[2].textContent += item.address;
      p[3].textContent += item.status;
      // let a = order.querySelectorAll("a");
      // a[0].href = `/order/${item.id}")`;
      orders_container.appendChild(order);
    }
  } catch (e) {
    const error = order_template_error.content.cloneNode(true);
    let p = error.querySelectorAll('p');
    p[0].textContent = e.message
    while (orders_container.firstChild) {
      orders_container.removeChild(orders_container.firstChild);
    }
    orders_container.appendChild(error);
  }
}
async function addFormListener() {
  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          "payment": data.payment,
          "delivery": data.delivery,
          "address": data.address,
          "deliveryDate": data.deliveryDate + ':00.000Z'
        })
      });

      if (response.status === 201) {
        window.location.href = "/account";
      } else {
        if (response.status === 404)
          window.alert("Чтобы оформить заказ, добавьте товары в корзину");
        else
          window.alert("Произошла ошибка");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        window.alert(err.message);
      } else {
        window.alert("Error");
      }
    }
  });
}