"use strict";

import "./styles.css";
import { getBookDetailsContent } from "./book";
import { getHomeContent } from "./home/home";

// const renderBooksInCategories = (books) => {
//   const bookContainer1 = document.querySelector(".all-books");

//   let html = `
//       <div class="genre-title">
//         <h2 >${books.name.toUpperCase()}</h2>
//       </div>
//       <div class="book-container">`;
//   books.works.forEach((works) => {
//     html += `<div class="book">
//               <img class="img" src="https://covers.openlibrary.org/b/OLID/${works.cover_edition_key}-M.jpg"/>
//               <p class="text-display">${works.title} by ${works.authors[0].name}</p>
//             </div>`;
//   });
//   html += `</div>`;
//   bookContainer1.insertAdjacentHTML("beforeend", html);
// };

const getRouteView = (path) => {
  if (path === "/") {
    return getHomeContent;
  }
  if (path.includes("/works/")) {
    return getBookDetailsContent;
  }
};

const renderView = async (path) => {
  const view = getRouteView(path); // view = a function that when called it returns the content of the requested page (as a node element)
  const contentElement = await view(path); // view() = a promise to return a node element
  const appElement = document.getElementById("app");
  appElement.innerHTML = "";
  appElement.appendChild(contentElement);
};

renderView(window.location.pathname); // is called on first load

window.navigateTo = (event, path) => {
  event.preventDefault(); // Prevents default anchor behaviour
  history.pushState(null, null, path); // Updates the URL
  renderView(path); // Renders the new View
};
