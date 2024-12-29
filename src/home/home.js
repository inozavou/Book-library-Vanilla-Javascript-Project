import "./home.css";

const carousel = (genre, genreInfo) => {
  const getGenreBooks = () => {
    const bookListHtml = genreInfo.works.reduce((accumulator, work) => {
      const bookHtml = `<a class="carousel-book" href="${work.key}" onclick="navigateTo(event,${work.key})">
                      <img class="book-cover" src="https://covers.openlibrary.org/b/OLID/${work.cover_edition_key}-M.jpg"/>
                      <p class="text-title">${work.title}</p>
                      </a>`;

      return accumulator + bookHtml;
    }, "");
    return bookListHtml;
  };

  const genreCarouselHtml = `<h2 id="genre-title">${genre.toUpperCase()}</h2>
                             <button class="arrow arrow-left" id ="${genre}-left">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                              </button>
                              <div class="carousel-container">
                                <div class="${genre}-carousel-wrapper">${getGenreBooks()}</div>
                              </div>
                              <button class="arrow arrow-right" id ="${genre}-right">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                              </button>
                              `;

  const carouselElement = document.createElement("div");
  carouselElement.className = "genre";
  carouselElement.id = genre;
  carouselElement.innerHTML = genreCarouselHtml;

  const carouselWrapper = carouselElement.querySelector(
    `.${genre}-carousel-wrapper`
  );

  const currentIndices = {
    fantasy: 0, // For carousel ${genre}-left-btn
    romance: 0, // For carousel 2
    classic: 0,
  };

  const totalBooks = genreInfo.works.length;
  const visibleBooks = 4;
  const maxIndex = totalBooks - visibleBooks;

  const btnLeftArrow = carouselElement.querySelector(`#${genre}-left`);
  const btnRightArrow = carouselElement.querySelector(`#${genre}-right`);

  const updateCarousel = () => {
    const currentIndex = currentIndices[genre];
    carouselWrapper.style.transform = `translateX(-${
      currentIndex * (100 / visibleBooks)
    }%)`;
  };

  btnLeftArrow.addEventListener("click", () => {
    if (currentIndices[genre] > 0) {
      currentIndices[genre]--;
    } else {
      currentIndices[genre] = maxIndex;
    }
    updateCarousel();
  });

  btnRightArrow.addEventListener("click", () => {
    if (currentIndices[genre] < maxIndex) {
      currentIndices[genre]++;
    } else {
      currentIndices[genre] = 0;
    }
    updateCarousel();
  });

  return carouselElement;
};

const createGenreCarousel = async (genre) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${genre}.json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const genreInfo = await response.json();

    return carousel(genre, genreInfo);

    // renderBooksInCategories(genreInfo);
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getHomeContent = async () => {
  const booksContainer = document.createElement("div");
  booksContainer.className = "books-container";
  const genres = ["fantasy", "romance", "classic"];

  for (const genre of genres) {
    const genreCarouselElement = await createGenreCarousel(genre);
    booksContainer.appendChild(genreCarouselElement);
  }
  return booksContainer;
};
