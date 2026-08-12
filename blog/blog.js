(() => {
  const blogRoot = document.querySelector("#soro-blog");
  if (!blogRoot) return;

  function markBrokenImage(image) {
    const card = image.closest(".soro-blog-card");
    image.classList.add("is-broken");
    if (card) card.classList.add("has-image-fallback");
  }

  function prepareImages() {
    blogRoot.querySelectorAll(".soro-blog-card-image").forEach((image) => {
      if (image.dataset.redjobImageReady) return;
      image.dataset.redjobImageReady = "true";
      image.addEventListener("error", () => markBrokenImage(image));
      if (image.complete && image.naturalWidth === 0) markBrokenImage(image);
    });
  }

  prepareImages();
  new MutationObserver(prepareImages).observe(blogRoot, { childList: true, subtree: true });
})();
