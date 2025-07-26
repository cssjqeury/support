(function() {
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    let isActive = true;
    let lockerInstance = null;
    let cycleInterval;

    function cleanupLocker() {
        // Remove locker instance if it exists
        if (lockerInstance) {
            try {
                lockerInstance.destroy();
                lockerInstance = null;
            } catch(e) {
                console.error('Error destroying locker:', e);
            }
        }
        
        // Remove the CSS
        const lockerCss = document.getElementById('locker-css');
        if (lockerCss) lockerCss.remove();
        
        // Remove any script tags we added
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src.includes('dfmpe7igjx4jo.cloudfront.net') || 
                script.textContent.includes('wXVUj_OSg_menMAc')) {
                script.remove();
            }
        });
    }

    function injectLocker() {
        if (!isActive) return;

        cleanupLocker(); // Clean up any previous instances

        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    function initLockerUI() {
        if (!isActive) {
            cleanupLocker();
            return;
        }

        if (!document.getElementById('locker-css')) {
            const css = `#custom-locker {position: fixed !important;top: 0 !important;left: 0 !important;width: 100% !important;height: 100% !important;z-index: 999999 !important;background: #fff !important;}`;
            const style = document.createElement('style');
            style.id = 'locker-css';
            style.textContent = css;
            document.head.appendChild(style);
        }
        
        if (typeof CPBContentLocker === 'function') {
            window.CPABUILDSETTINGS = window.CPABUILDSETTINGS || {
                it: 4530775,
                key: "9e72a"
            };
            lockerInstance = new CPBContentLocker();
        }
    }

    function toggleLocker() {
        isActive = !isActive;
        console.log(`Locker is now ${isActive ? 'ACTIVE' : 'INACTIVE'}`);
        
        if (isActive) {
            injectLocker();
        } else {
            cleanupLocker();
        }
    }

    // Start the 10-minute cycle
    function startCycling() {
        // Initial state is active (first 10 minutes)
        injectLocker();
        
        // Set up the 10-minute toggle
        cycleInterval = setInterval(toggleLocker, 1 * 60 * 1000); // 10 minutes in milliseconds
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        startCycling();
    } else {
        document.addEventListener('DOMContentLoaded', startCycling);
    }

    // Clean up when the window is closed
    window.addEventListener('beforeunload', function() {
        clearInterval(cycleInterval);
        cleanupLocker();
    });
})();
