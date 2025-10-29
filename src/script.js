document.addEventListener("DOMContentLoaded", () => {
  // ====== MENU RESPONSIVO ======
  function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const btn = document.querySelector(".menu-toggle");
    if (!navMenu) return;

    const isOpen = navMenu.classList.toggle("open");
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    const links = navMenu.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  }
  window.toggleMenu = toggleMenu;

  // ====== LIMPAR TABELA (para cadastro.html) ======
  window.limparTabela = function () {
    const tabela = document.getElementById("tabelaVoluntarios");
    if (tabela) tabela.innerHTML = "";
  };

  // ====== FORMULÁRIO DE CADASTRO ======
  window.handleSubmit = function (event) {
    event.preventDefault();
    const form = document.getElementById("volunteerForm");
    if (!form) return;

    const formData = new FormData(form);
    const payload = {
      nome: formData.get("nome")?.trim(),
      telefone: formData.get("telefone")?.trim(),
      idade: formData.get("idade"),
      disponibilidade: formData.get("disponibilidade"),
    };

    let voluntarios = JSON.parse(localStorage.getItem("voluntarios") || "[]");
    voluntarios.push(payload);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    if (!payload.disponibilidade) {
      alert("Por favor, selecione uma opção de disponibilidade.");
      return;
    }

    const tabela = document.getElementById("tabelaVoluntarios");
    if (tabela) {
      if (!tabela.querySelector("table")) {
        tabela.innerHTML = `
          <table class="tabela-voluntarios">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Idade</th>
                <th>Disponibilidade</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        `;
      }

      const tbody = tabela.querySelector("tbody");
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${payload.nome}</td>
        <td>${payload.telefone}</td>
        <td>${payload.idade}</td>
        <td>${payload.disponibilidade}</td>
      `;
      tbody.appendChild(row);
    }

    const success = document.getElementById(" ");
    if (success) {
      success.style.display = "block";
      success.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      if (success) success.style.display = "none";
    }, 5000);

    form.reset();
  };

  // ====== MODO ESCURO GLOBAL ======
  const themeBtn = document.getElementById("toggleTheme");
  if (themeBtn) {
    // Carrega tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark-mode");

    // Define ícone inicial
    themeBtn.textContent = document.body.classList.contains("dark-mode")
      ? "🌞"
      : "🌙";

    // Alternar tema e salvar
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      themeBtn.textContent = isDark ? "🌞" : "🌙";
      themeBtn.setAttribute(
        "aria-label",
        isDark ? "Alternar para modo claro" : "Alternar para modo escuro"
      );
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }
});

const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

// Minificar CSS
gulp.task("minify-css", () => {
  return gulp
    .src("src/css/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"));
});

// Minificar JS
gulp.task("minify-js", () => {
  return gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Minificar HTML
gulp.task("minify-html", () => {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));
});

// Otimizar imagens
gulp.task("images", () => {
  return gulp
    .src("src/img/**/*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("dist/img"));
});

// Tarefa padrão
gulp.task(
  "default",
  gulp.parallel("minify-css", "minify-js", "minify-html", "images")
);

document.addEventListener("DOMContentLoaded", () => {
  // ====== SCROLL SUAVE PARA ÂNCORAS ======
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ====== ANIMAÇÃO AO SCROLL NAS SEÇÕES ======
  const fadeSections = document.querySelectorAll(
    ".values-section, .history-section, .team-section, .reports-section"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeSections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
  });

  // ====== ATUALIZAR ANO NO FOOTER ======
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});