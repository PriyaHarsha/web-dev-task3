const list= document.getElementById('list');
const add=document.getElementById('add');
const input=document.getElementById('input');

//initialize
let toDoList = getFromStorage();
console.log(toDoList)

//attach eventlistner to add button 
add.addEventListener('click', addToList);

//render elements when its loads for first time
renderList();

//function to renderList
function renderList() {
  let listItems='';
  //check if list is empty or not
  if (toDoList.length ==0) {
    //if empty display nothing
    listItems = `<h2>Nothing to Display</h2>`
  } else {
    //not empty, display tasks
    toDoList.forEach((Item) => {
      Item = `<div class="listElement">
                  <p>${Item.task}</p> 
                  <button id=${Item.id} class="edit">Edit</button>
                  <button id=${Item.id} class="delete">Delete</button>
                  </div>` ;
      listItems += Item;
      });
  }
  list.innerHTML=listItems;
  //attach event listners to edit and delete buttons
  attacheventlistener();
}

//add tasks to list
function addToList() {
    if (input.value.length > 0){
      const id= new Date().getTime();;
      const obj={id:id, task:input.value}
       toDoList.push(obj);
       input.value='';
       renderList();
       saveToStorage(toDoList)
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

}

//function to delete task
function deleteItem (id) {
  const index = toDoList.findIndex(i => i.id == id);
    const removed = toDoList.splice(index, 1);
    renderList();
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
      renderList();
     }
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
