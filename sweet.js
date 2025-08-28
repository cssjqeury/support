// Firebase calling
const firebaseConfig = {
  apiKey: "AIzaSyDYjy0DcHvOOj3UfM_qqxwA8uDTS-U5OeE",
  authDomain: "landing-analytics-tracke-8017e.firebaseapp.com",
  databaseURL: "https://landing-analytics-tracke-8017e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "landing-analytics-tracke-8017e",
  storageBucket: "landing-analytics-tracke-8017e.firebasestorage.app",
  messagingSenderId: "582980492061",
  appId: "1:582980492061:web:8f0a8751043217dbd0dff4"
};

let firebaseReady = false;
let hasTracked = false; // Flag to prevent multiple tracking calls

function loadFirebase() {
    return new Promise(resolve => {
        if (typeof firebase !== 'undefined') return resolve();
        
        const s1 = document.createElement('script');
        s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
        s1.onload = () => {
            const s2 = document.createElement('script');
            s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
            s2.onload = resolve;
            document.head.appendChild(s2);
        };
        document.head.appendChild(s1);
    });
}

function getReferrerSource(referrer) {
    if (!referrer) return 'Direct';
    
    try {
        const hostname = new URL(referrer).hostname;
        
        const socialDomains = [
            'facebook.com', 'twitter.com', 'instagram.com', 
            'linkedin.com', 'tiktok.com', 'pinterest.com',
            'reddit.com', 'youtube.com'
        ];
        
        const searchEngines = [
            'google.', 'bing.com', 'yahoo.com', 'duckduckgo.com',
            'baidu.com', 'yandex.com'
        ];
        
        if (socialDomains.some(domain => hostname.includes(domain))) return hostname;
        if (searchEngines.some(engine => hostname.includes(engine))) return hostname;
        
        return hostname;
    } catch (e) {
        return referrer;
    }
}

// Generate a unique visitor ID based on browser fingerprint
function generateVisitorId() {
    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        new Date().getTimezoneOffset(),
        window.location.hostname
    ].join('|');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
}

// Check if visitor has been tracked today
function hasVisitedToday() {
    const visitorId = generateVisitorId();
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit_' + visitorId);
    
    return lastVisit === today;
}

// Mark visitor as tracked for today
function markAsVisited() {
    const visitorId = generateVisitorId();
    const today = new Date().toDateString();
    localStorage.setItem('lastVisit_' + visitorId, today);
}

async function trackVisitor() {
    try {
        // Prevent multiple tracking in same session
        if (hasTracked) return;
        
        // Check if already tracked today
        if (hasVisitedToday()) return;
        
        if (!firebaseReady) {
            await loadFirebase();
            firebase.initializeApp(firebaseConfig);
            firebaseReady = true;
        }

        // Dashboard-compatible data structure
        const visitorData = {
            domain: window.location.hostname,
            url: window.location.href,
            referrer: getReferrerSource(document.referrer),
            userAgent: navigator.userAgent,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            visitorId: generateVisitorId(), // Add unique visitor ID
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            deviceType: /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
        };

        // Get geolocation data (required by dashboard)
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const locationData = await response.json();
                visitorData.ip = locationData.ip;
                visitorData.country = locationData.country_name;
                visitorData.countryCode = locationData.country_code;
                visitorData.city = locationData.city;
                visitorData.region = locationData.region;
                visitorData.latitude = locationData.latitude;
                visitorData.longitude = locationData.longitude;
                visitorData.timezone = locationData.timezone;
                visitorData.isp = locationData.org;
            }
        } catch (geoError) {
            visitorData.ip = 'Unknown';
            visitorData.country = 'Unknown';
            visitorData.city = 'Unknown';
        }

        // Send to Firebase (dashboard expects 'visitors' ref)
        await firebase.database().ref('visitors').push(visitorData);
        
        // Mark as tracked
        hasTracked = true;
        markAsVisited();

    } catch (error) {
        // Fail silently as per dashboard requirements
    }
}

// Bot detection (dashboard compatible)
function shouldTrack() {
    const botPatterns = [
        /bot/i, /spider/i, /crawler/i, /curl/i, /wget/i,
        /googlebot/i, /bingbot/i, /slurp/i, /duckduckbot/i
    ];
    return !botPatterns.some(pattern => pattern.test(navigator.userAgent));
}

// Initialize tracking (only once per session)
if (shouldTrack()) {
    setTimeout(trackVisitor, 1000);
    
    // Remove the visibility change event listener to prevent multiple tracking
    // If you want to track page focus, use a different approach like updating last seen time
