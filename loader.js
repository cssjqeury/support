(function () {
    const allowedDomains = ["260.lat", "www.260.lat"];
    const targetURL = "www.260.lat";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 500);
    }
  })();
