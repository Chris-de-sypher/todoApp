/** @format */

const textfield = document.querySelector("#mytext");
const btn = document.querySelector("button[type='submit']");
const clear = document.querySelector("#clear");
const complete = document.querySelector("#complete");
const save = document.querySelector("#save");
const todohold = document.querySelector("#todolist");
const form = document.querySelector("form");
const stores = document.querySelector("#stores");
const storeData = document.querySelector(".store-data");
const savedData = document.querySelector("#saved");
const completeList = document.querySelector(".complete-list");
const completedItems = document.querySelector("#Completed-list");

let myList = [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const resulting = textfield.value.toLowerCase();
  if (textfield.value == "") return false;
  myList.push(resulting);
  ArrayForList(myList);
  textfield.value = "";
});
if (todohold.textContent == "") {
  let text1 = "* Create List";
  todohold.style.color = "red";
  todohold.textContent = text1;
}

const ArrayForList = async (items) => {
  const listedList = await items
    .map((item) => {
      return `<li>
                    <div class="spread" data-id="${myList.indexOf(item)}">
                    <span class="item" id="item-store">${item.trim()}</span>
                    <span class="mark" id="marks">complete?</span>
                    <span class="del" id="delete">delete</span>
                    </div>
                </li>`;
    })
    .join("");
  todohold.innerHTML = listedList;
};

todohold.addEventListener("click", function (e) {
  e.preventDefault();
  let deletebutton = e.target.id == "delete";
  let mark = e.target.id === "marks";
  // let textcontents = e.target.id === "item-store";
  let Id = e.target.parentElement.dataset.id;
  let convertId = parseInt(Id);
  let childId = e.target.parentElement.dataset.id;
  let convertChildId = parseInt(childId);
  if (deletebutton) {
    const v = delete myList[Id];
    console.log(myList);
    if (v == true) {
      setTimeout(() => {
        ArrayForList(myList);
        console.log(myList.length);
      }, 1000);
    } else {
      return false;
    }
  }

  if (mark) {
    const c = todohold.children[Id];
    c.style.background = "green";
    c.style.borderRadius = 6 + "px";
    // console.log(c);
    setTimeout(() => {
      c.style.background = "";
      c.style.borderRadius = "";
    }, 2000);
    const grabitem = myList[Id];
    completedItems.append(`*List completed ${grabitem} \n`);
    let completeChange = todohold.querySelectorAll("#marks");
    console.log(completeChange)
    completeChange.forEach((items) => {
        items.textContent = "Completed";
    });
  }
});

clear.addEventListener("click", function (e) {
  e.preventDefault();
  if (!myList.length == "") {
    const f = confirm("Do you want to clear the list");
    if (f) {
      todohold.textContent = "";
      myList = [];
    } else {
      return false;
    }
  } else {
    alert("List is empty");
  }
});

save.addEventListener("click", function (e) {
  e.preventDefault();
  const list = myList;
  let newList = [...list];
  localStorage.setItem("ListedItems", newList);
  CompletedList(newList);
});

const CompletedList = async (items) => {
  const newlIst = await items
    .map((item) => {
      return `
        <li>${item}</li> 
        `;
    })
    .join("\n");
  stores.innerHTML = newlIst;
};
savedData.onclick = async (event) => {
  event.preventDefault();
  storeData.classList.toggle("active");
  const xy = storeData.getAttribute("class");
  if (stores.textContent === "") {
    const note = "*saved list empty";
    stores.textContent = note;
  }
  if (xy.includes("active")) {
    todohold.style.display = "none";
    completeList.classList.remove("active");
  } else {
    todohold.style.display = "block";
  }
};
complete.onclick = (e) => {
  e.preventDefault();
  completeList.classList.toggle("active");
  const xy = completeList.getAttribute("class");
  if (completedItems.textContent === "") {
    const note = "*No completed task yet";
    completedItems.textContent = note;
  }
  if (xy.includes("active")) {
    todohold.style.display = "none";
    storeData.classList.remove("active");
  } else {
    todohold.style.display = "block";
  }
};

textfield.focus();
