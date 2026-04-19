const body = document.body;
const year = document.getElementById("year");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

const stockGrid = document.getElementById("stock-grid");
const stockCards = Array.from(document.querySelectorAll(".stock-card"));
const stockCount = document.getElementById("stock-count");
const stockSearch = document.getElementById("stock-search");
const brandFilter = document.getElementById("brand-filter");
const typeFilter = document.getElementById("type-filter");
const budgetFilter = document.getElementById("budget-filter");
const budgetOutput = document.getElementById("budget-output");
const sortFilter = document.getElementById("sort-filter");
const resetFilters = document.getElementById("reset-filters");

const searchBudget = document.getElementById("search-budget");
const searchBudgetOutput = document.getElementById("search-budget-output");
const searchForm = document.getElementById("search-form");
const formNext = document.getElementById("form-next");
const formUrl = document.getElementById("form-url");

const formatEuros = (value) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u00a0/g, " ");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    body.classList.toggle("nav-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    });
  });
}

const syncHeader = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const updateBudgetOutput = () => {
  if (!budgetFilter || !budgetOutput) return;
  budgetOutput.textContent = formatEuros(Number(budgetFilter.value));
};

const applyStockFilters = () => {
  if (!stockGrid || !stockCount) return;

  const searchTerm = (stockSearch?.value || "").trim().toLowerCase();
  const selectedBrand = brandFilter?.value || "all";
  const selectedType = typeFilter?.value || "all";
  const maxBudget = Number(budgetFilter?.value || "25000");
  const sortValue = sortFilter?.value || "year-desc";

  const filtered = stockCards.filter((card) => {
    const matchesSearch = card.dataset.search?.includes(searchTerm) ?? true;
    const matchesBrand = selectedBrand === "all" || card.dataset.brand === selectedBrand;
    const matchesType = selectedType === "all" || card.dataset.type === selectedType;
    const matchesBudget = Number(card.dataset.price) <= maxBudget;

    const isVisible = matchesSearch && matchesBrand && matchesType && matchesBudget;
    card.hidden = !isVisible;
    return isVisible;
  });

  filtered.sort((a, b) => {
    const priceA = Number(a.dataset.price);
    const priceB = Number(b.dataset.price);
    const yearA = Number(a.dataset.year);
    const yearB = Number(b.dataset.year);

    if (sortValue === "price-asc") return priceA - priceB;
    if (sortValue === "price-desc") return priceB - priceA;
    if (sortValue === "year-asc") return yearA - yearB;
    return yearB - yearA;
  });

  filtered.forEach((card) => stockGrid.appendChild(card));
  stockCount.textContent = String(filtered.length);
};

const resetStockFilters = () => {
  if (stockSearch) stockSearch.value = "";
  if (brandFilter) brandFilter.value = "all";
  if (typeFilter) typeFilter.value = "all";
  if (budgetFilter) budgetFilter.value = "25000";
  if (sortFilter) sortFilter.value = "year-desc";

  updateBudgetOutput();
  applyStockFilters();
};

[stockSearch, brandFilter, typeFilter, budgetFilter, sortFilter].forEach((field) => {
  if (!field) return;
  field.addEventListener("input", () => {
    updateBudgetOutput();
    applyStockFilters();
  });
  field.addEventListener("change", () => {
    updateBudgetOutput();
    applyStockFilters();
  });
});

if (resetFilters) {
  resetFilters.addEventListener("click", resetStockFilters);
}

updateBudgetOutput();
applyStockFilters();

const updateSearchBudget = () => {
  if (!searchBudget || !searchBudgetOutput) return;
  searchBudgetOutput.textContent = formatEuros(Number(searchBudget.value));
};

if (searchBudget) {
  searchBudget.addEventListener("input", updateSearchBudget);
  updateSearchBudget();
}

if (searchForm) {
  const origin = window.location.origin;

  if (formNext) {
    formNext.value = `${origin}/merci.html`;
  }

  if (formUrl) {
    formUrl.value = window.location.href;
  }
}
