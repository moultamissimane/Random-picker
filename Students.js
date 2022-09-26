var tableContent = document.querySelector(".tableContent");

const log = (ele) => {
  console.log(ele);
};

const getInput = () => {
  let fullname = document.getElementById("fullname").value;
  let subject = document.getElementById("brief").value;
  let element = {
    id: `${Math.floor(Math.random() * 10)}${Date.now()}`,
    fullName: fullname,
    subject: subject,
    status: "notChoosed",
    date: "",
  };
  console.log(element);
  addElements(element);
};
document.querySelector("#btnAdd").addEventListener("click", getInput);

const fetchElements = async () => {
  const response = await fetch("http://localhost:3000/elements");
  const data = await response.json();
  await render(data);
  return data;
};

fetchElements();

//add the past elements to json file
const addElements = async (element) => {
  const response = await fetch("http://localhost:3000/elements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await response.json();
  console.log(data);
  render(fetchElements());
};

// delete the element from json file
const deleteElements = async (element) => {
  const response = await fetch("http://localhost:3000/elements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await response.json();
  console.log(data);
  render(fetchElements());
};

// render the elements
const render = (elements) => {
  tableContent.innerHTML = "";
  elements.map((e, idx) => {
    var newTr = document.createElement("tr");
    newTr.classList.add("hover:bg-yellow-100");
    newTr.innerHTML = `
    <td  class="divide-y-2 text-center text-black">${e.fullName}</td>
    <td class="text-center text-black">${e.subject}</td>
    <td class="text-center text-black">${
      e.status !== "notChoosed" ? e.status : "not yet"
    }</td>
        <td class="text-center text-black">${e.date}</td>
        <td class="p-2">
        <button class="p-1 rounded-md bg-pink-400 text-white px-3 focus:scale-95 buttonRepeat" id="${e.id}">Reset</button>
        </td>
        `;
    tableContent.appendChild(newTr);
  });
  console.log(elements);
  addEventListenerToReset();
};

const addEventListenerToReset = () => {
  const buttonRepeat = document.querySelectorAll(".buttonRepeat");
  buttonRepeat.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      resetElement(e.target.id);
    });
  });
};

// update the element from data input to json
const updateElement = async (element) => {
  const response = await fetch(`http://localhost:3000/elements/${element.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(element),
  });
  const data = await response.json();
  console.log(data);
  render(fetchElements());
};
const resetElement = async (id) => {
  const response = await fetch(`http://localhost:3000/elements/${id}`);
  const data = await response.json();
  data.status = "notPicked";
  data.date = "";
  updateElement(data);
};

const changeDate = async () => {
  let elements = await fetchElements();
  elements.map((e) => {
    var idElement = document.getElementById("spinnerWinnerId").value;
    console.log(idElement);
    if (e.id === idElement) {
      e.date = document.getElementById("datePickerInput").value;
      e.status = "choosed";
      updateElement(e);
    }
  });
};

document.querySelector("#ChooseBtn").addEventListener("click", changeDate);
