(function ()
    const allowedDomains = ["23.lat", "www.23.lat"];
    const targetURL = "https://260.lat";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 50);
    }
  })();
