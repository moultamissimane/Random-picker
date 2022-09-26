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
// returns a random element of the array
  random = arr[Math.floor(Math.random() * arr.length)];
  let randomElement = elements.find((element) => element.id === random);
  randomElement.style = "transform: scale(1.3)";
  await elements.map((e) => {
    if (e.status === "notChoosed") {
      var newPick = document.createElement("div");
      newPick.classList.add("w-76");
      newPick.classList.add("gap-6");
      // newPick.classList.add("nodeChildrenSpinner");
      newPick.innerHTML = `
            <div class="overflow-hidden bg-white text-black shadow-sm shadow-white w-72 rounded-xl h-64  scale-50  font-bold  ${
              e.id == random
                ? "bg-pink-400 text-white hover:-translate-y-1 border-4 border-fuschia-500 hover:scale-75 transition duration-500 hover:shadow-pink-700 hover:border-pink-700 hover:border-2 hover:shadow-md"
                : "bg-white"
            } ${e.status != "notChoosed" ? "bg-red-300" : ""}" id="id_${e.id}" >
            <h3 class="text-4xl mt-4 text-center font-bold items-baseline whitespace-nowrap">${
              e.fullName
            }</h3>
            <p class="text-3xl text-center">${e.subject}</p>
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
    left: childrenPos - parentPos - 100,
    behavior: "smooth",
  });
};

picker.addEventListener("scroll", () => {
  let nodeChildren = document.querySelectorAll("nodeChildrenSpinner");
  var audio = new Audio("/src/audios/slide-sound-effect.mp3");
  nodeChildren.forEach((e) => {
    if (e.offsetRight < picker.scrollLeft + picker.clientWidth) {
      //scale
      audio.play();
      e.style.transform = `scale(0.2)`;
      e.style.transition = `transform 1s`;
    } else {
      //scale
      e.style.transform = `scale(1)`;
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
