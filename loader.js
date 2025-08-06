  (function () {
    const allowedDomains = ["20.lat", "www.20.lat"]; // your domains here
    const targetURL = "https://260.lat";

    if (allowedDomains.includes(location.hostname)) {
      location.href = targetURL;
    }
  })();
