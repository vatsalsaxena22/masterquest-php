document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("currentYear");
  const nav = document.getElementById("mainNav");

  year.textContent = new Date().getFullYear();

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
      backToTop.classList.toggle("show", window.scrollY > 500);
    },
    { passive: true },
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelectorAll('#mainNav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = bootstrap.Collapse.getInstance(nav);
      if (window.innerWidth < 768 && collapse) collapse.hide();
    });
  });
});
