const getUser = async () => {
    return await fetch(`/api/user?userId=15568b1c-96a5-48fb-90b4-bd75a94b0ec8`)
        .then(response => response.json());
}

const container = document.getElementById('user-container');
const template_users = document.getElementById("user-template");
const template_error = document.getElementById("error-template");

const loadUser = async () => {
    container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

    try {
        const item = await getUser()
        container.innerHTML = '';
        const user = template_users.content.cloneNode(true);
        let p = user.querySelectorAll("p");
        p[0].textContent = "Имя: " + item.name;
        p[1].textContent = "Почта: " + item.email;
        p[2].textContent = "Телефон: " + item.phoneNumber;
        p[3].textContent = "Пароль: ********";
        container.appendChild(user);
    } catch (e) {
        const error = template_error.content.cloneNode(true);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(error);
    }
}

loadUser();