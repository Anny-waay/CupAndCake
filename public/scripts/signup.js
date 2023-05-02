const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    let response = await supertokensEmailPassword.signUp({
      formFields: [
        {
          id: "name",
          value: data.name,
        },
        {
          id: "phone_number",
          value: data.phone_number,
        },
        {
          id: "email",
          value: data.email,
        },
        {
          id: "password",
          value: data.password,
        },
      ],
    });

    if (response.status === "OK") {
      await supertokensEmailPassword.signIn({
        formFields: [
          {
            id: "email",
            value: data.email,
          },
          {
            id: "password",
            value: data.password,
          },
        ],
      });
      window.location.href = "/account";
    } else {
      window.alert(`${response.status} ${response.message}`);
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
});