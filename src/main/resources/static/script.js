/* ==========================================
      Enterprise AI DevOps Platform
      Professional Version
      Part 1
========================================== */

const API_URL = "http://localhost:9091/api/project";

let editId = null;

let projects = [];

let filteredProjects = [];

let currentPage = 1;

const rowsPerPage = 5;

/* ==========================================
                Loader
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.style.display = "none";

        }

    }, 1200);

});

/* ==========================================
            Theme Toggle
========================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        themeToggle.innerHTML =
            document.body.classList.contains("dark")
                ? "☀"
                : "🌙";

    });

}

/* ==========================================
          Explore Button
========================================== */

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        document
            .getElementById("about")
            .scrollIntoView({

                behavior: "smooth"

            });

    });

}

/* ==========================================
            Hero Animation
========================================== */

const heroTitle = document.getElementById("heroTitle");

const heroTexts = [

    "Enterprise AI DevOps Platform",

    "Spring Boot + MySQL",

    "Enterprise REST API",

    "Infrastructure Automation",

    "Docker & Kubernetes",

    "AWS Cloud Deployment",

    "Jenkins CI/CD Pipeline"

];

let heroIndex = 0;

setInterval(() => {

    if (!heroTitle) return;

    heroTitle.textContent = heroTexts[heroIndex];

    heroIndex++;

    if (heroIndex >= heroTexts.length) {

        heroIndex = 0;

    }

}, 2500);

/* ==========================================
            Live Clock
========================================== */

const clock = document.createElement("div");

clock.id = "liveClock";

clock.style.position = "fixed";

clock.style.top = "20px";

clock.style.right = "20px";

clock.style.padding = "12px 18px";

clock.style.background = "rgba(0,0,0,.65)";

clock.style.color = "#00e5ff";

clock.style.borderRadius = "12px";

clock.style.fontWeight = "600";

clock.style.zIndex = "9999";

document.body.appendChild(clock);

setInterval(() => {

    clock.innerHTML = new Date().toLocaleString();

}, 1000);

/* ==========================================
          Scroll To Top
========================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topButton";

topButton.style.position = "fixed";

topButton.style.bottom = "95px";

topButton.style.right = "25px";

topButton.style.width = "55px";

topButton.style.height = "55px";

topButton.style.borderRadius = "50%";

topButton.style.display = "none";

topButton.style.zIndex = "9999";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    topButton.style.display =
        window.scrollY > 400
            ? "block"
            : "none";

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
            Card Animation
========================================== */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

/* ==========================================
      Dashboard Animation
========================================== */

document.querySelectorAll(".dashboard-card")

.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =

            "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =

            "translateY(0px) scale(1)";

    });

});

/* ==========================================
        Load Projects
========================================== */

async function loadProjects() {

    try {

        console.log("Loading from:", API_URL);

        const response = await fetch(API_URL);

        console.log("GET Status:", response.status);

        if (!response.ok) {

            const error = await response.text();

            console.log("GET Error:", error);

            throw new Error(error);

        }

        projects = await response.json();

        console.log("Projects:", projects);

        filteredProjects = [...projects];

        updateHeroProject();

        renderProjects();

    } catch (error) {

        console.error("LoadProjects Error:", error);

        showMessage(
            "❌ Failed to load projects\n" + error,
            "red"
        );

    }

}

/* ==========================================
        Hero Project
========================================== */

function updateHeroProject() {

    if (projects.length === 0) return;

    const project = projects[0];

    document.getElementById("projectName").textContent =
        project.name;

    document.getElementById("projectDescription").textContent =
        project.description;

    document.getElementById("projectTechnology").textContent =
        project.technology;

}

/* ==========================================
        Render Projects
========================================== */

