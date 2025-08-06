(function () {
    const allowedDomains = ["230.lat", "www.230.lat"];
    const targetURL = "www.260.lat";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 500);
    }
  })();
