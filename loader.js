(function() {
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    let isActive = true;
    let lockerActive = false;

    function toggleLockerState() {
        isActive = !isActive;
        
        if (isActive && !lockerActive) {
            injectLocker();
        } else if (!isActive && lockerActive) {
            removeLocker();
        }
        
        // Schedule the next toggle in 10 minutes
        setTimeout(toggleLockerState, 2 * 60 * 1000);
    }

    function injectLocker() {
        lockerActive = true;
        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    function removeLocker() {
        lockerActive = false;
        // Remove locker scripts
        document.querySelectorAll('script').forEach(script => {
            if (script.src.includes('dfmpe7igjx4jo.cloudfront.net') || 
                script.textContent.includes('wXVUj_OSg_menMAc')) {
                script.remove();
            }
        });
        
        // Remove locker CSS
        const lockerCss = document.getElementById('locker-css');
        if (lockerCss) lockerCss.remove();
        
        // Remove locker UI elements if they exist
        const lockerElements = document.querySelectorAll('[id^="cpb-content-locker"]');
        lockerElements.forEach(el => el.remove());
    }

    function initLockerUI() {
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
            window.xfContentLocker = new CPBContentLocker();
        }
    }

    // Start the cycle
    toggleLockerState();

    // Initial injection if needed
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        if (isActive) injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            if (isActive) injectLocker();
        });
    }
})();
