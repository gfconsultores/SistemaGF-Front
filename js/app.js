// Alternar botões estilo Pílula (Sim / Não / Não Sabe)
function selectPill(buttonElement) {
  const parent = buttonElement.parentElement;
  // Remove 'selected' dos irmãos
  parent.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('selected'));
  // Adiciona ao selecionado
  buttonElement.classList.add('selected');
}

// Navegação entre Etapas (Wizard Stepper)
function goToStep(stepNumber) {
  // Oculta todas as etapas
  document.querySelectorAll('.wizard-step').forEach(step => step.classList.remove('active'));
  // Desativa os itens da sidebar
  document.querySelectorAll('.step-item').forEach(item => item.classList.remove('active'));

  // Ativa a etapa desejada
  const targetStep = document.getElementById(`step-${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add('active');
  }

  // Atualiza a sidebar
  const targetSidebarItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
  if (targetSidebarItem) {
    targetSidebarItem.classList.add('active');
  }
}

function nextStep(currentStep) {
  goToStep(currentStep);
}

function prevStep(currentStep) {
  goToStep(currentStep);
}

// Clique direto nos itens da sidebar
document.querySelectorAll('.step-item').forEach(item => {
  item.addEventListener('click', function() {
    const step = this.getAttribute('data-step');
    goToStep(step);
  });
});