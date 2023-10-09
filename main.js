const allNavsHead = document.querySelectorAll(".nav-head-single");
const allNavsBody = document.querySelectorAll(".nav-body-single");
const searchForm = document.querySelector(".app-header-search");
let searchList = document.getElementById("search-list");

let activeNav = 1,
  allData;

const main = () => {
  showActiveNavBody();
  showActiveNavHead();
};

const showActiveNavHead = () =>
  allNavsBody[activeNav - 1].classList.add("active-nav");

const showActiveNavBody = () => {
  hideAllNavBody();
  allNavsBody[activeNav - 1].classList.add("show-nav");
};

const hideAllNavBody = () =>
  allNavsBody.forEach((singleNavBody) =>
    singleNavBody.classList.remove("show-nav")
  );
const hideAllNavHead = () =>
  allNavsHead.forEach((singleNavHead) =>
    singleNavHead.classList.remove("active-nav")
  );

main();

// button event listeners
allNavsHead.forEach((singleNavHead) => {
  singleNavHead.addEventListener("click", () => {
    hideAllNavHead();
    activeNav = singleNavHead.dataset.id;
    showActiveNavHead();
    showActiveNavBody();
  });
});

const getInputValue = (event) => {
  event.preventDefault();
  let searchText = searchForm.search.value;
  fetchAllSuperHero(searchText);
};

// search form submission
searchForm.addEventListener("submit", getInputValue);

// api key => 7526865600681411

const apiKey = 7526865600681411;
const fetchAllSuperHero = async (searchText) => {
  let url = `https://www.superheroapi.com/api.php/${apiKey}/search/${searchText}`;
  {
    const response = await fetch(url);
    allData = await response.json();

    showSearchList(allData.results);
  }
};

const showSearchList = (data) => {
  searchList.innerHTML = "";
  data.forEach((dataItem) => {
    const divElem = document.createElement("div");
    divElem.classList.add("search-list-item");
    divElem.innerHTML = `
            <img src = "${dataItem.image.url}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
    searchList.appendChild(divElem);
  });
};

searchForm.search.addEventListener("keyup", () => {
  if (searchForm.search.value.length > 1) {
    fetchAllSuperHero(searchForm.search.value);
  } else {
    searchList.innerHTML = "";
  }
});

searchList.addEventListener("click", (event) => {
  let searchId = event.target.dataset.id;
  let singleData = allData.results.filter((singleData) => {
    return searchId === singleData.id;
  });
  showSuperheroDetails(singleData);
  searchList.innerHTML = "";
});

const showSuperheroDetails = (data) => {
  console.log(data);
  document.querySelector(".app-body-content-image").innerHTML = `
        <img src = "${data[0].image.url}">
    `;

  document.querySelector(".name").textContent = data[0].name;

  document.querySelector(".powerstats").innerHTML = `
    <li>
        <div>
        <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
        <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
        <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
        <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
        <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
         <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `;

  document.querySelector(".biography").innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography["full-name"]}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography["alter-egos"]}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography["aliases"]}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography["place-of-birth"]}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography["first-appearance"]}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography["publisher"]}</span>
    </li>
    `;

  document.querySelector(".appearance").innerHTML = `
    <li>
        <span>
            gender
        </span>
        <span>${data[0].appearance["gender"]}</span>
    </li>
    <li>
        <span>
            race
        </span>
        <span>${data[0].appearance["race"]}</span>
    </li>
    <li>
        <span>
            height
        </span>
        <span>${data[0].appearance["height"][0]}</span>
    </li>
    <li>
        <span>
            weight
        </span>
        <span>${data[0].appearance["weight"][0]}</span>
    </li>
    <li>
        <span>
            eye-color
        </span>
        <span>${data[0].appearance["eye-color"]}</span>
    </li>
    <li>
    <span>
          hair-color
    </span>
    <span>${data[0].appearance["hair-color"]}</span>
</li>
`;

  document.querySelector(".work").innerHTML = `
<li>
    <span>Occupation</span>
    <span>${data[0].work["occupation"]}</span>
</li>
<li>
    <span>base</span>
    <span>${data[0].work["base"]}</span>
</li>
`;

  document.querySelector(".connections").innerHTML = `
<li>
    <span>group-affiliation</span>
    <span>${data[0].connections["group-affiliation"]}</span>
</li>
<li>
    <span>relatives</span>
    <span>${data[0].connections["relatives"]}</span>
</li>
`;
};
