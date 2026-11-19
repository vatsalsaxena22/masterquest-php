/* =========================================================
   MASTERQUEST DATA
========================================================= */

const capabilities = [
  [
    "bi-check2-square",
    "Operations",
    "Task, inventory, supplier and internal workflow tools for day-to-day operations.",
  ],
  [
    "bi-people",
    "Customers",
    "Registration, login, profiles, lead capture and customer-facing portals.",
  ],
  [
    "bi-calendar2-check",
    "Transactions",
    "Bookings, carts, checkout, orders and payment-ready workflows.",
  ],
  [
    "bi-window-stack",
    "Content",
    "Blogs, pages, media, reviews and CMS features with administration.",
  ],
];

const products = [
  {
    no: "01",
    level: "starter",
    label: "Beginner",
    name: "To-Do & Task Manager",
    icon: "bi-check2-square",
    type: "Utility",
    price: "₹2,999",
    desc: "A focused task system for individuals, teams and small offices.",
    search: "todo task manager utility beginner crud",
    features: [
      "Add, edit and delete tasks",
      "Status and priority tracking",
      "MySQL persistence",
      "Simple administration",
    ],
    url: "/todo/",
  },
  {
    no: "02",
    level: "starter",
    label: "Beginner",
    name: "Contact & Lead Manager",
    icon: "bi-person-lines-fill",
    type: "Lead Management",
    price: "₹5,999",
    desc: "A lead capture and enquiry management system for local businesses and service providers.",
    search: "contact lead manager enquiry forms beginner",
    features: [
      "Validated enquiry forms",
      "Email notifications",
      "Lead storage and search",
      "Admin lead management",
    ],
    url: "#",
  },
  {
    no: "03",
    level: "starter",
    label: "Beginner",
    name: "Guestbook & Review Manager",
    icon: "bi-chat-square-heart",
    type: "Reviews",
    price: "₹8,999",
    desc: "A branded review collection system with moderation and approval workflows.",
    search: "guestbook review reviews moderation beginner",
    features: [
      "Visitor submissions",
      "Approval workflow",
      "Moderation controls",
      "Admin dashboard",
    ],
    url: "#",
  },
  {
    no: "04",
    level: "starter",
    label: "Intermediate",
    name: "Business Blog & News CMS",
    icon: "bi-newspaper",
    type: "CMS",
    price: "₹14,999",
    desc: "A lightweight publishing platform for organizations, businesses and personal brands.",
    search: "blog news cms content intermediate",
    features: [
      "Post CRUD and categories",
      "Admin authentication",
      "Publishing workflow",
      "Pagination-ready listings",
    ],
    url: "#",
  },
  {
    no: "05",
    level: "business",
    label: "Intermediate",
    name: "Customer Login Portal",
    icon: "bi-person-lock",
    type: "Authentication",
    price: "₹19,999",
    desc: "A reusable account foundation for secure customer access and profile workflows.",
    search: "customer login portal authentication intermediate",
    features: [
      "Registration and login",
      "Password hashing",
      "Session management",
      "Profile management",
    ],
    url: "#",
  },
  {
    no: "06",
    level: "business",
    label: "Intermediate",
    name: "Event Booking System",
    icon: "bi-calendar2-check",
    type: "Booking",
    price: "₹29,999",
    desc: "An event registration and ticket booking foundation for institutes and organizations.",
    search: "event booking ticket registration intermediate",
    features: [
      "Event listings",
      "Ticket booking",
      "Customer records",
      "Admin event management",
    ],
    url: "#",
  },
  {
    no: "07",
    level: "business",
    label: "Advanced",
    name: "E-commerce Store",
    icon: "bi-cart3",
    type: "Commerce",
    price: "₹49,999",
    desc: "A complete online-store foundation covering products, carts, checkout and orders.",
    search: "ecommerce store shop cart checkout payment advanced",
    features: [
      "Product catalogue",
      "Cart and checkout",
      "Order management",
      "Payment integration-ready",
    ],
    url: "#",
  },
  {
    no: "08",
    level: "business",
    label: "Advanced",
    name: "Community Forum",
    icon: "bi-chat-dots",
    type: "Community",
    price: "₹59,999",
    desc: "A discussion platform for communities, organizations, clubs and niche audiences.",
    search: "community forum discussion topics replies advanced",
    features: [
      "Topics and replies",
      "Nested discussions",
      "User accounts",
      "Moderation foundation",
    ],
    url: "#",
  },
  {
    no: "09",
    level: "premium",
    label: "Advanced",
    name: "Inventory Management ERP",
    icon: "bi-boxes",
    type: "Business",
    price: "₹79,999",
    desc: "Operational software for products, suppliers, stock control and business reporting.",
    search: "inventory erp stock suppliers reports advanced",
    features: [
      "Product management",
      "Supplier management",
      "Stock tracking",
      "Reports and dashboards",
    ],
    url: "#",
  },
  {
    no: "10",
    level: "premium",
    label: "Advanced",
    name: "Business CMS Platform",
    icon: "bi-window-stack",
    type: "Enterprise",
    price: "₹1,49,999+",
    desc: "A customizable CMS foundation for organizations that need content, users and media management.",
    search: "business cms platform users media roles enterprise advanced",
    features: [
      "Pages and posts",
      "User and role management",
      "Media uploads",
      "WYSIWYG editor-ready",
    ],
    url: "#",
  },
];

