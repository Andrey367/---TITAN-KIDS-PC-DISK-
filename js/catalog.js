// Массив товаров
const items = [
    {
        id: 1,
        name: "Властелин колец",
        genre: "fantasy",
        description: "Эпическая фэнтези-сага",
        image: "images/lotr.jpg"
    },
    {
        id: 2,
        name: "Шерлок Холмс",
        genre: "detective",
        description: "Знаменитый детектив",
        image: "images/sherlock.jpg"
    },
    {
        id: 3,
        name: "Дюна",
        genre: "sci-fi",
        description: "Научная фантастика",
        image: "images/dune.jpg"
    }
];

// Функция отрисовки карточек
function renderCatalog(genre = "all") {
    const catalogDiv = document.getElementById("catalog");
    if (!catalogDiv) return;

    let filteredItems = items;
    if (genre !== "all") {
        filteredItems = items.filter(item => item.genre === genre);
    }

    if (filteredItems.length === 0) {
        catalogDiv.innerHTML = "<p>Нет товаров в этом жанре.</p>";
        return;
    }

    let html = "";
    filteredItems.forEach(item => {
        html += `
            <div class="card">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
    catalogDiv.innerHTML = html;
}

// Обработка кликов по кнопкам жанров
document.addEventListener("DOMContentLoaded", () => {
    renderCatalog("all");

    const buttons = document.querySelectorAll(".genre-buttons button");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Убираем активный класс у всех
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const genre = btn.getAttribute("data-genre");
            renderCatalog(genre);
        });
    });
});