// Roteamento hash-based para evitar 404 no live-server
const routes = {
  "": { file: "./pages/home.html", title: "Início", heroClass: "hero-index" },
  "/": { file: "./pages/home.html", title: "Início", heroClass: "hero-index" },
  "/projetos": {
    file: "./pages/projeto.html",
    title: "Projetos",
    heroClass: "hero-projeto",
  },
  "/cadastro": {
    file: "./pages/cadastro.html",
    title: "Cadastro",
    heroClass: "hero-cadastro",
  },
};

// Cache simples de páginas para evitar refetch
const pageCache = new Map();

export async function navigate(hashPath) {
  // normaliza hash → "/projetos", "/cadastro" ou "/"
  const path = normalize(hashPath);
  const route = routes[path] || routes["/"];

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `<div style="padding:2rem;text-align:center">Carregando...</div>`;

  const html = await getPage(route.file);
  app.innerHTML = html;

  // Atualiza hero (classe de fundo) e título
  updateHero(route);

  // Marca link ativo
  setActiveLink(path);

  // dispara evento para inicializações específicas por página
  document.dispatchEvent(
    new CustomEvent("route:changed", { detail: { path } })
  );
}

function normalize(hash) {
  const raw = (hash || "").replace(/^#/, "");
  return raw === "" ? "/" : raw.startsWith("/") ? raw : `/${raw}`;
}

async function getPage(file) {
  if (pageCache.has(file)) return pageCache.get(file);
  const res = await fetch(file, { cache: "no-store" });
  if (!res.ok)
    return `<section style="padding:2rem">Erro ao carregar a página.</section>`;
  const text = await res.text();
  pageCache.set(file, text);
  return text;
}

function updateHero(route) {
  const hero = document.querySelector(".hero");
  const title = document.getElementById("heroTitle");
  const subtitle = document.getElementById("heroSubtitle");
  if (!hero) return;

  hero.classList.remove("hero-index", "hero-projeto", "hero-cadastro");
  if (route.heroClass) hero.classList.add(route.heroClass);

  if (title)
    title.textContent =
      route.title === "Início"
        ? "Transforme vidas com seu tempo e seu coração 💙"
        : route.title;
  if (subtitle) {
    subtitle.textContent =
      route.title === "Início"
        ? "Faça parte da nossa rede de voluntários e ajude crianças a sonhar mais alto."
        : route.title === "Projetos"
        ? "Conheça ações reais que geram impacto positivo."
        : "Junte-se a nós e faça a diferença.";
  }
}

function setActiveLink(path) {
  document.querySelectorAll("a[data-link]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const clean = href.replace(/^#/, "");
    const cmp = clean === "" ? "/" : clean;
    a.classList.toggle("active", cmp === path);
  });
}