const stack = [
  ["bi-filetype-html", "HTML5", "Semantic structure"],
  ["bi-filetype-css", "CSS3", "Responsive design system"],
  ["bi-filetype-js", "JavaScript", "Interactions & UX"],
  ["bi-bootstrap", "Bootstrap", "Grid & components"],
  ["bi-filetype-php", "PHP", "Server-side logic"],
  ["bi-database", "MySQL", "Reliable data storage"],
  ["bi-bootstrap-reboot", "Bootstrap Icons", "Lightweight UI icons"],
  ["bi-shield-check", "Security-first", "Sessions & validation"],
];

const roadmap = [
  [
    "01",
    "Start with the fundamentals",
    "Build your first CRUD application and understand PHP, forms, MySQL and basic application structure.",
  ],
  [
    "02",
    "Build real-world workflows",
    "Add authentication, validation, dashboards, roles and business logic to your applications.",
  ],
  [
    "03",
    "Build complete systems",
    "Combine multiple modules into booking, commerce, community and management platforms.",
  ],
  [
    "04",
    "Reach advanced mastery",
    "Build scalable business software with reusable architecture, integrations and production-ready practices.",
  ],
];

const heroFeatures = [
  "CRUD & utility systems",
  "Authentication & portals",
  "Commerce & bookings",
  "Business management software",
];

const ctaFeatures = [
  ["bi-code-square", "Reusable codebase"],
  ["bi-palette", "Client branding"],
  ["bi-cloud-arrow-up", "Deployment & hosting"],
  ["bi-arrow-repeat", "Maintenance & upgrades"],
];

const faqs = [
  [
    "Can I start as a beginner?",
    "Yes. MasterQuest starts with simple CRUD applications and progressively introduces authentication, business logic, APIs, transactions and larger application architecture.",
  ],
  [
    "What technologies are used?",
    "The core stack uses HTML5, CSS3, Bootstrap 5.3.8, JavaScript, PHP and MySQL, keeping the learning path practical and deployable.",
  ],
  [
    "Are these real-world projects?",
    "Yes. The projects are designed around practical applications such as task management, CMS, authentication, booking, e-commerce, forums and ERP systems.",
  ],
  [
    "Can I customize the projects?",
    "Yes. Each project can be extended with additional modules, roles, integrations, dashboards, APIs and business-specific functionality.",
  ],
];

