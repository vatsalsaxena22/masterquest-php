const apps = [
  [
    "01",
    "To-Do & Task Manager",
    "Build a simple task management application with CRUD operations.",
    "Beginner",
    "bi-check2-square",
    "/todo/",
  ],
  [
    "02",
    "Contact & Lead Manager",
    "Learn form handling, validation and basic lead management.",
    "Beginner",
    "bi-person-lines-fill",
    "/contact-lead-manager",
  ],
  [
    "03",
    "Guestbook & Review Manager",
    "Build a review system with submissions, moderation and approval.",
    "Beginner",
    "bi-chat-square-heart",
    "/guestbook-review-manager",
  ],
  [
    "04",
    "Business Blog & News CMS",
    "Create a publishing platform with posts, categories and administration.",
    "Intermediate",
    "bi-newspaper",
    "/business-blog-cms",
  ],
  [
    "05",
    "Customer Login Portal",
    "Learn authentication, sessions, password hashing and user profiles.",
    "Intermediate",
    "bi-person-lock",
    "/customer-login-portal",
  ],
  [
    "06",
    "Event Booking System",
    "Build events, registrations, tickets and booking workflows.",
    "Intermediate",
    "bi-calendar2-check",
    "/event-booking-system",
  ],
  [
    "07",
    "E-commerce Store",
    "Build products, cart, checkout, orders and payment workflows.",
    "Advanced",
    "bi-cart3",
    "/ecommerce-store",
  ],
  [
    "08",
    "Community Forum",
    "Build discussions, topics, replies, users and moderation.",
    "Advanced",
    "bi-chat-dots",
    "/community-forum",
  ],
  [
    "09",
    "Inventory Management ERP",
    "Manage products, suppliers, stock and business reports.",
    "Advanced",
    "bi-boxes",
    "/inventory-management-erp",
  ],
  [
    "10",
    "Business CMS Platform",
    "Build a complete CMS with pages, posts, media, users and roles.",
    "Advanced",
    "bi-window-stack",
    "/business-cms-platform",
  ],
];

document.getElementById("appGrid").innerHTML = apps
  .map(
    ([no, title, desc, level, icon, url]) => `
    <div class="col-12 col-md-6 col-lg-4">
        <a href=".${url}" class="text-decoration-none text-reset">
            <div class="card product-card h-100 rounded-4">
              <div class="card-body p-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-4">
                    <div class="icon-box"><i class="bi ${icon}"></i></div>
                    <span class="badge text-bg-primary">${no}</span>
                </div>
                <h2 class="h5 fw-semibold">${title}</h2>
                <p class="text-secondary small mt-2 mb-3">${desc}</p>
                <small class="text-secondary">${level} · PHP · MySQL</small>
              </div>
            </div>
        </a>
    </div>
`,
  )
  .join("");
