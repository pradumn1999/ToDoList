const inputValue = document.getElementById("inputValue");
const mainTodoElem = document.querySelector(".todo-list-elem");




const getLocalStorageData= () =>{
     return JSON.parse(localStorage.getItem("object"));
}

const addToDoListlocalStorage = (localToDoList) =>{
   return localStorage.setItem("object", JSON.stringify(localToDoList))

}

localToDoList=getLocalStorageData() || [];

const addToDoDynamicElement=((curElem)=>{
     const divElement = document.createElement("div");
     divElement.classList.add("mainToDoDiv");
     divElement.innerHTML =` <li>${curElem}</li>  <button class="deleteBtn">Delete</button>`
     mainTodoElem.append(divElement);
})

const addToDoList = (e) =>{
     e.preventDefault();
     
     
     const valueToDoList = inputValue.value.trim();  // remove white space and trim
     
     if(valueToDoList!="" && !localToDoList.includes(valueToDoList)){
          // localToDoList=getLocalStorageData() || [];
          
          localToDoList.push(valueToDoList);
          
          // localToDoList=[...new Set(localToDoList)];
          console.log(localToDoList);
          
          localStorage.setItem("object", JSON.stringify(localToDoList));
          
          addToDoDynamicElement(valueToDoList)
          
          
     }
     inputValue.value= "";
     
}

const  showToDoList = () => {
     console.log(localToDoList);
     
     
     localToDoList.forEach((curElem) => {
          addToDoDynamicElement(curElem);
     });
}


showToDoList();

const removeLocalStorageData = (e) =>{
     
     const todoToRemove = e.target;
     let todoListContent = todoToRemove.previousElementSibling.innerText;
     let parentElement = todoToRemove.parentElement;
     console.log(todoListContent);

    localToDoList= localToDoList.filter((curElem) =>{
       return curElem != todoListContent.toLowerCase(); 

     })
     
     addToDoListlocalStorage(localToDoList);
     parentElement.remove();
     console.log(localToDoList);
}

mainTodoElem.addEventListener("click", (e) =>{
    e.preventDefault();
//     console.log(e.target);
    if(e.target.classList.contains("deleteBtn")){
         
      removeLocalStorageData(e);

    }
})    

document.getElementById("btn").addEventListener("click", (e) =>{
     addToDoList(e);

})