const footerExplore = [
  ["#products", "Products"],
  ["#capabilities", "Capabilities"],
  ["#stack", "Technology Stack"],
  ["#roadmap", "Roadmap"],
];

const footerProjects = [
  ["#products", "Task Manager"],
  ["#products", "Customer Portal"],
  ["#products", "E-commerce"],
  ["#products", "Inventory ERP"],
];

const footerStack = [
  "HTML5 + CSS3",
  "JavaScript",
  "PHP + MySQL",
  "Bootstrap 5.3.8",
];

/* =========================================================
   RENDER HELPERS
========================================================= */

const map = (items, callback) => items.map(callback).join("");

/* =========================================================
   HERO FEATURES
========================================================= */

document.getElementById("heroFeatures").innerHTML = map(
  heroFeatures,
  (item) => `
        <div class="d-flex align-items-center gap-2 text-secondary small">
            <i class="bi bi-check-circle-fill text-primary"></i>
            <span>${item}</span>
        </div>
    `,
);

/* =========================================================
   CAPABILITIES
========================================================= */

document.getElementById("capabilityGrid").innerHTML = map(
  capabilities,
  ([icon, title, desc]) => `
        <div class="col-sm-6 col-xl-3">
            <article class="card h-100 rounded-4">
              <div class="card-body p-4">
                <div class="icon-box">
                    <i class="bi ${icon}"></i>
                </div>
                <h3 class="h5 fw-semibold mt-4">${title}</h3>
                <p class="text-secondary small mt-2 mb-0">${desc}</p>
              </div>
            </article>
        </div>
    `,
);

/* =========================================================
   PRODUCT FILTERS
========================================================= */

const filterCounts = products.reduce((count, product) => {
  count[product.level] = (count[product.level] || 0) + 1;
  return count;
}, {});

document.getElementById("productFilters").innerHTML = `
    <button class="btn btn-sm rounded-pill filter-btn btn-primary" data-filter="all" aria-pressed="true">
        All <span>${products.length}</span>
    </button>
    <button class="btn btn-sm rounded-pill filter-btn btn-outline-secondary" data-filter="starter" aria-pressed="false">
        Beginner <span>${filterCounts.starter || 0}</span>
    </button>
    <button class="btn btn-sm rounded-pill filter-btn btn-outline-secondary" data-filter="business" aria-pressed="false">
        Intermediate <span>${filterCounts.business || 0}</span>
    </button>
    <button class="btn btn-sm rounded-pill filter-btn btn-outline-secondary" data-filter="premium" aria-pressed="false">
        Advanced <span>${filterCounts.premium || 0}</span>
    </button>
`;

/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {
  const filter =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";

  const search = document
    .getElementById("productSearch")
    .value.trim()
    .toLowerCase();

  const filtered = products.filter((product) => {
    const matchesFilter = filter === "all" || product.level === filter;

    const matchesSearch = `${product.name} ${product.search} ${product.type}`
      .toLowerCase()
      .includes(search);

    return matchesFilter && matchesSearch;
  });

  document.getElementById("productGrid").innerHTML = map(
    filtered,
    (product) => `
            <article class="col-12 col-md-6 col-xl-4 product-item">
                <a href=".${product.url}" class="d-flex h-100 text-decoration-none text-reset">
                    <div class="card product-card h-100 rounded-4">
                      <div class="card-body p-4 d-flex flex-column">

                        <div class="mb-4">

                            <div class="d-flex align-items-center justify-content-between gap-3">
                                <span class="badge text-bg-primary">
                                    ${product.no}
                                </span>
                                <span class="small text-secondary">
                                    ${product.label}
                                </span>
                            </div>

                            <h3 class="h5 fw-semibold mt-3">
                                ${product.name}
                            </h3>

                            <p class="text-secondary small mt-2 mb-0">
                                ${product.desc}
                            </p>

                            <div class="product-price mt-3">
                                ${product.price}
                                <small>starting price</small>
                            </div>

                        </div>

                        <ul class="list-unstyled d-grid gap-2 text-secondary small mb-4">
                            ${map(product.features, (feature) => `<li class="d-flex align-items-start gap-2"><i class="bi bi-check2 text-primary"></i><span>${feature}</span></li>`)}
                        </ul>

                        <div class="mt-auto pt-3 border-top d-flex align-items-center justify-content-between gap-3">
                            <span class="badge badge-soft">
                                ${product.type}
                            </span>
                            <span class="small text-secondary">
                                PHP + MySQL
                            </span>
                          </div>
                        </div>

                    </div>
                </a>
            </article>
        `,
  );

  document
    .getElementById("noResults")
    .classList.toggle("d-none", filtered.length > 0);
}

