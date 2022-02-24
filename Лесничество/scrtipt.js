"use strict"

const texts = document.querySelectorAll(".text");
let height = document.documentElement.clientHeight;
for (let text of texts) {
  if (text.getBoundingClientRect().top +20  <= height) {
    text.style.cssText =
    "animation-name: slidein;\
    \nanimation-duration: 0.6s;\
    \nanimation-timing-function: linear;\
    \nanimation-fill-mode: forwards;";
  }
}

function textAnim() {
  let height = document.documentElement.clientHeight;
  
  for (let i = 0, text = texts[i]; i < texts.length; i++, text = texts[i]) {
    if (text.getBoundingClientRect().top + 20<= height) {
      text.style.cssText =
      "animation-name: slidein;\
      \nanimation-duration: 0.47s;\
      \nanimation-timing-function: linear;\
      \nanimation-fill-mode: forwards;";
      delete texts.i;
      console.log(texts);
    }
  }
  
  if (texts.length === 0) {
    window.removeEventListener("resize", textAnim);
    window.removeEventListener("scroll", textAnim);
  }
}

window.addEventListener("resize", textAnim);
window.addEventListener("scroll", textAnim);    