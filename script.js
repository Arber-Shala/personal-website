// script.js
// Handles the bottom navigation: highlights the current page link,
// and gives every link a single place to control where it points.
 
document.addEventListener("DOMContentLoaded", () => {
  // Map each nav item to the page it should eventually link to.
  // Update these paths as the real pages get built.
  const routes = {
    about: "about.html",
    projects: "projects.html",
    experience: "skills.html",
    contact: "contact.html",
  };
 
  const navLinks = document.querySelectorAll(".nav-link");
 
  navLinks.forEach((link) => {
    const page = link.dataset.page;
 
    // Keep the href in sync with the routes map above.
    if (routes[page]) {
      link.setAttribute("href", routes[page]);
    }
 
    // Mark the link as active if its page matches the current file.
    const currentFile = window.location.pathname.split("/").pop();
    if (currentFile === routes[page]) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
});
