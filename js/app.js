const cardContainer = document.getElementById("card-container");
const seeMoreBtn = document.getElementById("see-more");
const loadData = async (isShowAll) => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await res.json();
    const details = data.data.tools;
    fetchData(details, isShowAll);
  } catch (err) {
    console.log("something happened", err);
  }
};

//fetching data
const fetchData = (cards, isShowAll) => {
  cardContainer.textContent = "";
  if (isShowAll) {
    seeMoreBtn.classList.add("hidden");
  } else {
    seeMoreBtn.classList.remove("hidden");
  }
  if (!isShowAll) {
    cards = cards.slice(0, 6);
  }
  cards.forEach((card) => {
    cardContainer.innerHTML += `
    <div
          class="border text-card-foreground w-full bg-white rounded-lg shadow-md overflow-hidden"
          data-v0-t="card"
        >
          <div class="bg-[#fff] p-4 flex justify-between items-center">
          <img class='h-[45%]' src="${
            card.image ? card.image : "./images/jasper-chat.jpg"
          }" alt="" />

          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900">Features</h3>
            <ul class="list-decimal list-inside mt-4 text-gray-700">
              <li>${card.features[0]}</li>
              <li>${card.features[1]}</li>
              <li>${card.features[2]}</li>
            </ul>
          </div>
          <div class="flex items-center justify-between py-5 px-3">
            <div class="flex flex-col items-center">
            <div>
            <h3 class="text-xl ml-3 mb-2 font-semibold text-gray-900">${
              card.name
            }</h3>
            </div>
              <div class="flex gap-3">
              <span class="text-sm text-gray-700">11/01/2022</span>
              </div>
            </div>
            <button id="showDetails" onclick="handleShowDetails(${card.id})"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#dd4b4b] hover:text-white h-10 px-4 py-2 text-[#dd4b4b]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
    `;
  });
};

//handle showDetails for every AI
function padWithZero(id) {
  return id < 10 ? "0" + id : id;
}
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${padWithZero(id)}`
  );
  const data = await res.json();
  const finalData = data.data;
  showDetails(finalData);
};
// show details function
const showDetails = (data) => {
  const detailsPopup = document.getElementById("details-popup");
  detailsPopup.classList.remove("hidden");
  detailsPopup.innerHTML = `
  <div
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
          class="flex w-[90%] md:w-[70%] h-[90%] lg:h-[75%] flex-col lg:flex-row justify-between items-start bg-white p-10 rounded-lg"
        >
          <button
            id="close-modal"
            class="relative left-[100%] -mt-14 hover:bg-red-700 transition-all duration-300 bg-red-600 p-2 rounded-full"
          >
            <img src="./images/Frame.svg" alt="" />
          </button>
          <div class="max-w-md">
            <h2 class="lg:text-2xl text-[18px] font-bold mb-4">
              ${data.description}
            </h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-between mb-6">
              <button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[#f3f4f6] text-[#1f2937] py-2 px-2 rounded-md"
              >
                ${data.pricing[0].price}${data.pricing[0].plan}
              </button>
              <button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[#f3f4f6] text-[#1f2937] py-2 px-2 rounded-md"
              >
              ${data.pricing[1].price}${data.pricing[1].plan}
              </button>
              <button
                class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-[#f3f4f6] text-[#1f2937] py-2 px-2 rounded-md"
              >
              ${data.pricing[2].price}/ ${data.pricing[2].plan}
              </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-semibold">Features</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li>${data.features[1].feature_name}</li>
                  <li>${data.features[2].feature_name}</li>
                  <li>${data.features[3].feature_name}</li>
                </ul>
              </div>
              <div>
                <h3 class="font-semibold">Integrations</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li>${data.integrations[0]}</li>
                  <li>${data.integrations[1]}</li>
                  <li>${data.integrations[2]}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="max-w-sm mx-auto my-2 px-6 bg-white rounded-lg overflow-auto">
            <div class="p-4 bg-[#fbfafa] rounded-lg">
              <img
                src="${data.image_link[0]}"
                alt=""
                class="w-full h-full mx-auto rounded-xl mb-4"
                style="object-fit: cover"
              />
            </div>
            <div class="px-6 bg-[#ffff] rounded-lg mb-4">
              <h3 class="text-center text-lg font-semibold mb-2">
                ${data.input_output_examples[0].input}
              </h3>
              <p class="text-center text-sm">
              ${data.input_output_examples[0].output}
              </p>
            </div>
          </div>
        </div>
        </div>
  `;
  document.getElementById("close-modal").addEventListener("click", () => {
    detailsPopup.classList.add("hidden");
  });
};

// see-more btn
document.getElementById("see-more").addEventListener("click", () => {
  handleShowAll(true);
});
function handleShowAll(isShowAll) {
  loadData(isShowAll);
}

loadData();
