var picker = document.getElementById("#picker");
let random;

const fetchData = async () => {
  const response = await fetch("http://127.0.0.1:5500/Data");
  const data = await response.json();
  return data;
};

const render = async (elements) => {
  picker.innerHTML = "";
  let arr = [];
  elements.forEach((element) => {
    if (element.status === "notChoosed") {
      arr.push(element.id);
    }
  });

    random = arr[Math.floor(Math.random() * arr.length)];   
    console.log(random);
    const element = elements.find((element) => element.id === random);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card">
    <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text">${element.description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `;
    picker.appendChild(div);
};

//   //arr random
//   random = arr[Math.floor(Math.random() * arr.length)];
//   let randomElement = elements.find((element) => element.id === random);
//   randomElement.style = "transform: scale(1.3)";
//   await elements.map((e) => {
//     if (e.status === "notChoosed") {
//       var newSpin = document.createElement("div");
//       newSpin.classList.add("scale-50");
//       newSpin.classList.add("w-48");
//       newSpin.classList.add("nodeChildrenSpinner");

//       newSpin.innerHTML = `
//             <div class="flex w-48 rounded-lg px-4 h-48 scale-50 text-base flex-col shadow-sm p-3 ${
//               e.id == random ? "bg-red-600 text-white h-52 -mt-2" : "bg-white"
//             } ${e.status != "notChoosed" ? "bg-gray-200" : ""}" id="id_${
//         e.id
//       }" >
//             <h3 class="text-2xl font-semibold items-baseline whitespace-nowrap">${
//               e.fullName
//             }</h3>
//             <p>${e.brief}</p>
//             ${
//               e.status != "notChoosed"
//                 ? '<hr class="border-white"/><p class="text-black mt-2">' +
//                   e.date +
//                   "</p>"
//                 : ""
//             }
//             </div>
//             `;
//       document.getElementById("spinnerWinner").innerHTML =
//         randomElement.fullName;
//       document.getElementById("spinnerWinnerId").value = randomElement.id;
//       spinner.appendChild(newSpin);
//     }
//   });
//   scrollToElement(randomElement.id);
// };
