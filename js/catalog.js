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

// Переменные текущих фильтров
let currentGenre = "all";
let currentSearch = "";

// Функция отрисовки с учётом фильтров
function renderFilteredCatalog() {
    const catalogDiv = document.getElementById("catalog");
    if (!catalogDiv) return;

    // Фильтруем товары
    let filteredItems = items.filter(item => {
        // Фильтр по жанру
        if (currentGenre !== "all" && item.genre !== currentGenre) return false;

        // Фильтр по поисковому запросу (по названию)
        if (currentSearch.trim() !== "") {
            const searchLower = currentSearch.toLowerCase();
            const nameMatch = item.name.toLowerCase().includes(searchLower);
            // Если нужно искать ещё и по описанию, раскомментируй следующую строку
            // const descMatch = item.description.toLowerCase().includes(searchLower);
            // if (!nameMatch && !descMatch) return false;
            if (!nameMatch) return false;
        }

        return true;
    });

    // Если ничего не найдено
    if (filteredItems.length === 0) {
        catalogDiv.innerHTML = "<p class='no-results'>Ничего не найдено. Попробуйте другой жанр или название.</p>";
        return;
    }

    // Генерируем HTML карточек
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

// Обработчики событий
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const genreButtons = document.querySelectorAll(".genre-buttons button");

    // Начальный рендеринг
    renderFilteredCatalog();

    // Клики по кнопкам жанров
    genreButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Убираем активный класс у всех
            genreButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Обновляем текущий жанр
            currentGenre = btn.getAttribute("data-genre");

            // Перерисовываем каталог (поисковый запрос остаётся прежним)
            renderFilteredCatalog();
        });
    });

    // Ввод текста в поле поиска
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value;

            // Показываем или скрываем кнопку очистки
            if (clearBtn) {
                clearBtn.style.display = currentSearch ? "inline-block" : "none";
            }

            // Перерисовываем каталог (жанр остаётся прежним)
            renderFilteredCatalog();
        });
    }

    // Очистка поиска
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                currentSearch = "";
                clearBtn.style.display = "none";
                renderFilteredCatalog();
            }
        });
    }
});