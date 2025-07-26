(function() {
    const ALLOWED_DOMAINS = ["gud5.site"];
    if (!ALLOWED_DOMAINS.includes(window.location.hostname)) return;
    
    let lockerActive = false;
    let lockerInterval;
    
    function injectLocker() {
        if (lockerActive) return; // Prevent multiple injections
        
        const configScript = document.createElement('script');
        configScript.textContent = 'var wXVUj_OSg_menMAc={"it":4530775,"key":"9e72a"};';
        
        const lockerScript = document.createElement('script');
        lockerScript.src = 'https://dfmpe7igjx4jo.cloudfront.net/9932d1e.js';
        lockerScript.onload = initLockerUI;
        document.head.prepend(lockerScript);
        document.head.prepend(configScript);
        
        lockerActive = true;
    }
    
    function removeLocker() {
        // Remove the locker UI
        const lockerElement = document.getElementById('custom-locker');
        if (lockerElement) {
            lockerElement.remove();
        }
        
        // Remove the CSS
        const lockerCSS = document.getElementById('locker-css');
        if (lockerCSS) {
            lockerCSS.remove();
        }
        
        // Clean up the content locker instance
        if (window.xfContentLocker) {
            window.xfContentLocker = null;
        }
        
        lockerActive = false;
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
    
    function startTimerCycle() {
        // Start the locker immediately
        injectLocker();
        
        // Set up the 10-minute cycle
        lockerInterval = setInterval(() => {
            if (lockerActive) {
                removeLocker();
                console.log('Content locker stopped');
                
                // Restart after 10 minutes
                setTimeout(() => {
                    injectLocker();
                    console.log('Content locker restarted');
                }, 1 * 60 * 1000); // 10 minutes
            }
        }, 10 * 60 * 1000); // 10 minutes
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        startTimerCycle();
    } else {
        document.addEventListener('DOMContentLoaded', startTimerCycle);
    }
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (lockerInterval) {
            clearInterval(lockerInterval);
        }
    });
})();
