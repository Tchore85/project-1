document.addEventListener("DOMContentLoaded", function() {
  console.log("hello world");

  const elem = document.querySelector(".main-carousel");
  const flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    wrapAround: true,
    freeScroll: true
  });

  //all of our java code come here
}); // and of doc ready
