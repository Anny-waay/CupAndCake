const container = document.getElementById('user-container');
const template_users = document.getElementById("user-template");
const template_error = document.getElementById("error-template");

async function loadUser(){
    container.innerHTML = '' + '<img src="../images/loading.gif" width="200" height="200" alt="mask">';

    try {
        const response = await fetch(`/api/user`);
        if (response.status === 401)
            window.location.href = "/login";
        const item = await response.json();
        container.innerHTML = '';
        const user = template_users.content.cloneNode(true);
        let p = user.querySelectorAll("p");
        p[0].textContent = "Имя: " + item.name;
        p[1].textContent = "Почта: " + item.email;
        p[2].textContent = "Телефон: " + item.phoneNumber;
        container.appendChild(user);
    } catch (e) {
        const error = template_error.content.cloneNode(true);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(error);
    }
}

async function logout(){
    await supertokensEmailPassword.signOut()
    window.location.reload();
}