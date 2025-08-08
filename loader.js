(function ()
    const allowedDomains = ["gud5.site"];
    const targetURL = "https://260.lat";

    if (allowedDomains.includes(location.hostname)) {
      setTimeout(function () {
        location.href = targetURL;
      }, 50);
    }
  })();
