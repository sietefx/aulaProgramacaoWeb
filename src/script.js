document.addEventListener("DOMContentLoaded", () => {
  // ====== MENU RESPONSIVO ======
  function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const btn = document.querySelector(".menu-toggle");
    if (!navMenu) return;
    const isOpen = navMenu.classList.toggle("open");
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
  window.toggleMenu = toggleMenu;

  // ====== LIMPAR TABELA ======
  window.limparTabela = function () {
    const tabela = document.getElementById("tabelaVoluntarios");
    if (tabela) {
      tabela.innerHTML = "";
      localStorage.removeItem("voluntarios");
    }
  };

  // ====== FORMULÁRIO DE CADASTRO ======
  window.handleSubmit = function (event) {
    event.preventDefault();
    const form = document.getElementById("volunteerForm");
    const formData = new FormData(form);

    const payload = {
      nome: formData.get("nome")?.trim(),
      email: formData.get("email")?.trim(),
      telefone: formData.get("telefone")?.trim(),
      idade: formData.get("idade"),
      cpf: formData.get("cpf")?.trim(),
      dataNascimento: formData.get("dataNascimento"),
      endereco: formData.get("endereco"),
      cep: formData.get("cep")?.trim(),
      disponibilidade: formData.get("disponibilidade"),
      area: formData.get("area-interesse"),
    };

    if (!payload.nome || !payload.email || !payload.telefone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let voluntarios = JSON.parse(localStorage.getItem("voluntarios") || "[]");
    voluntarios.push(payload);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    atualizarTabela();

    const success = document.getElementById("successMessage");
    if (success) {
      success.style.display = "block";
      success.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => (success.style.display = "none"), 4000);
    }

    form.reset();
  };

  // ====== RECARREGAR LISTA DO LOCALSTORAGE ======
  function atualizarTabela() {
    const tabela = document.getElementById("tabelaVoluntarios");
    const voluntariosSalvos = JSON.parse(
      localStorage.getItem("voluntarios") || "[]"
    );

    if (!tabela) return;

    if (voluntariosSalvos.length === 0) {
      tabela.innerHTML = "<p>Nenhum voluntário cadastrado ainda.</p>";
      return;
    }

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
        <tbody>
          ${voluntariosSalvos
            .map(
              (v) => `
              <tr>
                <td>${v.nome}</td>
                <td>${v.telefone}</td>
                <td>${v.idade}</td>
                <td>${v.disponibilidade}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
  atualizarTabela();

  // ====== MODO ESCURO ======
  const themeBtn = document.getElementById("toggleTheme");
  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark-mode");
    themeBtn.textContent = document.body.classList.contains("dark-mode")
      ? "🌞"
      : "🌙";
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      themeBtn.textContent = isDark ? "🌞" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ====== MÁSCARAS DE INPUT ======
  document.addEventListener("input", (e) => {
    // Telefone
    if (e.target.id === "telefone") {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
    }

    // CPF — automático, sem precisar digitar ponto ou traço
    if (e.target.id === "cpf") {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 11) value = value.substring(0, 11);
      e.target.value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    // CEP — automático, sem precisar digitar o hífen
    if (e.target.id === "cep") {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 8) value = value.substring(0, 8);
      e.target.value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
  });
});
