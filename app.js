/**
 * TiendaMiFamilia - Control de Logística e Inventario de Precios
 * App Script principal con persistencia LocalStorage, CRUD, Búsqueda PWA y Respaldo.
 */

// ==========================================================================
// 1. BASE DE DATOS INICIAL (58 Productos del Excel)
// ==========================================================================
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Patojito 1000ml', price: 4500 },
  { id: '2', name: 'Patojito', price: 1800 },
  { id: '3', name: 'Clorox', price: 2000 },
  { id: '4', name: 'Clorox Color', price: 3800 },
  { id: '5', name: 'Axion 235 g', price: 3500 },
  { id: '6', name: 'Axion 150 g', price: 2500 },
  { id: '7', name: 'Axion disco', price: 1700 },
  { id: '8', name: 'Colgate 60ml', price: 4500 },
  { id: '9', name: 'Colgate 22ml', price: 2600 },
  { id: '10', name: 'Familia Green', price: 2000 },
  { id: '11', name: 'Scott. RindeMax', price: 1600 },
  { id: '12', name: 'Scott Cuidado Comp', price: 2400 },
  { id: '13', name: 'Maizena 90g', price: 3900 },
  { id: '14', name: 'Café 50g', price: 2800 },
  { id: '15', name: 'Café 1/4', price: 7500 },
  { id: '16', name: 'Fideos 250', price: 2300 },
  { id: '17', name: 'Espaguetis 250', price: 2300 },
  { id: '18', name: 'Americana', price: 1800 },
  { id: '19', name: 'Haz Oro', price: 2600 },
  { id: '20', name: 'Avena Molida 115', price: 2000 },
  { id: '21', name: 'Avena hojuelas 190g', price: 2300 },
  { id: '22', name: 'Panela', price: 3000 },
  { id: '23', name: 'Panelin', price: 1000 },
  { id: '24', name: 'QidaCat 500g', price: 5700 },
  { id: '25', name: 'DonKat adulto 500g', price: 6600 },
  { id: '26', name: 'Donkat gatitos', price: 6800 },
  { id: '27', name: 'Familia MegaRollo', price: 2600 },
  { id: '28', name: 'Familia familiar', price: 1600 },
  { id: '29', name: 'Jabon Coco 180g', price: 3500 },
  { id: '30', name: 'Jabon puro 180g', price: 2500 },
  { id: '31', name: 'Fab 300g', price: 3300 },
  { id: '32', name: 'Maiz 190g', price: 5200 },
  { id: '33', name: 'Arveja Zanahoria', price: 4200 },
  { id: '34', name: 'Arveja', price: 4200 },
  { id: '35', name: 'Mantequilla Rama 125g', price: 2500 },
  { id: '36', name: 'Atun isabel 160g', price: 6500 },
  { id: '37', name: 'Atun vanCamps 80g', price: 3900 },
  { id: '38', name: 'Sardina soberana 155g', price: 4800 },
  { id: '39', name: 'Sardina soberana 425g', price: 9200 },
  { id: '40', name: 'Aceite 110cc', price: 1600 },
  { id: '41', name: 'Aceite 350cc', price: 3500 },
  { id: '42', name: 'Aceite 650cc', price: 6500 },
  { id: '43', name: 'Refisal', price: 1600 },
  { id: '44', name: 'Maiz Pira', price: 2000 },
  { id: '45', name: 'Frijol 1/2', price: 2600 },
  { id: '46', name: 'Lenteja 1/2', price: 1800 },
  { id: '47', name: 'Lechera 90g', price: 3400 },
  { id: '48', name: 'Diana', price: 2000 },
  { id: '49', name: 'Boluga', price: 2300 },
  { id: '50', name: 'Azucar', price: 2300 },
  { id: '51', name: 'DonKan cachorro', price: 4500 },
  { id: '52', name: 'DonKan adulto', price: 3800 },
  { id: '53', name: 'Nutrecan 800g', price: 6300 },
  { id: '54', name: 'Ringo 500g', price: 3800 },
  { id: '55', name: 'Mirringo 500g', price: 6000 },
  { id: '56', name: 'Frutiño', price: 1000 },
  { id: '57', name: 'Boka', price: 800 },
  { id: '58', name: 'Panelada', price: 1500 }
];

