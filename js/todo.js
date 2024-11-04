const elFiletrsWrapper = document.querySelector('.filters-wrapper');
const elTodoList = document.querySelector('.js-todo-list');
const elInput = document.querySelector('.js-input');
const elTodoTemplate = document.querySelector('.js-todo-item-template').content;

let arr = [];

function render(arr, node) {
    node.innerHTML = '';
    const fragment = document.createDocumentFragment();

    arr.forEach(item => {
        const clone = elTodoTemplate.cloneNode(true);

        clone.querySelector('.js-checkbox').checked = item.completed;
        clone.querySelector('.js-checkbox').dataset.id = item.id;
        clone.querySelector('.js-title').textContent = item.todo_value;
        clone.querySelector('.js-edit-btn').dataset.id = item.id
        clone.querySelector('.js-delete-btn').dataset.id = item.id;

        fragment.appendChild(clone);
    });
    node.appendChild(fragment);
}


// post todo
const todoPost = async(token, text)=>{
    const res = await fetch('http://localhost:5000/todo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ text })
    });
    const data = await res.json();
    console.log(data);
}

// edit todo
const todoEditing = async(token, text, id)=>{
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({ text })
    });
    const data = await res.json();
    console.log(data);
}

// change complete todo
const todoComplete = async(token, id)=>{
    const res = await fetch(`http://localhost:5000/todo/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
    const data = await res.json();
    console.log(data);
}

// delete todo
const todoDeleting = async(token, id)=>{
    const res = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
    const data = await res.json();
    console.log(data);
}

// get todo
const todoGet = async(token)=>{
    const res = await fetch('http://localhost:5000/todo', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
    });
    const data = await res.json();
    arr = data;
    render(arr, elTodoList);
}
todoGet(localStorage.getItem('token'));


const inputChange = async evt => {
    const title = evt.target.value.trim().toLowerCase();
    await todoPost(localStorage.getItem('token'), title);
    
    evt.target.value = '';
    await todoGet(localStorage.getItem('token'));
}

const todoListClick = async evt => {
    if(evt.target.matches('.js-edit-btn')) {
        let id = evt.target.dataset.id;
        
        const idx = arr.findIndex(item => item.id == id);
        let editionTitile = prompt('edit current title', arr[idx].todo_value).trim();

        await todoEditing(localStorage.getItem('token'), editionTitile, id);
        await todoGet(localStorage.getItem('token'));
    }

    if(evt.target.matches('.js-delete-btn')) {
        let id = evt.target.dataset.id;
        await todoDeleting(localStorage.getItem('token'), id);  
        await todoGet(localStorage.getItem('token'));
    }

    if(evt.target.matches('.js-checkbox')) {
        let id = evt.target.dataset.id;
        await todoComplete(localStorage.getItem('token'), id);
        await todoGet(localStorage.getItem('token'));
    }
}

const filtersWrapperClick = evt => {

    if(evt.target.matches('.js-all')){ 
        render(arr, elTodoList);
    }

    if(evt.target.matches('.js-completed')){ 
        let newArr = arr.filter(item => item.completed);
        render(newArr, elTodoList);
    }

    if(evt.target.matches('.js-uncompleted')){ 
        let newArr = arr.filter(item => !item.completed);
        render(newArr, elTodoList);
    }
}

elFiletrsWrapper.addEventListener('click', filtersWrapperClick);
elInput.addEventListener('change', inputChange);
elTodoList.addEventListener('click', todoListClick);




