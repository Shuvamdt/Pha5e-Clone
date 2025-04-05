let div1 = document.querySelector(".div1");
let div2 = document.querySelector(".div2");
let div3 = document.querySelector(".div3");
let div4 = document.querySelector(".div4");
let img1 = document.querySelector(".img1");
let img2 = document.querySelector(".img2");
let img3 = document.querySelector(".img3");
let img4 = document.querySelector(".img4");
let title = document.querySelector(".title");
let imgText = document.querySelectorAll(".img-text, .img1-text");
let outlineBox = document.querySelectorAll(".outline-box");

var tl = gsap.timeline();
tl.from(".title h1", {
  y: 200,
  duration: 1,
  delay: 0.3,
});
tl.from([img1, img2, img3, img4, outlineBox], {
  scale: 0,
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});

let lastScroll = 0;
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 50) {
    gsap.to(navbar, {
      y: -100,
      duration: 0.3,
      ease: "power3.out",
    });
  } else {
    gsap.to(navbar, {
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  }

  lastScroll = currentScroll;
});

function setupDiv(div, img, otherImgs) {
  div.addEventListener("mouseenter", () => {
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });

    gsap.to(otherImgs, {
      opacity: 0,
      duration: 0.1,
    });
    gsap.to(imgText, {
      opacity: 1,
      duration: 0.3,
    });
  });

  div.addEventListener("mousemove", (e) => {
    const bounds = div.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    gsap.to(img, {
      x: x - bounds.width / 2,
      y: y - bounds.height / 2,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  div.addEventListener("mouseleave", () => {
    gsap.to(img, {
      x: 0,
      y: 0,
      duration: 2,
      ease: "power3.out",
    });
    gsap.to(otherImgs, {
      opacity: 1,
      duration: 0.1,
    });
    gsap.to(imgText, {
      opacity: 0,
      duration: 0.3,
    });
  });
}

setupDiv(div1, img1, [img2, img3, img4, title]);
setupDiv(div2, img2, [img1, img3, img4, title]);
setupDiv(div3, img3, [img1, img2, img4, title]);
setupDiv(div4, img4, [img1, img2, img3, title]);

gsap.from(".navbar", {
  scrollTrigger: {
    y: -100,
  },
});