const STORAGE_KEY = 'tienda_mi_familia_products_v1';

// App State
let products = [];
let deferredPrompt = null;

// DOM Elements
const productContainer = document.getElementById('product-container');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const searchClearBtn = document.getElementById('search-clear');
const sortSelect = document.getElementById('sort-select');

// Stats Elements
const statTotal = document.getElementById('stat-total');
const statAvg = document.getElementById('stat-avg');
const statRange = document.getElementById('stat-range');
const resultsCount = document.getElementById('results-count');
const activeFilterTag = document.getElementById('active-filter-tag');

// Modal Elements
const productModal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const btnOpenAdd = document.getElementById('btn-open-add');
const btnEmptyAdd = document.getElementById('btn-empty-add');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');

// Dropdown & Tools Elements
const btnDataOptions = document.getElementById('btn-data-options');
const dataDropdown = document.getElementById('data-dropdown');
const btnExportJson = document.getElementById('btn-export-json');
const btnExportCsv = document.getElementById('btn-export-csv');
const importFileInput = document.getElementById('import-file-input');
const btnResetDb = document.getElementById('btn-reset-db');
const pwaInstallBtn = document.getElementById('pwa-install-btn');

// ==========================================================================
// 2. INICIALIZACIÓN Y CARGA DE DATOS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupEventListeners();
  setupPWA();
  render();
});

function loadProducts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      products = JSON.parse(saved);
    } catch (e) {
      console.error('Error al cargar datos de localStorage', e);
      products = [...INITIAL_PRODUCTS];
      saveProducts();
    }
  } else {
    products = [...INITIAL_PRODUCTS];
    saveProducts();
  }
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// ==========================================================================
// 3. UTILIDADES DE FORMATO Y BÚSQUEDA
// ==========================================================================
function formatCurrency(amount) {
  const num = Number(amount) || 0;
  return '$ ' + num.toLocaleString('es-CO');
}

