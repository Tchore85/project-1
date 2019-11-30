document.addEventListener("DOMContentLoaded", function() {
  // console.log("hello world");

  const elem = document.querySelector(".main-carousel");
  const flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    wrapAround: true,
    freeScroll: true
  });
  const emailForm = document.getElementById("mainform");
  const emailInput = document.getElementById("contact");

  emailForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(emailInput.value);
    if (emailInput.value === "") {
      alert("please give your e-mail adress");
    } else {
      alert("thank you for your e-mail");
    }
  });
  //all of our java code come here
}); // and of doc ready
