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
let navbar = document.querySelector(".navbar");
let lastScroll = 0;

document.body.classList.add("loading");

imagesLoaded(document.body, { background: true }, () => {
  const tl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove("loading");
      initInteractions();
    },
  });
  tl.from(".title h1", {
    y: 200,
    duration: 0.7,
    stagger: 0.2,
  });

  tl.from([img1, img2, img3, img4, outlineBox], {
    scale: 0,
    duration: 2.8,
    opacity: 0,
    stagger: 0.6,
    ease: "power4.out",
    force3d: true,
  });

  tl.from(".outline-text", {
    opacity: 0,
    duration: 0.7,
  });
});

function initInteractions() {
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

  setupDiv(div1, img1, [img2, img3, img4, title]);
  setupDiv(div2, img2, [img1, img3, img4, title]);
  setupDiv(div3, img3, [img1, img2, img4, title]);
  setupDiv(div4, img4, [img1, img2, img3, title]);
}

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
