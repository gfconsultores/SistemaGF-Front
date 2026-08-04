/**
 * UI.JS - Central de Controle da Interface do Usuário (User Interface)
 */

/* ==========================================================================
   1. CONTROLE DE MENUS E NAVEGAÇÃO VISUAL
   ========================================================================== */

function toggleMobileMenu() {
  if (window.innerWidth <= 950) {
    const sidebar = document.getElementById('mobile-sidebar');
    const overlay = document.getElementById('menu-overlay');

    if (sidebar && overlay) {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    }
  }
}

function selectStepAndCloseMenu(stepNumber) {
  if (typeof loadStep === 'function') {
    loadStep(stepNumber);
  }
  toggleMobileMenu();
}

/* ==========================================================================
   2. COMPONENTES INTERATIVOS (PÍLULAS)
   ========================================================================== */

function selectPill(element) {
  const parentGroup = element.closest('.pill-group');
  if (!parentGroup) return;

  const buttons = parentGroup.querySelectorAll('.pill-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  element.classList.add('selected');
}

/* ==========================================================================
   3. TELA DE CARREGAMENTO (SPLASH SCREEN)
   ========================================================================== */

function hideSplashScreen() {
  setTimeout(() => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 2000);
}

/* ==========================================================================
   4. MÁSCARAS DE INPUTS (CNPJ, CEP, TELEFONE, CPF)
   ========================================================================== */

function applyInputMasks() {
  const cnpjInput = document.getElementById('cnpj');
  const cepInput = document.getElementById('cep');
  const telefoneInput = document.getElementById('telefoneWhatsapp');
  const cpfInput = document.getElementById('cpfRepresentante');

  if (cnpjInput) {
    cnpjInput.addEventListener('input', (e) => {
      e.target.value = maskCNPJ(e.target.value);
    });
  }

  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      e.target.value = maskCEP(e.target.value);
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      e.target.value = maskPhone(e.target.value);
    });
  }

  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      e.target.value = maskCPF(e.target.value);
    });
  }
}

function maskCNPJ(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/, "$1.$2");
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
  v = v.replace(/(\d{4})(\d)/, "$1-$2");
  return v.substring(0, 18);
}

function maskCEP(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{5})(\d)/, "$1-$2");
  return v.substring(0, 9);
}

function maskPhone(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v.substring(0, 15);
}

function maskCPF(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v.substring(0, 14);
}

/* ==========================================================================
   5. MODAL E VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS
   ========================================================================== */

function showModal(title, message) {
  const modal = document.getElementById('custom-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalMsg = document.getElementById('modal-message');

  if (modal && modalTitle && modalMsg) {
    modalTitle.textContent = title;
    modalMsg.textContent = message;
    modal.classList.add('active');
  }
}

function closeModal() {
  const modal = document.getElementById('custom-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Valida a Etapa 1 (Empresa) impedindo avançar se CNPJ ou Razão Social estiverem vazios
 */
function validateStep1() {
  const cnpj = document.getElementById('cnpj');
  const razaoSocial = document.getElementById('razaoSocial');
  
  let isValid = true;
  let missingFields = [];

  if (cnpj) cnpj.classList.remove('input-error');
  if (razaoSocial) razaoSocial.classList.remove('input-error');

  if (!cnpj || cnpj.value.trim() === '') {
    if (cnpj) cnpj.classList.add('input-error');
    missingFields.push('CNPJ');
    isValid = false;
  }

  if (!razaoSocial || razaoSocial.value.trim() === '') {
    if (razaoSocial) razaoSocial.classList.add('input-error');
    missingFields.push('Razão Social');
    isValid = false;
  }

  if (!isValid) {
    showModal(
      'Campos Obrigatórios',
      `Por favor, preencha o(s) campo(s) obrigatório(s): ${missingFields.join(', ')}.`
    );
  }

  return isValid;
}