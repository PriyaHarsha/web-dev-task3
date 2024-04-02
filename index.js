const list= document.getElementById('list');
const add=document.getElementById('add');
const input=document.getElementById('input');
const menuBtn=document.querySelectorAll('.menu span');
const clearBtn=document.querySelector('.clear');
let menutype='';

//initialize
let toDoList = getFromStorage();

//attach eventlistner to add button 
add.addEventListener('click', addToList);

//attach event listner to menu buttons
menuBtn.forEach(button => {
  button.addEventListener('click', (e) => {
    document.querySelector("span.active").classList.remove("active");
    console.log('get');
    button.classList.add("active");
    renderList(e.target.textContent)});

})

//attach event listner to clear All button
clearBtn.addEventListener('click', clearAll);

//render elements when its loads for first time
renderList('All');

//function to renderList
function renderList(menu) {
  let listItems='';
  if (menu === 'All'){
    menutype='All';
    toDoList.forEach((Item) => {
      Item = renderelement(Item);
      listItems += Item;
      });
  } else if (menu === 'Pending'){
    menutype='Pending';
      toDoList.forEach((Item) => {
        if (Item.status === false) {
          Item=renderelement(Item);
          listItems +=Item;
        }
      })
  } else if (menu === 'Completed'){
    menutype='Completed';
    console.log(menutype)
    toDoList.forEach((Item) => {
      if (Item.status === true) {
        Item=renderelement(Item);
        listItems +=Item;
      }
    })
  }
  list.innerHTML=listItems ? listItems : `<h2>You don't have any tasks</h2>`;
  attacheventlistener();
}

function renderelement(Item){
 return (`<div class="listElement">
            <p class=${Item.status ? 'completed':'pending'}> ${Item.task}</p> 
            <div class='control-btns'>
            <button id=${Item.id} class='checkbox'>${Item.status ? 'Completed' : 'Pending'}</button>
            <button id=${Item.id} class="edit">Edit</button>
            <button id=${Item.id} class="delete">Delete</button>
            </div>
            
          </div>` )
}

//add tasks to list
function addToList() {
    if (input.value.length > 0){
      const id= new Date().getTime();
      const obj={id:id, task:input.value, status:false};
       toDoList.push(obj);
       input.value='';
       renderList(menutype);
       saveToStorage(toDoList);
}}

// function to attach event listners to edit and delete buttons
function attacheventlistener () {
  const deleteBtn=document.querySelectorAll('.delete');
  deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) =>{deleteItem(e.target.id)});
  })
  const editBtn=document.querySelectorAll('.edit');
  editBtn.forEach(btn => {
    btn.addEventListener('click', (e) =>{editItem(e.target)});
  })
  const taskStatus=document.querySelectorAll('.checkbox');
  taskStatus.forEach(task => {
    task.addEventListener('click', (e) =>{changeStatus(e.target)});
  })
}

//function to change status
function changeStatus(target) {
  const id= target.id;
  const index = toDoList.findIndex(i => i.id == id);
  toDoList[index].status =! toDoList[index].status;
  renderList(menutype);
  saveToStorage(toDoList);
  }
  

//function to delete task
function deleteItem (id) {
  const index = toDoList.findIndex(i => i.id == id);
  toDoList.splice(index, 1);
  renderList(menutype);
  saveToStorage(toDoList);
}

//function to edit tasks
function editItem(target) {
  const listDiv = target.parentNode;
  if (target.textContent == "Edit") {
     const p = listDiv.firstElementChild;
     const input = document.createElement("input");
     input.type = "text";
     input.value = p.textContent;
     listDiv.insertBefore(input, p);
     listDiv.removeChild(p);
     target.textContent = "Save";
   } else if (target.textContent == "Save") {
      const input = listDiv.firstElementChild;
      const p = document.createElement("p");
      listDiv.insertBefore(p, input);
      if (input.value !== ''){
        const index = toDoList.findIndex(i => i.id == target.id);
        toDoList[index].task =input.value;
        listDiv.removeChild(input);
        saveToStorage(toDoList)
      }         
      renderList(menutype);
     }
}

//function to clear all taks
function clearAll () {
    toDoList=[];
    renderList('All');
}


//function to store tasks to localStorage
function saveToStorage (toDolist){
  window.localStorage.setItem(
      'ToDoListItems',
      JSON.stringify(toDolist),
  );
}

//function to get tasks from local storage
function getFromStorage () {
  const getFavorite = window.localStorage.getItem('ToDoListItems');
  return (
      getFavorite ? JSON.parse(getFavorite) : [] 
  )
}