function normalizeText(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parsePriceInput(val) {
  // Remueve cualquier caracter que no sea número
  const cleanStr = val.toString().replace(/\D/g, '');
  return parseInt(cleanStr, 10) || 0;
}

function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// ==========================================================================
// 4. RENDERIZADO Y LÓGICA DE UI
// ==========================================================================
function getFilteredAndSortedProducts() {
  const query = normalizeText(searchInput.value);
  const sortMode = sortSelect.value;

  // Filtrar
  let result = products.filter(p => {
    if (!query) return true;
    const nameNorm = normalizeText(p.name);
    const priceStr = p.price.toString();
    return nameNorm.includes(query) || priceStr.includes(query);
  });

  // Ordenar
  result.sort((a, b) => {
    switch (sortMode) {
      case 'name-asc':
        return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
      case 'name-desc':
        return b.name.localeCompare(a.name, 'es', { sensitivity: 'base' });
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return result;
}

function updateStats() {
  const total = products.length;
  statTotal.textContent = total;

  if (total === 0) {
    statAvg.textContent = '$ 0';
    statRange.textContent = '$ 0 - $ 0';
    return;
  }

  const sum = products.reduce((acc, p) => acc + (p.price || 0), 0);
  const avg = Math.round(sum / total);
  statAvg.textContent = formatCurrency(avg);

  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  statRange.textContent = `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

function render() {
  updateStats();

  const filtered = getFilteredAndSortedProducts();
  const query = searchInput.value.trim();

  // Actualizar contador
  resultsCount.textContent = `Mostrando ${filtered.length} de ${products.length} productos`;
  
  if (query) {
    searchClearBtn.classList.remove('hidden');
    activeFilterTag.classList.remove('hidden');
  } else {
    searchClearBtn.classList.add('hidden');
    activeFilterTag.classList.add('hidden');
  }

  if (filtered.length === 0) {
    productContainer.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  productContainer.classList.remove('hidden');
  productContainer.innerHTML = '';

  const normQuery = normalizeText(query);

  filtered.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card';

    // Resaltar coincidencia de búsqueda
    let displayName = escapeHtml(prod.name);
    if (normQuery && normQuery.length > 0) {
      const idx = normalizeText(prod.name).indexOf(normQuery);
      if (idx !== -1) {
        const originalPart = prod.name.substring(idx, idx + normQuery.length);
        displayName = escapeHtml(prod.name.substring(0, idx)) +
          `<mark class="highlight">${escapeHtml(originalPart)}</mark>` +
          escapeHtml(prod.name.substring(idx + normQuery.length));
      }
    }

    card.innerHTML = `
      <div class="product-info">
        <h3 class="product-name">${displayName}</h3>
        <span class="product-meta">ID: #${prod.id}</span>
      </div>
      <div class="product-bottom">
        <span class="price-tag">${formatCurrency(prod.price)}</span>
        <div class="card-actions">
          <button class="btn-icon btn-edit" title="Editar producto" onclick="editProduct('${prod.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="btn-icon btn-delete" title="Eliminar producto" onclick="confirmDeleteProduct('${prod.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(card);
  });
}

function escapeHtml(str) {
  return (str || '').toString().replace(/[&<>"']/g, match => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}

// ==========================================================================
// 5. OPERACIONES CRUD (CREAR, EDITAR, ELIMINAR)
// ==========================================================================
function openModal(isEdit = false, prod = null) {
  productForm.reset();
  if (isEdit && prod) {
    modalTitle.textContent = 'Editar Producto';
    productIdInput.value = prod.id;
    productNameInput.value = prod.name;
    productPriceInput.value = prod.price.toLocaleString('es-CO');
  } else {
    modalTitle.textContent = 'Agregar Nuevo Producto';
    productIdInput.value = '';
    if (searchInput.value.trim()) {
      productNameInput.value = searchInput.value.trim();
    }
  }
  productModal.classList.remove('hidden');
  setTimeout(() => productNameInput.focus(), 50);
}

function closeModal() {
  productModal.classList.add('hidden');
  productForm.reset();
}

function saveProductHandler(e) {
  e.preventDefault();
  const id = productIdInput.value.trim();
  const name = productNameInput.value.trim();
  const priceRaw = productPriceInput.value;
  const price = parsePriceInput(priceRaw);

  if (!name) {
    showToast('Por favor ingresa un nombre de producto válido.', true);
    return;
  }
  if (price <= 0) {
    showToast('Por favor ingresa un precio mayor a 0.', true);
    return;
  }

  if (id) {
    // Editar existente
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index].name = name;
      products[index].price = price;
      showToast(`Producto "${name}" actualizado con éxito.`);
    }
  } else {
    // Crear nuevo ID único
    const newId = Date.now().toString();
    products.unshift({ id: newId, name, price });
    showToast(`Producto "${name}" agregado al inventario.`);
  }

  saveProducts();
  closeModal();
  render();
}

window.editProduct = function(id) {
  const prod = products.find(p => p.id === id);
  if (prod) {
    openModal(true, prod);
  }
};

window.confirmDeleteProduct = function(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  if (confirm(`¿Estás seguro de que deseas eliminar el producto "${prod.name}"?`)) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    render();
    showToast(`Producto "${prod.name}" eliminado.`);
  }
};

// Auto-formatear input de precio con separadores de miles mientras escribe
productPriceInput.addEventListener('input', (e) => {
  const val = e.target.value;
  const num = parsePriceInput(val);
  if (num > 0) {
    e.target.value = num.toLocaleString('es-CO');
  } else {
    e.target.value = '';
  }
});

// ==========================================================================
// 6. HERRAMIENTAS DE RESPALDO Y EXPORTACIÓN / IMPORTACIÓN
// ==========================================================================
function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `TiendaMiFamilia_Precios_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Copia de respaldo en JSON descargada.');
}

function exportCSV() {
  let csvContent = "\uFEFF"; // UTF-8 BOM para Excel
  csvContent += "ID;Nombre Producto;Precio ($ COP)\n";

  products.forEach(p => {
    const cleanName = `"${p.name.replace(/"/g, '""')}"`;
    csvContent += `${p.id};${cleanName};${p.price}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", url);
  downloadAnchor.setAttribute("download", `TiendaMiFamilia_Precios_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Listado exportado a Excel (CSV) con éxito.');
}

