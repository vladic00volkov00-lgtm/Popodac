/* ⚙️ Popodanec v0.0.1 — базовая логика игры */

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const sections = {
    home: `
      <h2>🏠 Главная</h2>
      <p>Добро пожаловать в Popodanec! Здесь ты можешь развиваться, добывать ресурсы и прокачивать навыки.</p>
    `,
    fishing: `
      <h2>🎣 Рыбалка</h2>
      <p>Ты находишься у пруда. Нажми кнопку, чтобы закинуть удочку!</p>
      <button id="fishBtn">Закинуть удочку</button>
      <p id="fishResult"></p>
    `,
    woodcutting: `
      <h2>🌲 Лесорубка</h2>
      <p>Перед тобой несколько деревьев. Руби, чтобы добыть древесину!</p>
      <button id="woodBtn">Рубить дерево</button>
      <p id="woodResult"></p>
    `,
    mining: `
      <h2>⛏️ Шахта</h2>
      <p>Ты в шахте. Попробуй добыть немного руды!</p>
      <button id="mineBtn">Добыть руду</button>
      <p id="mineResult"></p>
    `,
    inventory: `
      <h2>🎒 Инвентарь</h2>
      <ul id="inventoryList"></ul>
    `
  };

  const nav = document.createElement("nav");
  const buttons = [
    { id: "home", label: "Главная" },
    { id: "fishing", label: "Рыбалка" },
    { id: "woodcutting", label: "Лесорубка" },
    { id: "mining", label: "Шахта" },
    { id: "inventory", label: "Инвентарь" },
  ];

  buttons.forEach(b => {
    const btn = document.createElement("button");
    btn.textContent = b.label;
    btn.id = b.id;
    btn.onclick = () => showSection(b.id);
    nav.appendChild(btn);
  });

  const content = document.createElement("section");
  app.appendChild(nav);
  app.appendChild(content);

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  function showSection(id) {
    content.innerHTML = sections[id];
    document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if (id === "fishing") setupFishing();
    if (id === "woodcutting") setupWoodcutting();
    if (id === "mining") setupMining();
    if (id === "inventory") renderInventory();
  }

  function addToInventory(item) {
    inventory.push(item);
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }

  function renderInventory() {
    const list = document.getElementById("inventoryList");
    list.innerHTML = inventory.map(i => `<li>${i}</li>`).join("");
  }

  function setupFishing() {
    const btn = document.getElementById("fishBtn");
    const result = document.getElementById("fishResult");
    btn.onclick = () => {
      const fish = ["карась", "окунь", "щука", "сом"];
      const caught = fish[Math.floor(Math.random() * fish.length)];
      result.textContent = `Ты поймал: ${caught}!`;
      addToInventory(caught);
    };
  }

  function setupWoodcutting() {
    const btn = document.getElementById("woodBtn");
    const result = document.getElementById("woodResult");
    btn.onclick = () => {
      result.textContent = "Ты срубил дерево и получил древесину!";
      addToInventory("древесина");
    };
  }

  function setupMining() {
    const btn = document.getElementById("mineBtn");
    const result = document.getElementById("mineResult");
    btn.onclick = () => {
      const ores = ["железная руда", "медная руда", "уголь"];
      const found = ores[Math.floor(Math.random() * ores.length)];
      result.textContent = `Ты добыл: ${found}!`;
      addToInventory(found);
    };
  }

  showSection("home");
});
