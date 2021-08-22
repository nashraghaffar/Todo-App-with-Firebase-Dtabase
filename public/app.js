// console.log(firebase.database())


var todoList = document.getElementById('todoList');
var input = document.getElementById('input');


//getting data from firebase

firebase.database().ref("todoData").on("child_added", function (data) {
    // console.log(data.val().todoItem)
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().todoItem)
    li.appendChild(liText)
    li.setAttribute("class", "lee")


    //DELETE BTN
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("");
    delBtn.setAttribute("onclick", "delItem(this)")
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("class", "cut-btn")
    delBtn.innerHTML = '<img class="js-cross-btn" src = "criss-cross.png" />'
    delBtn.appendChild(delText)


    //EDIT BTN
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("EDIT");
    editBtn.appendChild(editText);
    editBtn.setAttribute("id",data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)")
    editBtn.setAttribute("class", "edit-btn")
    editBtn.innerHTML = '<img class="js-edit-btn" src = "pencil.png" />'




    li.appendChild(delBtn);
    li.appendChild(editBtn);

    todoList.appendChild(li)

    // console.log(data.val())
})



function addItem() {
    if (input.value == "") {
        alert("Please fill the input field")
    } else {

        //adding data into firebase
        var key = firebase.database().ref("todoData").push().key;
        var databaseItems = {
            todoItem: input.value,
            key: key
        }
        firebase.database().ref("todoData").child(key).set(databaseItems)
        input.value = "";
    }
}


function deleteAll() {
    todoList.innerHTML = ""
    firebase.database().ref("todoData").remove()
}

function delItem(btn) {
    firebase.database().ref("todoData").child(btn.id).remove()
    btn.parentNode.remove()
    // console
    // console.log(btn.parentNode)
}

function editItem(editBtn) {
    var a = prompt("Enter the edited text")
    var editTodo = {
        todoItem : a,
        key : editBtn.id
    }
    firebase.database().ref("todoData").child(editBtn.id).set(editTodo)
    editBtn.parentNode.firstChild.nodeValue = a;
}