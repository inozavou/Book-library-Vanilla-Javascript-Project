export const getBookInfo = async (key) => {
  try {
    const response = await fetch(`https://openlibrary.org${key}.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const bookInfo = await response.json();

    return bookInfo;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getBookDetailsContent = async (key, authorName, genre) => {
  const bookInfo = await getBookInfo(key);

  const description = bookInfo.description?.value || bookInfo.description;

  console.log(bookInfo);

  const bookDetailsElement = document.createElement("div");
  bookDetailsElement.className = "details-section";

  let bookHtml = `<div class = "book-card">
                  <div class="detail-book-thumbnail-section">
                    <img class="detail-book-cover" src="https://covers.openlibrary.org/b/id/${
                      bookInfo.covers[0]
                    }-M.jpg"/>
                    <button id="read-btn">Read</button>
                    <button id="rate-btn">Rate</button>
                  </div>

                  <div class="book-details">
                    <h1>${bookInfo.title}</h1>
                    <h3 class="italic">${bookInfo.subjects[1]}</h3>
                    <div class="bottom-book-details">
                      <p>Author : ${authorName}</p>
                      ${
                        bookInfo.first_publish_date
                          ? `<p>Published in : ${bookInfo.first_publish_date}</p>`
                          : ""
                      }
                      <p>Genre : ${genre}</p>
                                            ${
                                              description
                                                ? `<p class="book-description">${description}</p>`
                                                : ""
                                            }
                    </div>`;
  ``;
  bookDetailsElement.innerHTML = bookHtml;
  return bookDetailsElement;
  // addEventListener("click", () => {});
};
