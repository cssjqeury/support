(function() {
    // 1. Domain check first (fail fast)
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    let isActive = true;
    let lockerActive = false;
    const CYCLE_DURATION = 2 * 60 * 1000; // 10 minutes in milliseconds

    // Main control function
    function controlCycle() {
        if (isActive) {
            if (!lockerActive) {
                injectLocker();
                lockerActive = true;
            }
        } else {
            if (lockerActive) {
                removeLocker();
                lockerActive = false;
            }
        }
        
        // Toggle state after 10 minutes
        isActive = !isActive;
        
        // Schedule next state change
        setTimeout(controlCycle, CYCLE_DURATION);
    }

    // 2. Main injection function
    function injectLocker() {
        // 3. Create config script
        const configScript = document.createElement('script');
        configScript.id = 'locker-config';
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        // 4. Create locker script
        const lockerScript = document.createElement('script');
        lockerScript.id = 'locker-script';
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        
        // 5. Inject both scripts
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    // Function to remove locker
    function removeLocker() {
        // Remove scripts
        const configScript = document.getElementById('locker-config');
        const lockerScript = document.getElementById('locker-script');
        if (configScript) configScript.remove();
        if (lockerScript) lockerScript.remove();
        
        // Remove locker UI if exists
        const lockerUI = document.getElementById('custom-locker');
        if (lockerUI) lockerUI.remove();
        
        // Remove CSS
        const lockerCSS = document.getElementById('locker-css');
        if (lockerCSS) lockerCSS.remove();
        
        // Clean up global objects
        if (window.xfContentLocker) {
            window.xfContentLocker = null;
        }
    }

    // 6. Locker initialization
    function initLockerUI() {
        // 7. Inject critical CSS if not exists
        if (!document.getElementById('locker-css')) {
            const css = `#custom-locker {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: 999999 !important;
                background: #fff !important;
            }`;
            const style = document.createElement('style');
            style.id = 'locker-css';
            style.textContent = css;
            document.head.appendChild(style);
        }
        
        // 8. Initialize locker
        if (typeof CPBContentLocker === 'function') {
            window.CPABUILDSETTINGS = window.CPABUILDSETTINGS || {
                it: 4530775,
                key: "9e72a"
            };
            window.xfContentLocker = new CPBContentLocker();
        }
    }

    // Start the cycle
    controlCycle();

    // Initial injection when ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        if (isActive) injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            if (isActive) injectLocker();
        });
    }
})();
