// Получение всех рецептов
async function GetRecipes() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/recipeapi", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const recipes = await response.json();
        let rows = document.querySelector("tbody");
        recipes.forEach(recipe => {
            // добавляем полученные элементы в таблицу
            rows.append(row(recipe));
        });
    }
}
// Получение одного пользователя
async function GetRecipe(id) {
    const response = await fetch("/api/recipeapi/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const recipe = await response.json();
        const form = document.forms["userForm"];
        form.elements["id"].value = recipe.id;
        form.elements["title"].value = recipe.title;
        form.elements["author"].value = recipe.author;
        form.elements["recipedesc"].value = recipe.recipedesc;
    }
}
// Добавление пользователя
async function CreateUser(recipeTitle, recipeAuthor, recipeDesc) {

    const response = await fetch("api/recipeapi", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            title: recipeTitle,
            author: recipeAuthor,
            recipedesc: recipeDesc
        })
    });
    if (response.ok === true) {
        const recipe = await response.json();
        reset();
        document.querySelector("tbody").append(row(recipe));
    }
    //else {
    //    const errorData = await response.json();
    //    console.log("errors", errorData);
    //    if (errorData) {
    //        // ошибки вследствие валидации по атрибутам
    //        if (errorData.errors) {
    //            if (errorData.errors["Name"]) {
    //                addError(errorData.errors["Name"]);
    //            }
    //            if (errorData.errors["Age"]) {
    //                addError(errorData.errors["Age"]);
    //            }
    //        }
    //        // кастомные ошибки, определенные в контроллере
    //        // добавляем ошибки свойства Name
    //        if (errorData["Name"]) {
    //            addError(errorData["Name"]);
    //        }

    //        // добавляем ошибки свойства Age
    //        if (errorData["Age"]) {
    //            addError(errorData["Age"]);
    //        }
    //    }

    //    document.getElementById("errors").style.display = "block";
    //}
}
// Изменение пользователя
async function EditUser(recipeId, recipeTitle, recipeAuthor, recipeDesc) {
    const response = await fetch("api/recipeapi", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: parseInt(recipeId, 10),
            title: recipeTitle,
            author: recipeAuthor,
            recipedesc: recipeDesc
        })
    });
    if (response.ok === true) {
        const recipe = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + recipe.id + "']").replaceWith(row(recipe));
    }
}
// Удаление пользователя
async function DeleteUser(id) {
    const response = await fetch("/api/recipeapi/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const recipe = await response.json();
        document.querySelector("tr[data-rowid='" + recipe.id + "']").remove();
    }
}

// сброс формы
function reset() {
    const form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}
function addError(errors) {
    errors.forEach(error => {
        const p = document.createElement("p");
        p.append(error);
        document.getElementById("errors").append(p);
    });
}
// создание строки для таблицы
function row(user) {

    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", user.id);

    const idTd = document.createElement("td");
    idTd.append(user.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(user.name);
    tr.append(nameTd);

    const ageTd = document.createElement("td");
    ageTd.append(user.age);
    tr.append(ageTd);

    const linksTd = document.createElement("td");

    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", user.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {

        e.preventDefault();
        GetUser(user.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", user.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteUser(user.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);

    return tr;
}
// сброс значений формы
document.getElementById("reset").click(function (e) {

    e.preventDefault();
    reset();
})

// отправка формы
document.forms["userForm"].addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const id = form.elements["id"].value;
    const name = form.elements["name"].value;
    const age = form.elements["age"].value;
    if (id == 0)
        CreateUser(name, age);
    else
        EditUser(id, name, age);
});

// загрузка пользователей
GetRecipes();