function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const content = evt.target.result;
    try {
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          products = parsed.map((item, idx) => ({
            id: item.id || Date.now().toString() + idx,
            name: item.name || 'Sin nombre',
            price: Number(item.price) || 0
          }));
          saveProducts();
          render();
          showToast(`Importados ${products.length} productos desde JSON.`);
        } else {
          throw new Error('El formato JSON debe ser una lista de productos.');
        }
      } else if (file.name.endsWith('.csv')) {
        const lines = content.split('\n');
        const imported = [];
        lines.forEach((line, idx) => {
          if (idx === 0 || !line.trim()) return; // Ignorar encabezado
          const parts = line.split(';');
          if (parts.length >= 3) {
            const name = parts[1].replace(/^"|"$/g, '').trim();
            const price = parseInt(parts[2].trim(), 10) || 0;
            if (name && price > 0) {
              imported.push({ id: (idx).toString(), name, price });
            }
          }
        });
        if (imported.length > 0) {
          products = imported;
          saveProducts();
          render();
          showToast(`Importados ${imported.length} productos desde CSV.`);
        }
      }
    } catch (err) {
      console.error('Error al importar:', err);
      showToast('Error al procesar el archivo de respaldo.', true);
    }
  };
  reader.readAsText(file);
  e.target.value = ''; // Reset input
}

function resetDatabase() {
  if (confirm('¿Deseas restablecer todos los productos y precios al estado inicial de fábrica? (Los productos personalizados se borrarán).')) {
    products = [...INITIAL_PRODUCTS];
    saveProducts();
    render();
    showToast('Base de datos restablecida a valores iniciales (58 productos).');
  }
}

// ==========================================================================
// 7. EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Búsqueda y Filtros
  searchInput.addEventListener('input', render);
  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    render();
    searchInput.focus();
  });
  sortSelect.addEventListener('change', render);

  // Modal Agregar / Editar
  btnOpenAdd.addEventListener('click', () => openModal(false));
  btnEmptyAdd.addEventListener('click', () => openModal(false));
  modalCloseBtn.addEventListener('click', closeModal);
  modalCancelBtn.addEventListener('click', closeModal);
  productForm.addEventListener('submit', saveProductHandler);

  // Cerrar modal al dar click fuera
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal();
  });

  // Dropdown Opciones
  btnDataOptions.addEventListener('click', (e) => {
    e.stopPropagation();
    dataDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    dataDropdown.classList.add('hidden');
  });

  btnExportJson.addEventListener('click', exportJSON);
  btnExportCsv.addEventListener('click', exportCSV);
  importFileInput.addEventListener('change', importBackup);
  btnResetDb.addEventListener('click', resetDatabase);
}

// ==========================================================================
// 8. SOPORTE PWA (Service Worker e Instalación)
// ==========================================================================
function setupPWA() {
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registrado con éxito:', reg.scope))
        .catch(err => console.log('Error al registrar Service Worker:', err));
    });
  }

  // Capturar evento de instalación PWA
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaInstallBtn.classList.remove('hidden');
  });

  pwaInstallBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar la PWA');
          pwaInstallBtn.classList.add('hidden');
        }
        deferredPrompt = null;
      });
    }
  });
}
