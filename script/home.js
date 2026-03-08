let allCards = [];

const loadCards = () => {
  loadingSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      allCards = json.data;
      displayCards(allCards);
      loadingSpinner(false);
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
    colour ="border-t-4 border-green-600"
  }else if(card.status==="closed"){
   colour ="border-t-4 border-purple-800"
  }

    const div = document.createElement("div");

    div.className = `bg-white p-5 shadow-md rounded-xl  ${colour} space-y-4 hover:shadow-xl transition mb-5`;
    div.addEventListener("click", () => {
    my_modal_5.showModal();
    loadSingleIssue(card.id);
  });

    div.innerHTML = `
      <div  class="flex justify-between items-center">
        <img src="${card.status==='open'? './assets/Open-Status.png':'./assets/Closed-Status.png'}" alt="" class="w-8">
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

// loading container
const loadingSpinner =(isLoading)=>{
  if(isLoading == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  }else{
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}
// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

// modal issues
const loadSingleIssue = async(id) => {
  
  const url=(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
//   console.log(url)
  const res=await fetch (url);
  const details = await res.json();
  displayStatusDetails (details.data);
}
const displayStatusDetails = (status)=>{
  
// console.log(status);
const detailsBox = document.getElementById("details-container");
detailsBox.innerHTML=`
 <div class="border rounded-xl border-gray-300">
  <div class="p-4">
       <h1 class="font-bold text-3xl pb-3">${status.title}</h1>
    <div class="flex gap-2 items-center pb-5">
       <p class="bg-[#00A96E] text-white rounded-full p-1 px-2">${status.status}</p>
       <p class="text-[#64748B]">. Opened by Fahim Ahmed</p>
       <p class="text-[#64748B]">.${status.createdAt}</p>
    </div>
     <div class="flex gap-3">
      <p class="bg-[#FEECEC] border text-[#EF4444] py-1 px-4 rounded-full font-semibold text-sm">
        <i class="fa-solid fa-bug"></i>${status.labels}</p>

      <p class="bg-[#FFF8DB] border text-[#D97706] py-1 px-4 rounded-full font-semibold text-sm">
        <i class="fa-regular fa-life-ring"></i> Help Wanted </p>
    </div>
      <p class="text-[#64748B] mt-5">${status.description}</p>

     <div class="mt-8 flex gap-30 bg-[#d0e5fa50] p-3 rounded-xl">
     <div>
      <p class="text-[#64748B]">Assignee:</p>
      <h2 class="font-semibold text-2xl">${status.assignee}</h2>
     </div>

       <div>
         <p class="text-[#64748B] mb-1">${status.author}</p>
         <p class="bg-red-600 rounded-full text-white  px-4 font-semibold">${status.priority}</p>
      </div>
  </div>
 </div>

`;
document.getElementById("my_modal_5").showModal();
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