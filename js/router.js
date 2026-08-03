// Mapeamento corrigido para os nomes exatos dos seus arquivos na pasta pages/
const routes = {
  1: './Sistema-Front/pages/empresa.html',
  2: './Sistema-Front/pages/anatel.html',
  3: './Sistema-Front/pages/resp-tecnica.html',
  4: './Sistema-Front/pages/fiscal.html',
  5: './Sistema-Front/pages/necessidades.html',
  6: './Sistema-Front/pages/resultado.html',
};

let currentStep = 1;

async function loadStep(stepNumber) {
  const container = document.getElementById('view-container');
  const route = routes[stepNumber];

  if (!route) return;

  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error('Erro ao carregar a página');
    const htmlContent = await response.text();
    
    container.innerHTML = htmlContent;
    currentStep = stepNumber;

    // Atualiza destaque da Sidebar
    document.querySelectorAll('.step-item').forEach(item => item.classList.remove('active'));
    const activeMenu = document.getElementById(`menu-${stepNumber}`);
    if (activeMenu) activeMenu.classList.add('active');

  } catch (error) {
    container.innerHTML = `
      <div class="card-question">
        <h3>Erro ao carregar a etapa ${stepNumber}</h3>
        <p>Verifique se o arquivo <strong>${route}</strong> existe na pasta <code>pages/</code>.</p>
      </div>`;
  }
}

// Alternar seleção dos botões estilo pílula (Sim / Não / Não Sabe)
function selectPill(btn) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// Inicia na Etapa 1 ao carregar
window.addEventListener('DOMContentLoaded', () => {
  loadStep(1);
});