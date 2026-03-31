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
    },
     {
        id: 4,
        name: "The Witcher 3: Wild Hunt",
        genre: "rpg",
        description: "Фэнтезийная RPG с открытым миром, где вы играете за ведьмака Геральта.",
        image: "images/witcher3.jpg"
    },
    {
        id: 5,
        name: "Cyberpunk 2077",
        genre: "rpg",
        description: "RPG в мире будущего, где технологии и киберпанк переплетаются.",
        image: "images/cyberpunk.jpg"
    },
    {
        id: 6,
        name: "Half-Life 2",
        genre: "shooter",
        description: "Классический шутер от первого лица с захватывающим сюжетом.",
        image: "images/halflife2.jpg"
    },
    {
        id: 7,
        name: "Stardew Valley",
        genre: "simulator",
        description: "Симулятор фермы с элементами RPG и социальной жизни.",
        image: "images/stardew.jpg"
    },
    {
        id: 8,
        name: "Dark Souls III",
        genre: "action",
        description: "Экшен с высоким уровнем сложности и мрачной атмосферой.",
        image: "images/darksouls3.jpg"
    },
    {
        id: 9,
        name: "Portal 2",
        genre: "puzzle",
        description: "Головоломка от первого лица с юмором и уникальным геймплеем.",
        image: "images/portal2.jpg"
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