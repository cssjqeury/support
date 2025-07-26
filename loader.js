(function() {
    // Timing configuration (10 minutes each)
    const ALLOW_PERIOD = 2 * 60 * 1000; // 10 minutes in milliseconds
    const BLOCK_PERIOD = 2 * 60 * 1000;  // 10 minutes in milliseconds
    
    // Calculate current cycle position
    const now = Date.now();
    const cyclePosition = now % (ALLOW_PERIOD + BLOCK_PERIOD);
    
    // Only allow during the first 10 minutes of each 20-minute cycle
    const isAllowedTime = cyclePosition < ALLOW_PERIOD;
    
    // Domain check and timing check
    const ALLOWED_DOMAIN = "gud5.site";
    if (window.location.hostname !== ALLOWED_DOMAIN || !isAllowedTime) return;

    // Main injection function
    function injectLocker() {
        // Create config script
        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        // Create locker script
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        
        // Inject both scripts
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    // Locker initialization
    function initLockerUI() {
        // Inject critical CSS if not exists
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
        
        // Initialize locker
        if (typeof CPBContentLocker === 'function') {
            window.CPABUILDSETTINGS = window.CPABUILDSETTINGS || {
                it: 4530775,
                key: "9e72a"
            };
            window.xfContentLocker = new CPBContentLocker();
        }
    }

    // Start injection when ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', injectLocker);
    }
})();
