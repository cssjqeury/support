(function() {
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    let isActive = true;
    let lockerActive = false;
    let cycleTimer;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    function toggleLockerState() {
        clearTimeout(cycleTimer);
        
        if (isActive && !lockerActive) {
            injectLocker();
        } else if (!isActive && lockerActive) {
            removeLocker();
        }
        
        isActive = !isActive;
        cycleTimer = setTimeout(toggleLockerState, 10 * 60 * 1000);
    }

    function injectLocker() {
        console.log('Attempting to inject locker...');
        lockerActive = true;
        retryCount = 0;
        
        // Clear any previous locker first
        removeLocker();

        // Inject configuration
        const configScript = document.createElement('script');
        configScript.id = 'locker-config';
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        document.head.prepend(configScript);

        // Inject locker script
        const lockerScript = document.createElement('script');
        lockerScript.id = 'locker-script';
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        
        lockerScript.onload = function() {
            console.log('Locker script loaded successfully');
            initLockerUI();
            checkLockerVisibility();
        };
        
        lockerScript.onerror = function() {
            console.error('Failed to load locker script');
            if (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(`Retrying... (${retryCount}/${MAX_RETRIES})`);
                setTimeout(injectLocker, 5000);
            } else {
                console.error('Max retries reached, giving up');
                lockerActive = false;
            }
        };
        
        document.head.prepend(lockerScript);
    }

    function checkLockerVisibility() {
        // Check if locker is actually visible
        const checkInterval = setInterval(() => {
            if (document.querySelector('#cpb-content-locker')) {
                console.log('Locker is visible on page');
                clearInterval(checkInterval);
            } else {
                console.log('Locker not visible yet, waiting...');
                // If after 10 seconds locker isn't visible, try reinitializing
                setTimeout(() => {
                    if (!document.querySelector('#cpb-content-locker')) {
                        console.log('Locker still not visible, reinitializing...');
                        initLockerUI();
                    }
                }, 10000);
            }
        }, 1000);
    }

    function initLockerUI() {
        console.log('Initializing locker UI...');
        
        // Inject CSS if not present
        if (!document.getElementById('locker-css')) {
            const css = `
                #cpb-content-locker {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    z-index: 999999 !important;
                    background: rgba(0,0,0,0.8) !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
            `;
            const style = document.createElement('style');
            style.id = 'locker-css';
            style.textContent = css;
            document.head.appendChild(style);
        }
        
        // Initialize locker if the class is available
        if (typeof CPBContentLocker === 'function') {
            console.log('CPBContentLocker function found, initializing...');
            window.CPABUILDSETTINGS = window.CPABUILDSETTINGS || {
                it: 4530775,
                key: "9e72a"
            };
            
            try {
                window.xfContentLocker = new CPBContentLocker();
                console.log('Locker initialized successfully');
            } catch (e) {
                console.error('Error initializing locker:', e);
            }
        } else {
            console.warn('CPBContentLocker function not found yet');
        }
    }

    function removeLocker() {
        console.log('Removing locker...');
        lockerActive = false;
        
        // Remove scripts
        const configScript = document.getElementById('locker-config');
        const lockerScript = document.getElementById('locker-script');
        if (configScript) configScript.remove();
        if (lockerScript) lockerScript.remove();
        
        // Remove CSS
        const lockerCss = document.getElementById('locker-css');
        if (lockerCss) lockerCss.remove();
        
        // Remove locker elements
        const lockerElements = document.querySelectorAll('[id^="cpb-content-locker"], .cpb-content-locker');
        lockerElements.forEach(el => el.remove());
        
        // Clean up global objects
        if (window.xfContentLocker) {
            try {
                window.xfContentLocker.destroy();
            } catch (e) {
                console.error('Error destroying locker:', e);
            }
            delete window.xfContentLocker;
        }
    }

    // Start the cycle
    console.log('Starting locker cycle (10 minutes on/off)');
    toggleLockerState();

    // Initial injection
    function initialize() {
        if (isActive) {
            injectLocker();
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }
})();
