// Mapeamento das rotas
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
  // 🛑 TRAVA DE SEGURANÇA: Se estiver na Etapa 1 e tentar ir para frente sem preencher
  if (currentStep === 1 && stepNumber > 1) {
    if (typeof validateStep1 === 'function' && !validateStep1()) {
      return; // Interrompe a navegação
    }
  }

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
    
    // Ativa as máscaras de input na Etapa 1
    if (stepNumber === 1 && typeof applyInputMasks === 'function') {
      applyInputMasks();
    }

    container.scrollTop = 0;
  } catch (error) {
    console.error('Erro no roteamento:', error);
    container.innerHTML = `<div style="color: #e74c3c; padding: 20px;">⚠️ Falha ao carregar a etapa ${stepNumber}.</div>`;
  }
}

/**
 * Atualiza o item ativo visualmente na Sidebar
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

// INICIALIZAÇÃO DO SISTEMA
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadStep(1);
  } catch (err) {
    console.warn("Aviso na inicialização:", err);
  } finally {
    if (typeof hideSplashScreen === 'function') {
      hideSplashScreen();
    }
  }
});