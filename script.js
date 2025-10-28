// ====== MENU RESPONSIVO ======
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const btn = document.querySelector(".menu-toggle");
  if (!navMenu) return;

  const isOpen = navMenu.classList.toggle("open");
  if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");

  // Fecha o menu ao clicar em um link (modo mobile)
  const links = navMenu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  });
}

// Fecha o menu ao pressionar ESC (acessibilidade)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const navMenu = document.getElementById("navMenu");
    const btn = document.querySelector(".menu-toggle");
    if (navMenu && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  }
});

// ====== LIMPAR TABELA ======
function limparTabela() {
  const tabela = document.getElementById("tabelaVoluntarios");
  if (tabela) tabela.innerHTML = "";
}

// ====== FORMULÁRIO DE CADASTRO ======
function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("volunteerForm");
  if (!form) return;

  const formData = new FormData(form);
  const nome = formData.get("nome")?.trim() || "";
  const telefone = formData.get("telefone")?.trim() || "";
  const idade = formData.get("idade")?.trim() || "";
  const disponibilidade = formData.get("disponibilidade");

  if (!disponibilidade) {
    alert("Por favor, selecione uma opção de disponibilidade.");
    return;
  }

  const payload = { nome, telefone, idade, disponibilidade };

  console.log("Formulário enviado:", payload);

  // ====== INSERE NA TABELA ======
  const tabela = document.getElementById("tabelaVoluntarios");
  if (tabela) {
    // Cria a tabela se ainda não existir
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

    // Adiciona nova linha
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

  // ====== Mensagem de sucesso ======
  const success = document.getElementById("successMessage");
  if (success) {
    success.style.display = "block";
    success.scrollIntoView({ behavior: "smooth" });
  }

  // Limpa o formulário
  form.reset();
}
