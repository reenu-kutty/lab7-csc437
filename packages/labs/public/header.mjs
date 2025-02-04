import {toHtmlElement} from "./toHtmlElement.mjs";

const divWithStuff = toHtmlElement(`<header>
    <h1>Reenu Kutty</h1>
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="places.html">Places I've been</a>
</header>`)

window.addEventListener("load", () => {
    document.getElementById('myhead').append(divWithStuff);

    const currentPage = window.location.pathname.split("/").pop();
    console.log(currentPage);
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
            console.log(link.getAttribute("href"));
        }
    });
});
