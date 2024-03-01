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
  if(isShowAll){
    seeMoreBtn.classList.add('hidden');
  }else{
    seeMoreBtn.classList.remove('hidden');
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
              <li>Natural language processing</li>
              <li>Contextual understanding</li>
              <li>Text generation</li>
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
            <button
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

// see-more btn
document.getElementById("see-more").addEventListener("click", () => {
  handleShowAll(true);
});
function handleShowAll(isShowAll) {
  loadData(isShowAll);
}

loadData();
