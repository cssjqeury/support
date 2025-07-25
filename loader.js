(function() {
    const ALLOWED_DOMAINS = ["appsking.store"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    function injectLocker() {
        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
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

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        injectLocker();
    } else {
        document.addEventListener('DOMContentLoaded', injectLocker);
    }
})();
