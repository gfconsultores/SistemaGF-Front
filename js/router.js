// Mapeamento das rotas para os arquivos HTML de cada etapa
const routes = {
  1: './Sistema-Front/pages/empresa.html',
  2: './Sistema-Front/pages/anatel.html',
  3: './Sistema-Front/pages/resp-tecnica.html',
  4: './Sistema-Front/pages/fiscal.html',
  5: './Sistema-Front/pages/necessidades.html',
  6: './Sistema-Front/pages/resultado.html'
};

let currentStep = 1;

/**
 * Carrega dinamicamente a view da etapa selecionada
 * @param {number} stepNumber 
 */
async function loadStep(stepNumber) {
  const container = document.getElementById('view-container');
  const route = routes[stepNumber];

  if (!route) return;

  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

    const html = await response.text();
    container.innerHTML = html;

    currentStep = stepNumber;
    updateSidebar(stepNumber);
    
    // Rola o conteúdo de volta ao topo ao trocar de página
    container.scrollTop = 0;
  } catch (error) {
    console.error('Erro no roteamento:', error);
    container.innerHTML = `<div style="color: #e74c3c; padding: 20px;">⚠️ Falha ao carregar a etapa ${stepNumber}.</div>`;
  }
}

/**
 * Atualiza o item ativo visualmente na Sidebar / Menu
 * @param {number} activeStep 
 */
function updateSidebar(activeStep) {
  const stepItems = document.querySelectorAll('.step-item');
  stepItems.forEach((item, index) => {
    if (index + 1 === activeStep) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

/**
 * Alterna a exibição do Menu Hambúrguer (Apenas em telas de Celular/Tablet)
 */
function toggleMobileMenu() {
  // Trava para executar apenas se a tela for menor ou igual a 950px
  if (window.innerWidth <= 950) {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('menu-overlay');

    if (sidebar && overlay) {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    }
  }
}

/**
 * Seleciona a etapa e fecha o menu drawer automaticamente (Mobile)
 * @param {number} stepNumber 
 */
function selectStepAndCloseMenu(stepNumber) {
  loadStep(stepNumber);
  toggleMobileMenu();
}

/**
 * Gerencia a seleção dos botões estilo pílula (Sim / Não / Não Sabe Informar)
 * @param {HTMLElement} element 
 */
function selectPill(element) {
  const parentGroup = element.closest('.pill-group');
  if (!parentGroup) return;

  const buttons = parentGroup.querySelectorAll('.pill-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
}

// INICIALIZAÇÃO DO SISTEMA
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Carrega a primeira etapa (Empresa)
    await loadStep(1);
  } catch (err) {
    console.warn("Aviso na inicialização:", err);
  } finally {
    // Oculta a Splash Screen com transição suave após 2 segundos
    setTimeout(() => {
      const loader = document.getElementById('loader-wrapper');
      if (loader) {
        loader.classList.add('hidden');
      }
    }, 2000);
  }
});