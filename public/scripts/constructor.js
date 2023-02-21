function choosePicture(cake, cream, filling){
    if (cake === "Торт"){
        if (filling === "Клубника"){
            if (cream === "Шоколадный"){
                return "../images/cake-chocolate-strawberry.jpeg"
            }
            else{
                return "../images/cake-vanila-strawberry.jpeg"
            }
        }
        else{
            if (cream === "Шоколадный"){
                return "../images/cake-chocolate.jpeg"
            }
            else{
                return "../images/cake-berries.jpeg"
            }
        }
    }
    else{
        if (cream === "Шоколадный"){
            return "../images/bento-cake-chocolate.jpeg"
        }
        else{
            if (filling === "Клубника"){
                return "../images/bento-cake-vanila-strawberry.jpeg"
            }
            else{
                return "../images/bento-cake-blueberry.jpeg"
            }
        }
    }
}

function mapForm(){
    const biscuit= document.getElementById("biscuit").value;
    const cream =  document.getElementById("cream").value;
    const filling = document.getElementById("filling").value;

    const text1 = document.getElementById("cake").value;
    const text2 = "Бисквит: " + biscuit;
    const text3 = "Крем: " + cream;
    const text4 = "Наполнитель: " + filling;
    const text5 = "Пожелания по дизайну: " + document.getElementById("design").value;
    const pic = choosePicture(text1, cream, filling);

    return { text1, text2, text3, text4, text5, pic};
}

function createElementMap(order){

    const template = document.getElementById("cake-constructor");

    const li = template.content.cloneNode(true);
    let divs = li.querySelectorAll("div");
    divs[0].textContent  = order.text1;
    divs[1].textContent = order.text2;
    divs[2].textContent = order.text3;
    divs[3].textContent = order.text4;
    divs[4].textContent = order.text5;

    let pic = li.querySelectorAll("img");
    pic[0].src =  order.pic

    document.getElementById("constructor-list").appendChild(li);
}

function createNewElement() {
    createElementMap(mapForm())
}

function updateStorage(){
    const items = document.querySelectorAll('.constructor-grid');

    let values = [];
    items.forEach((item) => {
        const text1 = item.getElementsByClassName('text-1')[0].innerText;
        const text2 = item.getElementsByClassName('text-2')[0].innerText;
        const text3 = item.getElementsByClassName('text-3')[0].innerText;
        const text4 = item.getElementsByClassName('text-4')[0].innerText;
        const text5 = item.getElementsByClassName('text-5')[0].innerText;
        const pic = item.getElementsByClassName('picture')[0].src;
        values.push({ text1, text2, text3, text4, text5, pic});
    });

    localStorage.setItem('order', JSON.stringify(values));
}

function setFormOnSubmit () {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createNewElement();
        updateStorage()
        form.reset();
    })
}

function initData(){
    if (localStorage.getItem('order')) {
        const orders= JSON.parse(localStorage.getItem('order'));
        orders.forEach(order => {
            createElementMap(order);
        });
    }
}

initData();
setFormOnSubmit();