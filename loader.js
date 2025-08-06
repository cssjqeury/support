(function () {
    const allowedDomains = ["260.lat", "www.260.lat"]; // ✅ Replace with your domain(s)
    const targetURL = "https://gud5.site";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 1000); // ⏱️ 1000ms = 1 second
    }
  })();
