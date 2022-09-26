var picker = document.querySelector("#picker");
let random;

const fetchElements = async () => {
  const response = await fetch(" http://localhost:3000/elements");
  const data = await response.json();
  await render(data);
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
  let randomElement = elements.find((element) => element.id === random);
  randomElement.style = "transform: scale(1.3)";
  await elements.map((e) => {
    if (e.status === "notChoosed") {
      var newPick = document.createElement("div");
      newPick.classList.add("scale-50");
      newPick.classList.add("w-48");
      newPick.classList.add("nodeChildrenSpinner");

      newPick.innerHTML = `
            <div class=" w-48 rounded-lg px-4 h-96 scale-50 text-base  shadow-sm p-3 ${
              e.id == random ? "bg-red-600 text-white h-52 -mt-2" : "bg-white"
            } ${e.status != "notChoosed" ? "bg-gray-200" : ""}" id="id_${
        e.id
      }" >
            <h3 class="text-2xl font-semibold items-baseline whitespace-nowrap">${
              e.fullName
            }</h3>
            <p>${e.subject}</p>
            ${
              e.status != "notChoosed"
                ? '<hr class="border-white"/><p class="text-black mt-2">' +
                  e.date +
                  "</p>"
                : ""
            }
            </div>
            `;
      document.getElementById("spinnerWinner").innerHTML =
        randomElement.fullName;
      document.getElementById("spinnerWinnerId").value = randomElement.id;
      picker.appendChild(newPick);
    }
  });
  scrollToElement(randomElement.id);
};

const scrollToElement = (id) => {
  let childrenPos = document.getElementById("id_" + id).offsetLeft;
  let parentPos = document.getElementById("picker").offsetLeft;

  picker.scrollTo({
    left: childrenPos - parentPos - 150,
    behavior: "smooth",
  });
};

picker.addEventListener("scroll", () => {
  let nodeChildren = document.querySelectorAll("nodeChildrenSpinner");
  var audio = new Audio("./slide-sound-effect.mp3");
  nodeChildren.forEach((e) => {
    if (e.offsetLeft < picker.scrollLeft + picker.clientWidth) {
      //scale
      audio.play();
      e.style.transform = `scale(0.2)`;
      e.style.transition = `transform 0.5s`;
    } else {
      //scale
      e.style.transform = `scale(0.9)`;
      e.style.transition = `transform 0.5s`;
    }
  });
});

//onclick rendomize
var elements = fetchElements();

//add event listener to randomize button
const randomizeButton = document.querySelector("#btnSpinner");
randomizeButton.addEventListener("click", fetchElements);

fetchElements();
document.querySelector("#btnAdd").addEventListener("click", fetchElements);
