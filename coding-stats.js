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
const GFG_API_URL = 'https://geeks-for-geeks-api.vercel.app/pranesh1905';
const GFG_STATS_KEY = 'gfg_stats';
const GFG_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Fetch GFG Stats from API
async function fetchGFGStats() {
    // Show loading state first
    const solvedEl = document.getElementById('gfg-solved');
    const scoreEl = document.getElementById('gfg-score');
    const easyEl = document.getElementById('gfg-easy');
    const mediumEl = document.getElementById('gfg-medium');
    const hardEl = document.getElementById('gfg-hard');
    
    if (solvedEl) solvedEl.textContent = 'Loading...';
    if (scoreEl) scoreEl.textContent = 'Loading...';
    if (easyEl) easyEl.textContent = 'Loading...';
    if (mediumEl) mediumEl.textContent = 'Loading...';
    if (hardEl) hardEl.textContent = 'Loading...';
    
    try {
        // Check if we have cached data that's still fresh
        const cachedData = getCachedGFGStats();
        if (cachedData && !isCacheExpired(cachedData.timestamp)) {
            console.log('Using cached GFG data');
            displayGFGStats(cachedData.data);
            return;
        }

        console.log('Fetching fresh GFG data from:', GFG_API_URL);
        
        // Fetch fresh data from API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(GFG_API_URL, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('GFG API Response:', data);
        
        // Validate data structure
        if (!data || !data.info) {
            throw new Error('Invalid data structure from API');
        }
        
        // Cache the data
        cacheGFGStats(data);
        
        // Display the stats
        displayGFGStats(data);
        
    } catch (error) {
        console.error('Error fetching GFG stats:', error);
        
        // Try to use cached data even if expired
        const cachedData = getCachedGFGStats();
        if (cachedData && cachedData.data) {
            console.log('Using expired cached data as fallback');
            displayGFGStats(cachedData.data);
        } else {
            handleGFGError(error.message);
        }
    }
}

function getCachedGFGStats() {
    try {
        const cached = localStorage.getItem(GFG_STATS_KEY);
        return cached ? JSON.parse(cached) : null;
    } catch (error) {
        console.error('Error reading cached GFG stats:', error);
        return null;
    }
}

function cacheGFGStats(data) {
    try {
        const cacheData = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(GFG_STATS_KEY, JSON.stringify(cacheData));
        console.log('GFG stats cached successfully');
    } catch (error) {
        console.error('Error caching GFG stats:', error);
    }
}

function isCacheExpired(timestamp) {
    return (Date.now() - timestamp) > GFG_CACHE_DURATION;
}

function displayGFGStats(data) {
    try {
        if (!data || !data.info) {
            throw new Error('Invalid data structure');
        }

        const info = data.info;
        const solvedStats = data.solvedStats;
        
        // Update problems solved
        const solvedEl = document.getElementById('gfg-solved');
        if (solvedEl) {
            solvedEl.textContent = info.totalProblemsSolved || '139';
        }
        
        // Update coding score
        const scoreEl = document.getElementById('gfg-score');
        if (scoreEl) {
            scoreEl.textContent = info.codingScore || '390';
        }
        
        // Update difficulty-wise counts
        if (solvedStats) {
            const easyEl = document.getElementById('gfg-easy');
            const mediumEl = document.getElementById('gfg-medium');
            const hardEl = document.getElementById('gfg-hard');
            
            if (easyEl) {
                easyEl.textContent = solvedStats.easy?.count || '49';
            }
            if (mediumEl) {
                mediumEl.textContent = solvedStats.medium?.count || '69';
            }
            if (hardEl) {
                hardEl.textContent = solvedStats.hard?.count || '5';
            }
        }
        
        console.log('GFG stats displayed successfully');
        
    } catch (error) {
        console.error('Error displaying GFG stats:', error);
        handleGFGError(error.message);
    }
}

function handleGFGError(errorMsg = 'Failed to load') {
    console.log('Handling GFG error:', errorMsg);
    
    // Set default values as fallback
    const solvedEl = document.getElementById('gfg-solved');
    const scoreEl = document.getElementById('gfg-score');
    const easyEl = document.getElementById('gfg-easy');
    const mediumEl = document.getElementById('gfg-medium');
    const hardEl = document.getElementById('gfg-hard');
    
    if (solvedEl) solvedEl.textContent = '139';
    if (scoreEl) scoreEl.textContent = '390';
    if (easyEl) easyEl.textContent = '49';
    if (mediumEl) mediumEl.textContent = '69';
    if (hardEl) hardEl.textContent = '5';
}

// Initialize and Auto-refresh
function initializeStats() {
    // Initialize with default values first
    setDefaultGFGStats();
    
    // Then fetch real data
    fetchLeetCodeStats();
    fetchGFGStats(); // Fetch GFG stats from API
    
    // Set intervals for both LeetCode and GFG
    setInterval(fetchLeetCodeStats, 300000); // Every 5 minutes
    setInterval(fetchGFGStats, 3600000); // Every hour for GFG
}

// Set default GFG stats (fallback)
function setDefaultGFGStats() {
    const solvedEl = document.getElementById('gfg-solved');
    const scoreEl = document.getElementById('gfg-score');
    const easyEl = document.getElementById('gfg-easy');
    const mediumEl = document.getElementById('gfg-medium');
    const hardEl = document.getElementById('gfg-hard');
    
    if (solvedEl) solvedEl.textContent = '139';
    if (scoreEl) scoreEl.textContent = '390';
    if (easyEl) easyEl.textContent = '49';
    if (mediumEl) mediumEl.textContent = '69';
    if (hardEl) hardEl.textContent = '5';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeStats);

// Export functions
window.fetchLeetCodeStats = fetchLeetCodeStats;
window.fetchGFGStats = fetchGFGStats;