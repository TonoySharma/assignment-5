let allCards = [];

const loadCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      allCards = json.data;
      displayCards(allCards);
    });
};

const displayCards = (cards) => {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  if (!cards || cards.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-500'>No issues found</p>";
    return;
  }

  cards.forEach(card => {
  colour ="";
  if(card.status==="open"){
    colour="border-t-4 border-green-600"
  }else if(card.status==="closed"){
   colour="border-t-4 border-purple-800"
  }

    const div = document.createElement("div");

    div.className = `bg-white p-5 shadow-md rounded-xl  ${colour} space-y-4 hover:shadow-xl transition mb-5`;
    div.addEventListener("click", () => {
    my_modal_5.showModal();
    loadSingleIssue(card.id);
  });

    div.innerHTML = `
      <div  class="flex justify-between items-center">
        <img src="./assets/Open-Status.png" alt="" class="w-8">
        <p class="bg-[#FEECEC] py-1 px-6 rounded-full text-red-500 font-semibold text-sm">
          ${card.priority || "Medium"}
        </p>
      </div>

      <div class="space-y-1">
        <h1 class="font-bold text-lg">${card.title}</h1>
        <p class="text-[#64748B] text-sm">${card.description}</p>
      </div>

      <div class="flex gap-3">
        <p class="bg-[#FEECEC] border text-[#EF4444] py-1 px-4 rounded-full font-semibold text-sm">
          <i class="fa-solid fa-bug"></i> ${card.type || "Issue"}
        </p>
      </div>

      <hr class="border-[#E4E4E7]">

      <div class="text-sm text-[#64748B]">
        <h2>#${card.id} by ${card.author || "anonymous"}</h2>
        <h2>${card.date || ""}</h2>
      </div>
    `;

    container.appendChild(div);
  });
};
// modal issues
const loadSingleIssue = async(id) => {
  const url=(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
//   console.log(url)
  const res=await fetch (url);
  const details = await res.json();
  displayStatusDetails (details.data);
}
const displayStatusDetails = (status)=>{
console.log(status);
}


// Search Input
const searchIssues = () => {
  const searchText = document.getElementById("searchInput").value.trim();

  if (searchText === "") {
    displayCards(allCards);
    return;
  }

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
    .then(res => res.json())
    .then(json => displayCards(json.data))
    .catch(err => console.error(err));
};

// FILTER (with search + filter)
const filterCards = (status) => {
  let filtered = allCards;

  if (status !== "all") {
    filtered = filtered.filter(card => card.status === status);
  }

  displayCards(filtered);
};

// ACTIVE BUTTON STYLE
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');

function toggleStyles(id) {

  [allFilterBtn, openFilterBtn, closedFilterBtn].forEach(btn => {
    btn.classList.remove('bg-blue-800', 'text-white');
    btn.classList.add('bg-gray-200', 'text-black');
  });

  const selected = document.getElementById(id);
  selected.classList.remove('bg-gray-200', 'text-black');
  selected.classList.add('bg-blue-800', 'text-white');
}

loadCards();