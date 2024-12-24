// LeetCode Stats
async function fetchLeetCodeStats() {
    try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/pranesh_19');
        const data = await response.json();
        updateLeetCodeDisplay(data);
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        handleLeetCodeError();
    }
}

function updateLeetCodeDisplay(data) {
    document.getElementById('leetcode-solved').textContent = data.totalSolved || '0';
    document.getElementById('leetcode-rate').textContent = (data.acceptanceRate || '0') + '%';
    document.getElementById('leetcode-easy').textContent = data.easySolved || '0';
    document.getElementById('leetcode-medium').textContent = data.mediumSolved || '0';
    document.getElementById('leetcode-hard').textContent = data.hardSolved || '0';
}

function handleLeetCodeError() {
    const errorText = 'Error loading';
    const elements = ['solved', 'rate', 'easy', 'medium', 'hard'];
    elements.forEach(id => {
        document.getElementById(`leetcode-${id}`).textContent = errorText;
    });
}

// GFG Stats Management
const GFG_STATS_KEY = 'gfg_stats';

function getGFGStats() {
    const stats = localStorage.getItem(GFG_STATS_KEY);
    return stats ? JSON.parse(stats) : {
        problemsSolved: 150,
        codingScore: 300,
        lastUpdated: new Date().toISOString()
    };
}

function updateGFGStats(problemsSolved, codingScore) {
    if (!problemsSolved || !codingScore) return;
    
    const stats = {
        problemsSolved: parseInt(problemsSolved),
        codingScore: parseInt(codingScore),
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(GFG_STATS_KEY, JSON.stringify(stats));
    displayGFGStats();
}

function displayGFGStats() {
    const stats = getGFGStats();
    document.getElementById('gfg-solved').textContent = stats.problemsSolved;
    document.getElementById('gfg-score').textContent = stats.codingScore;
    
    const lastUpdated = new Date(stats.lastUpdated).toLocaleString();
    if (document.getElementById('gfg-last-updated')) {
        document.getElementById('gfg-last-updated').textContent = `Last updated: ${lastUpdated}`;
    }
}
function shouldRefreshGFGStats() {
    const stats = getGFGStats();
    if (!stats.lastUpdated) return true;
    
    const lastUpdate = new Date(stats.lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60);
    
    return hoursSinceUpdate >= 24; // Refresh if last update was 24+ hours ago
}

function autoRefreshGFGStats() {
    if (shouldRefreshGFGStats()) {
        document.getElementById('gfg-solved').textContent = 'Needs update';
        document.getElementById('gfg-score').textContent = 'Needs update';
        document.getElementById('gfg-last-updated').textContent = 'Please update stats';
    }
}


// Manual update handler for GFG
window.updateGFGStatsHandler = function() {
    const currentStats = getGFGStats();
    const problemsSolved = prompt('Enter number of problems solved:', currentStats.problemsSolved);
    const codingScore = prompt('Enter coding score:', currentStats.codingScore);
    
    if (problemsSolved !== null && codingScore !== null) {
        updateGFGStats(problemsSolved, codingScore);
    }
};

// Initialize and Auto-refresh
function initializeStats() {
    fetchLeetCodeStats();
    displayGFGStats();
    
    // Set intervals for both LeetCode and GFG
    setInterval(fetchLeetCodeStats, 300000); // Every 5 minutes
    setInterval(autoRefreshGFGStats, 3600000); // Every hour
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeStats);

// Export functions
window.fetchLeetCodeStats = fetchLeetCodeStats;
window.updateGFGStats = updateGFGStats;