const myform = document.querySelector("#main-form");
const ulContactList = document.querySelector("#show-contact .list-group");
const formsInformation = document.querySelectorAll(".form-group.row");
const gender = "gender";
const dataKey = "GetJson!!";

const oldData = localStorage.getItem(dataKey);

let contactList = oldData === null ? [] : JSON.parse(oldData);

//retrieve old data
contactList.forEach( (elem, index) =>{
    updateContactList(elem, index);
});

// add validiation
formsInformation.forEach(function(form) {
    form.addEventListener("input", function(){
        form.classList.add("was-validated");
    });
});

myform.addEventListener("submit", addContactList);

function addContactList(e){
    // prevent reload
    e.preventDefault();
    // storage data
    let data = {};

    formsInformation.forEach(function(form){
        const label = form.querySelector("label").getAttribute("for");
        if(label === "gender"){
            // check radio button
            form.querySelectorAll("input").forEach(function(check){
                if(check.checked){
                    data[label] = check.value;
                }
            });
        }else{
            const value = form.querySelector(".input-form").value;
            data[label] = value;
        }
    });

    contactList.push(data);
    updateContactList(data, contactList.length-1);
    // store to local storage
    var jsonString = JSON.stringify(contactList);
    localStorage.setItem(dataKey, jsonString);
    
}

function updateContactList(data,index){
    // li element to contain contact data
    const li = document.createElement("li");
    li.setAttribute("id", index)
    li.classList.add("list-group-item", "text-dark", "d-flex", "justify-content-between");

    //contain data
    const divP = document.createElement("div");
    divP.classList.add("flex-fill");
    // loop through object
    Object.entries(data).forEach( entry => {
        const p = document.createElement("p");
        p.classList.add("p-2","bg-light","border","border-dark");
        p.textContent = `${entry[0]} : ${entry[1]}`;
        divP.appendChild(p);
    });
    li.appendChild(divP);

    // button for delete
    const btn = document.createElement("button");
    btn.classList.add("btn","btn-danger", "btn-sm", "delete", "align-self-start","ml-3");
    btn.textContent = "X";
    li.appendChild(btn);
    
    btn.addEventListener("click", (e)=>{
        const temp_li = e.target.parentNode;
        const ul = temp_li.parentNode;
        const check = ul.children;
        // find index
        for(let i =0; i<ul.childElementCount; i++){
            if(check[i] === temp_li){
                removeContactData(i);
                break;
            }
        }

        temp_li.parentNode.removeChild(temp_li);
    });

    ulContactList.appendChild(li);
}

function removeContactData(id){
    
    
    contactList = contactList.filter((_,index)=>{
        return index != id;
    });
    // store to local storage
    var jsonString = JSON.stringify(contactList);
    localStorage.setItem(dataKey, jsonString);
}

