// -------------------------------------------------------------
// PARSE THE PROVIDED JSON STRINGS INTO JS ARRAYS
// -------------------------------------------------------------
const users = JSON.parse(userContent);
const stocks = JSON.parse(stockContent);

// -------------------------------------------------------------
// GLOBAL STATE
// -------------------------------------------------------------
let selectedUser = null;
let selectedStock = null;

// DOM ELEMENTS
const userListEl = document.querySelector(".user-list");
const portfolioListEl = document.querySelector(".portfolio-list");

const userID = document.getElementById("userID");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");

const logo = document.getElementById("logo");
const stockName = document.getElementById("stockName");
const stockSector = document.getElementById("stockSector");
const stockIndustry = document.getElementById("stockIndustry");
const stockAddress = document.getElementById("stockAddress");


// -------------------------------------------------------------
// 1. RENDER USER LIST
// -------------------------------------------------------------
function renderUsers() {
  userListEl.innerHTML = "";

  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `${u.user.firstname} ${u.user.lastname}`;
    li.dataset.id = u.id;

    li.addEventListener("click", () => selectUser(u.id));

    userListEl.appendChild(li);
  });
}


// -------------------------------------------------------------
// 2. SELECT USER → LOAD FORM AND PORTFOLIO
// -------------------------------------------------------------
function selectUser(id) {
  selectedUser = users.find((u) => u.id === id);
  if (!selectedUser) return;

  const u = selectedUser.user;

  userID.value = selectedUser.id;
  firstname.value = u.firstname;
  lastname.value = u.lastname;
  address.value = u.address;
  city.value = u.city;
  email.value = u.email;

  renderPortfolio(selectedUser);
}


// -------------------------------------------------------------
// 3. RENDER PORTFOLIO
// -------------------------------------------------------------
function renderPortfolio(selectedUser) {
  portfolioListEl.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  selectedUser.portfolio.forEach((p, index) => {
    const row = document.createElement("div");
    row.classList.add("portfolio-row");

    row.innerHTML = `
      <p>${p.symbol}</p>
      <p>${p.owned}</p>
      <button class="viewStock">View</button>
    `;

    row.querySelector(".viewStock").addEventListener("click", () => {
      showStockDetails(p.symbol);
    });

    portfolioListEl.appendChild(row);
  });
}


// -------------------------------------------------------------
// 4. SHOW STOCK DETAILS
// -------------------------------------------------------------
function showStockDetails(symbol) {
  selectedStock = stocks.find((s) => s.symbol === symbol);

  if (!selectedStock) {
    stockName.textContent = "Not found";
    stockSector.textContent = "";
    stockIndustry.textContent = "";
    stockAddress.textContent = "";
    logo.src = "";
    return;
  }

  logo.src = selectedStock.logo || "";
  stockName.textContent = selectedStock.name;
  stockSector.textContent = selectedStock.sector;
  stockIndustry.textContent = selectedStock.subIndustry || "";
  stockAddress.textContent = selectedStock.address || "";
}


// -------------------------------------------------------------
// 5. SAVE USER EDITS
// -------------------------------------------------------------
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  if (!selectedUser) return;

  selectedUser.user.firstname = firstname.value;
  selectedUser.user.lastname = lastname.value;
  selectedUser.user.address = address.value;
  selectedUser.user.city = city.value;
  selectedUser.user.email = email.value;

  renderUsers();
  alert("User updated!");
});


// -------------------------------------------------------------
// 6. DELETE USER
// -------------------------------------------------------------
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  if (!selectedUser) return;

  const index = users.findIndex((u) => u.id === selectedUser.id);
  if (index !== -1) users.splice(index, 1);

  selectedUser = null;

  userID.value =
    firstname.value =
    lastname.value =
    address.value =
    city.value =
    email.value =
      "";

  portfolioListEl.innerHTML = "<h3>User Deleted</h3>";

  renderUsers();
});


// -------------------------------------------------------------
// PAGE LOAD
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});
