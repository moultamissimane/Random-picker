var tableContent = document.querySelector(".tableContent");

const log = (ele) => {
  console.log(ele);
};

const getInput = () => {
  let fullname = document.getElementById("fullname").value;
  let brief = document.getElementById("brief").value;
  let element = {
    id: `${Math.floor(Math.random() * 10)}${Date.now()}`,
    fullName: fullname,
    brief: brief,
    status: "notChoosed",
    date: "",
  };
  console.log(element);
  addElement(element);
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
  var newTr = document.createElement("tr");
  newTr.map((e, idx) => {
    tableContent.innerHTML += `
    <tr class="p-3 border-t border-black">
      <td class="px-4 py-4 text-base border-b border-gray-200 bg-white ">
         <div class="flex items-center">
            <div class="flex-shrink-0">
                <p>${e.id} </p>
            </div>
      </div>
      </td>
      <td class="px-4 py-4 text-base border-b border-gray-200 bg-white ">
         <div class="flex items-center">
            <div class="flex-shrink-0">
                <p>${e.fullName} </p>
            </div>
      </div>
      </td>
      <td class="px-4 py-4 text-base border-b border-gray-200 bg-white ">
         <div class="flex items-center">
            <div class="flex-shrink-0">
                <p>${e.subject} </p>
            </div>
      </div>
      </td>
      <td class="px-4 py-4 text-base border-b border-gray-200 bg-white ">
         <div class="flex items-center">
            <div class="flex-shrink-0">
                <p>${e.status !== "notPicked" ? e.status : "Not yet"} </p>
            </div>
      </div>
      </td>
      <td class="px-4 py-4 text-base border-b border-gray-200 bg-white ">
         <div class="flex items-center">
            <div class="flex-shrink-0">
                <p>${e.date} </p>
            </div>
      </div>
      </td>
      <td class="px-4 py-4 border-b border-gray-200 bg-white text-base">
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <button id="${e.id} class="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-4 rounded">
                    Repeat
                </button>
            </div>
        </div>
      </td>
     
    </tr>
    `;
    tableContent.appendChild(newTr);
  });
  console.log(elements);
  addEventListenerToReset();
};
