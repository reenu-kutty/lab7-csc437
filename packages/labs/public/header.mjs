import {toHtmlElement} from "./toHtmlElement.mjs";
import {attachShadow, toHtml} from "./utils.mjs";

const toHTMLChunk = toHtml(`<header id="my-header">
    <h1>Reenu Kutty</h1>
    <div id="link-holder">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="places.html">Places I've been</a>
    </div>
    <label>
        <input id="dark-mode-checkbox" type="checkbox" autocomplete="off" />
        Dark mode
    </label>
    <button class="menu-btn">Menu</button>
    </header>`
)

class YourElementName extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
    }

    connectedCallback() {
        const menuButton = this.shadowRoot.querySelector(".menu-btn");
        const linkHolder = this.shadowRoot.querySelector("#link-holder");
        const header = this.shadowRoot.querySelector("#my-header");
        const darkModeCheckbox = this.shadowRoot.querySelector("#dark-mode-checkbox");


        menuButton.addEventListener("click", () => {
            linkHolder.classList.toggle("open");
            header.classList.toggle("open");

        });

        document.addEventListener("click", (event) => {
            const headerElement = this;

            if (!headerElement.contains(event.target)) {
                linkHolder.classList.remove("open");
                header.classList.remove("open");
            }
        });

        const currentPage = window.location.pathname.split("/").pop();
        console.log(currentPage);

        const links = this.shadowRoot.querySelectorAll(".nav-link");

        links.forEach((link) => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
                console.log("Active link:", link.getAttribute("href"));
            }
        });

        const savedDarkMode = localStorage.getItem("dark-mode") === "true";

        if (savedDarkMode) {
            document.body.classList.add("dark-mode");
            darkModeCheckbox.checked = true;
        }

        darkModeCheckbox.addEventListener("change", (event) => {
            const isDarkMode = event.target.checked;
            document.body.classList.toggle("dark-mode", isDarkMode);
            localStorage.setItem("dark-mode", isDarkMode);
        });
    }
}

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `<style>
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
        gap: 2vw;
        background-color: var(--color-header);
        color: var(--color-heading-text);
        margin-bottom: 5vw;
    } 
    #link-holder {
      display: flex;
      flex-direction: row;
      gap: 2vw;
      align-items: center;
      margin-top: 5vh;
      margin-left: 2vw;
      margin-bottom: 8vh;
    }
    label {
    
    }
    header.open {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .nav-link.active {
        color: var(--color-current);
        font-weight: bold;
    }
    .nav-link {
        color: var(--color-heading);
    }
    h1 {
        font-family: Noto Serif, serif;
        margin-left: 2vw;
    }
    #link-holder.open {
      display: flex;
      flex-direction: column;
      
        align-items: flex-start;
      gap: 2vw;
      margin-left: 3vw;
      margin-bottom: 8vh;
    }
    @media (max-width: 768px) {
      .menu-btn {
        display: block;
        position: absolute;
        right: 20px;
        top: 10%;
        background-color: #444;
        color: white;
        border: none;
        padding: 10px 15px;
        font-size: 16px;
        cursor: pointer;
      }
      #link-holder {
      display: none;
      }
    }
    @media (min-width: 769px) {
      .menu-btn {
        display: none;
      }
    }
</style>`;
TEMPLATE.content.appendChild(toHTMLChunk);

customElements.define("reenu-header", YourElementName);