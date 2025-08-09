(function () {
    const allowedDomains = ["20.lat", "www.23.lat"];
    const targetURL = "https://260.lat";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 0);
    }
  })();
