const routes = {
  1: './Sistema-Front/pages/empresa.html',
  2: './Sistema-Front/pages/anatel.html',
  3: './Sistema-Front/pages/resp-tecnica.html',
  4: './Sistema-Front/pages/fiscal.html',
  5: './Sistema-Front/pages/necessidades.html',
  6: './Sistema-Front/pages/resultado.html'
};

let currentStep = 1;

async function loadStep(stepNumber) {
  const container = document.getElementById('view-container');
  const route = routes[stepNumber];

  if (!route) return;

  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error(`Erro ao carregar a página: ${response.statusText}`);

    const html = await response.text();
    container.innerHTML = html;

    currentStep = stepNumber;
    updateSidebar(stepNumber);
    container.scrollTop = 0;
  } catch (error) {
    console.error('Erro no roteamento:', error);
    container.innerHTML = `<div style="color: #e74c3c; padding: 20px;">⚠️ Falha ao carregar a etapa ${stepNumber}.</div>`;
  }
}

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

function selectPill(element) {
  const parentGroup = element.closest('.pill-group');
  if (!parentGroup) return;

  const buttons = parentGroup.querySelectorAll('.pill-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
}

// INICIALIZAÇÃO DA SPLASH SCREEN (LOADER)
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadStep(1);
  } catch (err) {
    console.warn("Aviso na inicialização:", err);
  } finally {
    // Garante que o loader suma após 2 segundos
    setTimeout(() => {
      const loader = document.getElementById('loader-wrapper');
      if (loader) {
        loader.classList.add('hidden');
      }
    }, 2000);
  }
});