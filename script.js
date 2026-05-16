const filters = ["All", "Web", "Audio", "Lighting", "AI", "Experiments"];

// Edit this array to add, remove, or update projects.
// Link kinds are separated so visitors can quickly distinguish live pages,
// source code, and longer notes/case studies.
const projects = [
  {
    title: "Portfolio Website",
    category: "Web",
    status: "Live",
    description: "My personal website and online identity.",
    links: [
      {
        label: "View project",
        url: "https://jellewijma.com",
        kind: "External",
        primary: true,
        external: true,
      },
    ],
  },
  {
    title: "Projects Hub",
    category: "Web",
    status: "In progress",
    description: "This overview page for collecting all my projects in one place.",
    links: [
      {
        label: "View project",
        url: "https://projects.jellewijma.com",
        kind: "Internal",
        primary: true,
        external: false,
      },
    ],
  },
  {
    title: "Church Lighting Setup",
    category: "Lighting",
    status: "In progress",
    description:
      "Research and experiments for designing a church stage lighting setup for worship, drama, and live music.",
    links: [],
  },
  {
    title: "Suzuki Alto Audio Upgrade",
    category: "Audio",
    status: "In progress",
    description:
      "Upgrading the sound system in my 2010 Suzuki Alto with better dashboard speakers, door speakers, and an under-seat subwoofer.",
    links: [],
  },
  {
    title: "AI Coding Workflow",
    category: "AI",
    status: "In progress",
    description:
      "Experiments with AI coding tools, local models, AGENTS.md files, and better developer workflows.",
    links: [],
  },
  {
    title: "Home Lighting Test Rig",
    category: "Lighting",
    status: "Idea",
    description:
      "A small budget-friendly lighting rig for learning DMX, stage lighting, and programming shows at home.",
    links: [],
  },
  {
    title: "Terminal Setup",
    category: "Experiments",
    status: "In progress",
    description:
      "Customizing my Ubuntu terminal setup with modern themes, fonts, and developer tools.",
    links: [],
  },
];

const categoryStyles = {
  Web: { short: "</>", a: "rgba(105, 210, 201, 0.2)", b: "#8de7df" },
  Audio: { short: "dB", a: "rgba(240, 187, 107, 0.2)", b: "#ffd991" },
  Lighting: { short: "LX", a: "rgba(137, 184, 255, 0.22)", b: "#a8c9ff" },
  AI: { short: "AI", a: "rgba(196, 167, 255, 0.18)", b: "#ceb7ff" },
  Experiments: { short: "EXP", a: "rgba(121, 217, 135, 0.18)", b: "#a4f0ae" },
};

const projectsGrid = document.querySelector("#projects");
const emptyState = document.querySelector("#empty-state");
const filterStatus = document.querySelector("#filter-status");
const projectCount = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll(".filter-button");

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function projectLinksMarkup(links) {
  if (!links.length) {
    return '<span class="tag">Notes coming soon</span>';
  }

  return links
    .map((link) => {
      const classes = link.primary ? "primary" : "";
      const target = link.external ? ' target="_blank" rel="noreferrer"' : "";

      return `
        <a class="${classes}" href="${link.url}"${target}>
          ${link.label}
          <span class="link-kind">${link.kind}</span>
        </a>
      `;
    })
    .join("");
}

function projectCard(project) {
  const style = categoryStyles[project.category] || categoryStyles.Experiments;

  return `
    <article class="project-card" style="--visual-a: ${style.a}; --visual-b: ${style.b};">
      <div class="project-visual" aria-hidden="true">
        <span>${style.short}</span>
      </div>
      <div class="project-body">
        <div class="tags">
          <span class="tag tag-category">${project.category}</span>
          <span class="tag tag-status ${statusClass(project.status)}">${project.status}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-links" aria-label="${project.title} links">
          ${projectLinksMarkup(project.links)}
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "All") {
  const visibleProjects =
    filter === "All" ? projects : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = visibleProjects.map(projectCard).join("");
  emptyState.hidden = visibleProjects.length > 0;

  const projectWord = visibleProjects.length === 1 ? "project" : "projects";
  filterStatus.textContent =
    filter === "All"
      ? `Showing all ${visibleProjects.length} ${projectWord}.`
      : `Showing ${visibleProjects.length} ${filter} ${projectWord}.`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    renderProjects(selectedFilter);
  });
});

projectCount.textContent = String(projects.length);
renderProjects(filters[0]);
