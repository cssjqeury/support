  (function () {
    const allowedDomains = ["230.lat", "www.230.lat"]; // your domains here
    const targetURL = "https://260.lat";

    if (allowedDomains.includes(location.hostname)) {
      location.href = targetURL;
    }
  })();
