const form = document.querySelector("form");
const taskCards = document.querySelector(".taskCards");
const themeBtn = document.querySelector(".theme-btn");
const closeBtn = document.querySelector(".close-btn");
const updatePage = document.querySelector(".updateTask");
const updateForm = document.querySelector(".update-form");

let updateIndex = null;
let taskArr = [];

const taskUi = () => {
  taskCards.innerHTML = "";
  taskArr.forEach((elem) => {
    let taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.setAttribute("data-id", Date.now());
    taskCard.setAttribute("data-status", "pending");
    taskCard.setAttribute("data-category", elem.taskCat);

    let taskCategory = document.createElement("p");
    taskCategory.classList.add("taskCategory");
    taskCategory.textContent = elem.taskCat;

    let taskH1 = document.createElement("h1");
    taskH1.classList.add("task");
    taskH1.textContent = elem.task;

    let taskBtns = document.createElement("div");
    taskBtns.classList.add("task-btns");

    let complete = document.createElement("button");
    complete.classList.add("complete");
    complete.textContent = "Complete";

    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = "Edit";
    edit.setAttribute("onclick", `editCard(${elem.id})`);

    let delBtn = document.createElement("button");
    delBtn.classList.add("delete");
    delBtn.textContent = "Delete";
    delBtn.setAttribute("onclick", `deleteCard(${elem.id})`);

    // Append
    taskCards.prepend(taskCard);
    taskCard.append(taskCategory, taskH1, taskBtns);
    taskBtns.append(complete, edit, delBtn);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let task = event.target[0].value;
  let taskCat = event.target[1].value;

  // ########      DIFFERENCE BETWEEN input.value AND input.getAttribute("value")       ##############
  // input.value : input ki current value ko fetch karta hai.
  // input.getAttribute("value") : input ki wo value fetch karta hai jo HTML ke value attribute me diya ho. ye static hota hai.

  if (task.trim() === "" || taskCat.trim() === "") {
    alert("Please fill all the fields");
    return;
  }
  let obj = {
    id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
    task,
    taskCat,
  };

  // if (updateIndex)
  taskArr.push(obj);
  console.log("Inside form taskArr", taskArr);
  taskUi();
  // console.log(obj);
  form.reset();
});

const deleteCard = (id) => {
  let taskDelIndex = taskArr.findIndex((elem) => elem.id === id);
  taskArr.splice(taskDelIndex, 1);
  taskUi();
};

const editCard = (id) => {
  let taskUpdate = taskArr.find((elem) => elem.id === id);
  updateIndex = taskArr.findIndex((elem) => elem.id === id);

  updatePage.style.display = "flex";
  updateForm[0].value = taskUpdate.task;
  updateForm[1].value = taskUpdate.taskCat;
};

updateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let updatedTask = updateForm[0].value.trim();
  let updatedCat = updateForm[1].value.trim();

  if (updatedTask.trim() === "" || updatedCat === "") {
    alert("Please fill all the fields");
    return;
  }

  taskArr[updateIndex].task = updatedTask;
  taskArr[updateIndex].taskCat = updatedCat;

  taskUi();
  updatePage.style.display = "none";
  updateForm.reset();
  updateIndex = null;
});

closeBtn.addEventListener("click", () => {
  updatePage.style.display = "none";
});
