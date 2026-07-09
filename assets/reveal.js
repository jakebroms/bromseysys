(function () {
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealTargets = document.querySelectorAll(".reveal, .reveal-group");

  if (prefersReduced || !("IntersectionObserver" in window) || !revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  var counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-counter"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
    var duration = 900;
    var start = null;

    if (prefersReduced || isNaN(target)) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if (!("IntersectionObserver" in window) || prefersReduced) {
    counters.forEach(animateCounter);
  } else {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }
})();
