(function () {
    const allowedDomains = ["260.lat", "www.260.lat"];
    const targetURL = "https://gud5.site";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 1000);
    }
  })();
