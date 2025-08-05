<script>
// Allowed domains that should follow the 5min ON/OFF rule
const ALLOWED_DOMAINS = ["www.260.lat"]; // 🔄 Replace with your domain(s)

// Check if current domain is allowed
if (ALLOWED_DOMAINS.includes(window.location.hostname)) {
    // Get current timestamp in minutes
    const now = new Date();
    const currentMinute = Math.floor(now.getTime() / 1000 / 60); // Unix time in minutes
    
    // Toggle every 5 minutes (even minutes = ON, odd = OFF)
    const isRedirectActive = Math.floor(currentMinute / 1) % 2 === 0;
    
    // Redirect if in the "ON" 5-minute window
    if (isRedirectActive) {
        window.location.href = "https://gud5.site";
    }
    // Otherwise, do nothing (visitor sees normal page)
}
</script>
