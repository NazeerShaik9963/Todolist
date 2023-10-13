let todoItemsContainer = document.getElementById("todoItemsContainer");
let savebutton = document.getElementById("saveButton");

function getitemsfromLocal() {
    let todolistItems = localStorage.getItem("myArraytech");
    let parsemyArraytech = JSON.parse(todolistItems);
    if (parsemyArraytech === null) {
        return [];
    } else {
        return parsemyArraytech;
    }
}
let myArraytech = getitemsfromLocal();
let todocount = myArraytech.length;
savebutton.onclick = function() {
    localStorage.setItem("myArraytech", JSON.stringify(myArraytech));
}

function onTodStatus(checkBoxId, labelId, todoElementId) {
    let checkBoxIdSt = document.getElementById(checkBoxId);
    let labelId1 = document.getElementById(labelId);

    labelId1.classList.toggle("checked");

    let indexOfTodoItems = myArraytech.findIndex(function(i) {
        let id = "todoElement" + i.uniqId;
        if (todoElementId === id) {
            return true;
        } else {
            return false;
        }
    })

    let itemschecked = myArraytech[indexOfTodoItems].ischecked;
    if (itemschecked === false) {
        myArraytech[indexOfTodoItems].ischecked = true;
    } else {
        myArraytech[indexOfTodoItems].ischecked = false;
    }

}

function delatetodolist(todoElementId) {
    let todoElementId1 = document.getElementById(todoElementId);
    todoItemsContainer.removeChild(todoElementId1);
    let findindex = myArraytech.findIndex(function(i) {
        let delteid = "todoElement" + i.uniqId;
        if (delteid === todoElementId) {
            return true;
        } else {
            return false;
        }

    });

    myArraytech.splice(findindex, 1);
}


function myArrayitems(tech) {
    let todoElementId = "todoElement" + tech.uniqId;
    let checkBoxId = "mycheackBox" + tech.uniqId;
    let labelId = "label" + tech.uniqId;
    let checkedstatus = tech.ischecked;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoElementId;
    todoItemsContainer.appendChild(todoElement);

    let toUserInput = document.createElement("input");
    toUserInput.type = "checkBox";
    toUserInput.id = checkBoxId;
    toUserInput.classList.add("checkbox-input");
    toUserInput.checked = checkedstatus;
    todoElement.appendChild(toUserInput);
    toUserInput.onclick = function() {
        onTodStatus(checkBoxId, labelId, todoElementId);
    }



    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex_row");
    todoElement.appendChild(labelContainer);



    let label = document.createElement("label");
    label.setAttribute("for", checkBoxId);
    label.textContent = tech.name;
    label.id = labelId;
    label.classList.add("checkbox-label");
    if (checkedstatus === true) {
        label.classList.add("checked");
    }
    labelContainer.appendChild(label);

    let deleteiconcontainer = document.createElement("div");
    deleteiconcontainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteiconcontainer);

    let icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash", "delete-icon");
    deleteiconcontainer.appendChild(icon);
    icon.onclick = function() {
        delatetodolist(todoElementId);
    }

}

for (let tech of myArraytech) {
    myArrayitems(tech);
}

function buttonAdd() {
    let input = document.getElementById("todoUserInput");
    let userinput = input.value;

    if (userinput === "") {
        alert("Enter Valid Text");
        return;
    }

    todocount = todocount + 1;
    let newArray = {
        name: userinput,
        uniqId: todocount,
        ischecked: false
    };

    myArraytech.push(newArray);
    myArrayitems(newArray);

    input.value = "";
}