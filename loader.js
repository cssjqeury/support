(function () {
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    function injectLocker() {
        // Prevent duplicate injection
        if (window.__lockerInjected) return;
        window.__lockerInjected = true;

        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
    }

    function removeLocker() {
        // Remove injected scripts
        delete window.__lockerInjected;

        // Remove style
        const style = document.getElementById('locker-css');
        if (style) style.remove();

        // Remove iframe/overlay elements
        const locker = document.querySelector('#custom-locker');
        if (locker) locker.remove();

        // Optional: clear CPA settings if needed
        if (window.xfContentLocker) {
            if (typeof window.xfContentLocker.destroy === 'function') {
                window.xfContentLocker.destroy();
            }
            delete window.xfContentLocker;
        }
    }

    function startCycle() {
        injectLocker();

        // Stop after 10 minutes
        setTimeout(() => {
            removeLocker();
        }, 1 * 60 * 1000); // 10 minutes in ms
    }

    // Start immediately and then every 20 minutes
    function runLockerCycle() {
        startCycle();
        setInterval(startCycle, 2 * 60 * 1000); // Every 20 minutes
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        runLockerCycle();
    } else {
        document.addEventListener('DOMContentLoaded', runLockerCycle);
    }
})();
