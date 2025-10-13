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

locomotiveAnimation();