renderProducts();

/* =========================================================
   PRODUCT FILTER EVENTS
========================================================= */

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => {
        const selected = btn === button;
        btn.classList.toggle("active", selected);
        btn.classList.toggle("btn-primary", selected);
        btn.classList.toggle("btn-outline-secondary", !selected);
        btn.setAttribute("aria-pressed", String(selected));
      });

    renderProducts();
  });
});

document
  .getElementById("productSearch")
  .addEventListener("input", renderProducts);

/* =========================================================
   STACK
========================================================= */

document.getElementById("stackGrid").innerHTML = map(
  stack,
  ([icon, title, desc]) => `
        <div class="col-6 col-lg-3">
            <div class="card h-100 rounded-4 text-center p-3 p-md-4">
                <i class="bi ${icon} fs-2 text-primary mb-2"></i>
                <strong class="fw-semibold">${title}</strong>
                <span class="small text-secondary mt-1">${desc}</span>
            </div>
        </div>
    `,
);

/* =========================================================
   ROADMAP
========================================================= */

document.getElementById("roadmapList").innerHTML = map(
  roadmap,
  ([no, title, desc]) => `
        <div class="roadmap-step">
            <span class="roadmap-number">${no}</span>
            <div>
                <h3 class="h5 fw-semibold">${title}</h3>
                <p class="text-secondary small mt-2 mb-0">${desc}</p>
            </div>
        </div>
    `,
);

/* =========================================================
   CTA
========================================================= */

document.getElementById("ctaFeatures").innerHTML = map(
  ctaFeatures,
  ([icon, text]) => `
        <div class="d-flex align-items-center gap-3 py-2 border-bottom text-secondary small fw-semibold">
            <i class="bi ${icon} fs-5 text-primary"></i>
            <span>${text}</span>
        </div>
    `,
);

/* =========================================================
   FAQ
========================================================= */

document.getElementById("faq").innerHTML = map(
  faqs,
  ([question, answer], index) => `
        <div class="accordion-item rounded-3 overflow-hidden mb-3">

            <h3 class="accordion-header">

                <button
                    class="accordion-button ${index ? "collapsed" : ""}"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq${index}"
                    aria-expanded="${index === 0}"
                >
                    ${question}
                </button>

            </h3>

            <div
                id="faq${index}"
                class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
                data-bs-parent="#faq"
            >

                <div class="accordion-body">
                    ${answer}
                </div>

            </div>

        </div>
    `,
);

/* =========================================================
   FOOTER
========================================================= */

document.getElementById("footerExplore").innerHTML = map(
  footerExplore,
  ([url, text]) =>
    `<a href="${url}" class="d-block mb-2 link-secondary text-decoration-none">${text}</a>`,
);

document.getElementById("footerProjects").innerHTML = map(
  footerProjects,
  ([url, text]) =>
    `<a href="${url}" class="d-block mb-2 link-secondary text-decoration-none">${text}</a>`,
);

document.getElementById("footerStack").innerHTML = map(
  footerStack,
  (text) => `<span class="d-block mb-2 small text-secondary">${text}</span>`,
);

/* =========================================================
   YEAR
========================================================= */

document.getElementById("currentYear").textContent = new Date().getFullYear();