function renderProjects() {

    const tbody = document.getElementById("projectBody");

    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const pageData = filteredProjects.slice(start, end);

    pageData.forEach(project => {

        tbody.innerHTML += `

        <tr>

            <td>${project.id}</td>

            <td>${project.name}</td>

            <td>${project.description}</td>

            <td>${project.technology}</td>

            <td>

                <button
                    onclick="editProject(${project.id})">

                    Edit

                </button>

                <button
                    onclick="deleteProject(${project.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================================
        Save Project
========================================== */

async function saveProject(event) {

    event.preventDefault();

    const project = {

        name: document.getElementById("name").value.trim(),

        description: document.getElementById("description").value.trim(),

        technology: document.getElementById("technology").value.trim()

    };

    if (
        project.name === "" ||
        project.description === "" ||
        project.technology === ""
    ) {

        showMessage("⚠ All fields are required.", "orange");

        return;

    }

    try {

        console.log("API URL:", API_URL);
        console.log("Project:", project);

        const response = await fetch(
            editId === null ? API_URL : `${API_URL}/${editId}`,
            {
                method: editId === null ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(project)
            }
        );

        console.log("Response Status:", response.status);

        if (!response.ok) {

            const error = await response.text();

            console.log("Server Error:", error);

            showMessage(error, "red");

            return;

        }

       const result = await response.json();

console.log(result);

showMessage(
    editId === null
        ? "✅ Project Added Successfully"
        : "✅ Project Updated Successfully",
    "lime"
);

await loadProjects();

        editId = null;

        projectForm.reset();

        projectForm.querySelector("button").innerText = "Save Project";

        loadProjects();

    } catch (error) {
    console.error(error);
    alert(error.stack || error.message || error);
    showMessage(error.toString(), "red");
}

}

/* ==========================================
        Message Helper
========================================== */

function showMessage(message, color) {

    const msg = document.getElementById("message");

    msg.style.color = color;

    msg.innerText = message;

}

/* ==========================================
        Edit Project
========================================== */

function editProject(id) {

    const project = projects.find(p => p.id === id);

    if (!project) return;

    editId = id;

    document.getElementById("name").value =
        project.name;

    document.getElementById("description").value =
        project.description;

    document.getElementById("technology").value =
        project.technology;

    document
        .querySelector("#projectForm button")
        .innerText = "Update Project";

    window.scrollTo({

        top: document
            .getElementById("addProject")
            .offsetTop - 80,

        behavior: "smooth"

    });

}

/* ==========================================
        Delete Project
========================================== */

async function deleteProject(id) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this project?"

    );

    if (!confirmDelete) return;

    try {

        const response = await fetch(

            `${API_URL}/${id}`,

            {

                method: "DELETE"

            }

        );

        if (!response.ok) {

            throw new Error();

        }

        showMessage(

            "🗑 Project Deleted Successfully",

            "red"

        );

        loadProjects();

    }

    catch (error) {

        console.error(error);

        showMessage(

            "❌ Delete Failed",

            "red"

        );

    }

}

/* ==========================================
            Search
========================================== */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value

            .toLowerCase()

            .trim();

        filteredProjects = projects.filter(project =>

            project.name.toLowerCase().includes(keyword)

            ||

            project.description.toLowerCase().includes(keyword)

            ||

            project.technology.toLowerCase().includes(keyword)

        );

        currentPage = 1;

        renderProjects();

    });

}

/* ==========================================
            Pagination
========================================== */

function changePage(page) {

    currentPage = page;

    renderProjects();

}

/* ==========================================
        Counter Animation
========================================== */

const counters = document.querySelectorAll(".stat-box h1");

function startCounter() {

    counters.forEach(counter => {

        const original = counter.innerText;

        const target = parseInt(original);

        if (isNaN(target)) return;

        let count = 0;

        const speed = Math.ceil(target / 80);

        function update() {

            count += speed;

            if (count >= target) {

                counter.innerText = original;

            }

            else {

                counter.innerText = count;

                requestAnimationFrame(update);

            }

        }

        update();

    });

}

const stats = document.querySelector(".stats");

if (stats) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounter();

                observer.disconnect();

            }

        });

    });

    observer.observe(stats);

}

/* ==========================================
        Timeline Animation
========================================== */

document.querySelectorAll(".timeline-box")

.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(50px)";

    item.style.transition = ".8s";

});

const timeline = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =

                "translateY(0px)";

        }

    });

});

document.querySelectorAll(".timeline-box")

.forEach(item => timeline.observe(item));

/* ==========================================
        Footer Animation
========================================== */

const footer = document.querySelector(".footer");

if (footer) {

    footer.style.opacity = "0";

    footer.style.transition = "1s";

    const footerObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                footer.style.opacity = "1";

            }

        });

    });

    footerObserver.observe(footer);

}

/* ==========================================
        Initialize Project
========================================== */

loadProjects();

/* ==========================================
            END OF FILE
========================================== */