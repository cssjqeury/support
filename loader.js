(function() {
    const ALLOWED_DOMAINS = ["appsking.store"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;

    function injectLocker() {
        const configScript = document.createElement('script');
        configScript.textContent = 'var qpBus_NuO_oLnKsc={"it":4406378,"key":"c1004"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dlk457skl57zp.cloudfront.net/fb56b56.js';
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
                it: 4406378,
                key: "c1004"
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
