(function() {
    // 1. Domain check first (fail fast)
    const ALLOWED_DOMAINS = ["www.230.lat"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    // 2. Main injection function
    function injectLocker() {
        // 3. Create config script
        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        // 4. Create locker script
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        
        // 5. Inject both scripts
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
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

    // 9. Start injection when ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', injectLocker);
    }
})();
