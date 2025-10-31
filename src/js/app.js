import { navigate } from "./router.js";

// Navega no load e quando o hash muda
function handleRoute() {
  navigate(location.hash || "#/");
  // acessibilidade: foca no main após troca
  const app = document.getElementById("app");
  if (app) setTimeout(() => app.focus(), 0);
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", () => {
  handleRoute();

  // Clique em links com data-link (opcional — como estamos com hash, nem é estritamente necessário)
  document.body.addEventListener("click", (e) => {
    const a = e.target.closest('a[data-link]');
    if (!a) return;
    // Permite comportamento normal do hash
  });

  // Inicializações específicas por rota
  document.addEventListener("route:changed", (ev) => {
    const { path } = ev.detail || {};

    // PROJETOS: inicializa carrossel
    if (path === "/projetos") {
      initCarousel();
    }

    // CADASTRO: ativa binds do teu script (máscaras, submit, limpar)
    if (path === "/cadastro") {
      // se teu script.js expõe funções no window, reata aqui:
      if (typeof window.handleSubmit === "function") {
        const form = document.getElementById("volunteerForm");
        if (form) {
          form.addEventListener("submit", window.handleSubmit);
        }
      }
      if (typeof window.limparTabela === "function") {
        const btn = document.getElementById("btnLimparTabela");
        if (btn) {
          btn.addEventListener("click", window.limparTabela);
        }
      }
      // Atualiza tabela ao entrar na rota
      if (typeof window.atualizarTabela === "function") {
        window.atualizarTabela();
      }
    }
  });
});

function initCarousel() {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".slide"));
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  if (slides.length === 0 || !nextButton || !prevButton) return;

  let currentSlide = 0;

  // ✅ Garante que cada slide fica lado a lado
  slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  const update = () => {
    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  };

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    update();
  });

  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    update();
  });

  update();
}