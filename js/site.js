(function () {
  var CHECKOUT = "https://zadeyo.com/go/AREEBA?to=%2Fproducts%2Fdota-2-novaxware";
  document.querySelectorAll(".checkout-link").forEach(function (link) {
    link.setAttribute("href", CHECKOUT);
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = CHECKOUT;
    });
  });

  var toggle = document.getElementById("nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
