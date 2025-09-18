// Global variables
let bosses = [];
let history = [];
let isMinimalistMode = false;

// Predefined realm colors
const realmColors = {
    'Realm 1': '#e74c3c',
    'Realm 2': '#3498db', 
    'Realm 3': '#2ecc71',
    'Realm 4': '#f39c12',
    'Realm 5': '#9b59b6'
};

// Load data from localStorage
function loadData() {
    const savedBosses = localStorage.getItem('aberoth-bosses');
    const savedHistory = localStorage.getItem('aberoth-history');
    const savedMinimalistMode = localStorage.getItem('aberoth-minimalist-mode');
    
    if (savedBosses) {
        bosses = JSON.parse(savedBosses);
    }
    
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
    
    if (savedMinimalistMode) {
        isMinimalistMode = JSON.parse(savedMinimalistMode);
        updateMinimalistMode();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('aberoth-bosses', JSON.stringify(bosses));
    localStorage.setItem('aberoth-history', JSON.stringify(history));
    localStorage.setItem('aberoth-minimalist-mode', JSON.stringify(isMinimalistMode));
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Calculate time remaining
function getTimeRemaining(lastDeath, respawnMinutes) {
    if (!lastDeath) return 'Pronto!';
    
    const deathTime = new Date(lastDeath);
    const now = new Date();
    const respawnTime = new Date(deathTime.getTime() + (respawnMinutes * 60 * 1000));
    
    if (now >= respawnTime) {
        return 'Pronto!';
    }
    
    const diff = respawnTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update boss timers
function updateTimers() {
    bosses.forEach(boss => {
        const timerElement = document.querySelector(`[data-boss-id="${boss.id}"] .timer`);
        if (timerElement) {
            const timeRemaining = getTimeRemaining(boss.lastDeath, boss.respawnTime);
            timerElement.textContent = timeRemaining;
            timerElement.className = timeRemaining === 'Pronto!' ? 'timer ready' : 'timer waiting';
        }
    });
}

// Create boss card HTML
function createBossCard(boss) {
    const timeRemaining = getTimeRemaining(boss.lastDeath, boss.respawnTime);
    const isReady = timeRemaining === 'Pronto!';
    
    return `
        <div class="boss-card" data-boss-id="${boss.id}" data-realm="${boss.realm}">
            <div class="boss-card-header">
                <div class="boss-name">${boss.name}</div>
                <div class="realm-name">${boss.realm}</div>
            </div>
            <div class="boss-info">
                <div class="timer ${isReady ? 'ready' : 'waiting'}">${timeRemaining}</div>
                <div class="death-count">Mortes: ${boss.deaths}</div>
            </div>
            <div class="boss-actions">
                <button class="btn-death" onclick="markDeath('${boss.id}')">💀 Marcar Morte</button>
                <button class="btn-remove" onclick="removeBoss('${boss.id}')" title="Remover">🗑️</button>
            </div>
        </div>
    `;
}

// Render boss cards
function renderBosses() {
    const bossGrid = document.getElementById('bossGrid');
    bossGrid.innerHTML = bosses.map(createBossCard).join('');
    
    // Add click event listeners for minimalist mode
    if (isMinimalistMode) {
        bosses.forEach(boss => {
            const card = document.querySelector(`[data-boss-id="${boss.id}"]`);
            if (card) {
                card.addEventListener('click', () => markDeath(boss.id));
            }
        });
    }
    
    updateSummary();
}

// Update summary statistics
function updateSummary() {
    const totalDeaths = bosses.reduce((sum, boss) => sum + boss.deaths, 0);
    const activeBosses = bosses.length;
    
    document.getElementById('totalDeaths').textContent = totalDeaths;
    document.getElementById('activeBosses').textContent = activeBosses;
}

// Mark boss death
function markDeath(bossId) {
    const boss = bosses.find(b => b.id === bossId);
    if (!boss) return;
    
    const now = new Date();
    boss.lastDeath = now.toISOString();
    boss.deaths++;
    
    // Add to history
    history.unshift({
        id: generateId(),
        time: formatTime(now),
        boss: boss.name,
        realm: boss.realm,
        deaths: 1
    });
    
    // Keep only last 50 history entries
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    // Flash animation
    const card = document.querySelector(`[data-boss-id="${bossId}"]`);
    if (card) {
        card.classList.add('flash');
        setTimeout(() => card.classList.remove('flash'), 500);
    }
    
    saveData();
    renderBosses();
    renderHistory();
}

// Remove boss
function removeBoss(bossId) {
    if (confirm('Tem certeza que deseja remover este chefe?')) {
        bosses = bosses.filter(b => b.id !== bossId);
        saveData();
        renderBosses();
    }
}

// Render history
function renderHistory() {
    const historyBody = document.getElementById('historyBody');
    const recentHistory = history.slice(0, 5);
    
    historyBody.innerHTML = recentHistory.map(entry => `
        <tr>
            <td>${entry.time}</td>
            <td>${entry.boss}</td>
            <td>${entry.realm}</td>
            <td>${entry.deaths}</td>
        </tr>
    `).join('');
    
    if (recentHistory.length === 0) {
        historyBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhuma morte registrada ainda</td></tr>';
    }
}

// Toggle minimalist mode
function toggleMinimalistMode() {
    isMinimalistMode = !isMinimalistMode;
    updateMinimalistMode();
    saveData();
}

// Update minimalist mode
function updateMinimalistMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('minimalistToggle');
    
    if (isMinimalistMode) {
        body.classList.add('minimalist-mode');
        toggleBtn.textContent = '📋 Modo Normal';
    } else {
        body.classList.remove('minimalist-mode');
        toggleBtn.textContent = '🎯 Modo Minimalista';
    }
    
    // Re-render to apply click handlers for minimalist mode
    renderBosses();
}

// Show add boss modal
function showAddBossModal() {
    document.getElementById('addBossModal').style.display = 'block';
}

// Hide add boss modal
function hideAddBossModal() {
    document.getElementById('addBossModal').style.display = 'none';
    document.getElementById('addBossForm').reset();
}

// Add new boss
function addBoss(name, realm, respawnTime) {
    const newBoss = {
        id: generateId(),
        name: name,
        realm: realm,
        respawnTime: parseInt(respawnTime),
        deaths: 0,
        lastDeath: null
    };
    
    bosses.push(newBoss);
    saveData();
    renderBosses();
    hideAddBossModal();
}

// Export data to CSV
function exportData() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "Horário,Chefe,Realm,Mortes\n" +
        history.map(entry => `${entry.time},${entry.boss},${entry.realm},${entry.deaths}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aberoth-farm-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// View full history
function viewFullHistory() {
    const historyBody = document.getElementById('historyBody');
    historyBody.innerHTML = history.map(entry => `
        <tr>
            <td>${entry.time}</td>
            <td>${entry.boss}</td>
            <td>${entry.realm}</td>
            <td>${entry.deaths}</td>
        </tr>
    `).join('');
    
    if (history.length === 0) {
        historyBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhuma morte registrada ainda</td></tr>';
    }
}

// Initialize the application
function init() {
    loadData();
    renderBosses();
    renderHistory();
    
    // Set up event listeners
    document.getElementById('minimalistToggle').addEventListener('click', toggleMinimalistMode);
    document.getElementById('addBossBtn').addEventListener('click', showAddBossModal);
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('viewFullHistoryBtn').addEventListener('click', viewFullHistory);
    
    // Modal event listeners
    const modal = document.getElementById('addBossModal');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('addBossForm');
    
    closeBtn.addEventListener('click', hideAddBossModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideAddBossModal();
        }
    });
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = document.getElementById('bossName').value;
        const realm = document.getElementById('realmName').value;
        const respawnTime = document.getElementById('respawnTime').value;
        
        addBoss(name, realm, respawnTime);
    });
    
    // Update timers every second
    setInterval(updateTimers, 1000);
    
    // Configuration button (placeholder)
    document.getElementById('configBtn').addEventListener('click', () => {
        alert('Configurações em desenvolvimento!');
    });
    
    console.log('Aberoth Farm Organizer inicializado!');
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);