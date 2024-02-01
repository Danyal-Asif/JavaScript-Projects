const form=document.querySelector(".grocery-form")
const alert=document.querySelector(".alert")
const grocery=document.querySelector(".grocery")
const submitBtn=document.querySelector(".submit-btn")
const container=document.querySelector(".grocery-container")
const list=document.querySelector(".grocery-list")
const clearBtn=document.querySelector(".clear-btn")

form.addEventListener("submit",addItem)
clearBtn.addEventListener("click",clearItems)
window.addEventListener("DOMContentLoaded",setupItems)

let editElement;
let editFlag=false
let editID=""

function addItem(e){
    e.preventDefault()
    let id=new Date().getTime().toString();
    let value=grocery.value
    if(value.trim()!=="" && !editFlag){
        const element=document.createElement("article");
        const attr=document.createAttribute("data-id");
        attr.value=id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item")
        element.innerHTML=`<p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i></button>
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i></button>
        </div>
        `;
        const editBtn=element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);
        
        const deleteBtn=element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);
        displayAlert("item added","success");
        list.appendChild(element);
        container.classList.add("show-container");
        addItemtoLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value.trim()!=="" && editFlag){
        editElement.innerHTML=value;
        displayAlert("value changed","success");
        editLocalStorage(editID,value);
        setBackToDefault();
    }
    else{
        displayAlert("please enter a value","danger");
    }
}
function setBackToDefault(){
    grocery.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent="submit";
}
function addItemtoLocalStorage(id,value){

    let items=getLocalStorage()
    items.push({id,value})
    localStorage.setItem("list",JSON.stringify(items))
}

function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function(){
        alert.textContent=""
        alert.classList.remove(`alert-${action}`);
    },1000)
}

function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editID=element.dataset.id;
    submitBtn.textContent="edit";
}

function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    const id=element.dataset.id;
    list.removeChild(element);
    if(list.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("item deleted","danger");
    setBackToDefault();
    removeFromLocalStorage(id);
}

function removeFromLocalStorage(id){
    let items=getLocalStorage();

    items=items.filter(function(item){
        if(item.id!==id){
            return item;
        }
    });
    localStorage.setItem("list",JSON.stringify(items))
}

function clearItems(){
    const items=document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item)
        });
        container.classList.remove("show-container");
    }
    displayAlert("empty list","danger");
    setBackToDefault();
    localStorage.removeItem("list");
}

function editLocalStorage(id,value){
    let items=getLocalStorage();
    items=items.map(function(item){
        if(item.id===id){
            item.value=value;
        }
        return item;
    });
    localStorage.setItem("list",JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem("list")
    ?JSON.parse(localStorage.getItem("list")):[];
}

function setupItems(){
    const items=getLocalStorage()
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.id,item.value);
        });
        container.classList.add("show-container");
    }


    function createListItem(id,value){
        const element=document.createElement("article");
        const attr=document.createAttribute("data-id");
        attr.value=id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
        element.innerHTML=`<p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i></button>
        <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i></button>
        </div>
        `;
        const editBtn=element.querySelector(".edit-btn");
        editBtn.addEventListener("click",editItem);
        
        const deleteBtn=element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click",deleteItem);

        list.appendChild(element)
    }
}