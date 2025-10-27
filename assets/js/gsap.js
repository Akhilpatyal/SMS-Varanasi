function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.08,
    tablet: { smooth: true },
    smartphone: { smooth: true },
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const titleAnims = document.querySelectorAll(".title-anim");
  titleAnims.forEach((titleAnim) => {
    const splitText = new SplitType(titleAnim, { types: "words, chars" });
    const chars = splitText.chars;

    gsap.set(chars, { display: "inline-block" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleAnim,
        start: "top 90%",
        end: "bottom 50%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    tl.from(chars, {
      x: 40,
      autoAlpha: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "back.out",
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".titleanimate-2");

  headings.forEach((heading) => {
    const split = new SplitType(heading, { types: "chars" });

    gsap.from(split.chars, {
      autoAlpha: 0,
      yPercent: 150,
      duration: 2,
      ease: "power2",
      stagger: {
        each: 0.02,
        from: "random",
      },
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });
});


// ✅ Register GSAP & ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ✅ Select all reveal containers
const revealContainers = document.querySelectorAll("[data-image-reveal]");
revealContainers.forEach((container) => {
  const image = container.querySelector("img");

  // ✅ Create a timeline for each container
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",      // adjust scroll start point
      toggleActions: "play none none reset",
    },
  });

  tl.set(container, { autoAlpha: 1 });

  // Slide the container from left to right
  tl.from(container, {
    xPercent: -100,
    duration: 1.5,
    ease: "power2.out",
  });

  // Reveal the image in opposite direction
  tl.from(
    image,
    {
      xPercent: 100,
      scale: 1.3,
      duration: 1.5,
      ease: "power2.out",
    },
    "<" // starts at same time as previous animation
  );
});


// image zoom
gsap.utils.toArray(".scroll-grow-img").forEach((img) => {
  // Set initial state
  gsap.set(img, { width: "70%" });

  gsap.to(img, {
    width: "100%",
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img,
      start: "top 80%",   // animation starts when image enters viewport
      end: "top 20%",     // animation ends when you scroll further up
      scrub: true,        // smooth scroll-based transition
      toggleActions: "play none none reverse", // reverses on scroll up
    },
  });
});


locomotiveAnimation();
