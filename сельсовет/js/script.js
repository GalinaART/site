"use strict"

function doAndAddEventListener(event, action, subject = window) {
    action();
    subject.addEventListener(event, action);
}



const mainElem = document.documentElement;

const background = document.querySelector(".background");

const page = document.querySelector(".page");
const pageBlocks = document.querySelectorAll(".page > div");

const texts = document.querySelectorAll(".text");
let textsArr = [];
for (let text of texts) {
	textsArr.push(text);
}

const frontViewImage = document.querySelector(".front_view__image");
const circles = document.querySelectorAll(".image_control__position > .image_control__circle");



function boxShadowOfBackground() {
	let shadow = mainElem.clientWidth * 0.2;
	
	background.style.boxShadow = `inset 0 0 ${shadow}px ${shadow/10}px black`;
}

function paddingOfPage() {	
  	page.style.paddingBottom = `${mainElem.clientWidth * 0.03}px`;
	
	if (mainElem.clientWidth < parseInt("500px")) {
		let minorPadding = (mainElem.clientWidth - 380) / 2;

		if (minorPadding > 0) {
			page.style.paddingLeft = page.style.paddingRight = `${minorPadding}px`;
		} else {
			page.style.paddingLeft = page.style.paddingRight = "0px";
		}
	} else {
		page.style.paddingLeft = page.style.paddingRight = `${mainElem.clientWidth * (0.12)}px`;
	}
}

function marginOfPageBlocks() {
	let margBottom = mainElem.clientWidth * 0.02;
	
	pageBlocks[0].style.marginBottom = margBottom / 2 + "px";
	pageBlocks[1].style.marginBottom = margBottom + "px";
	pageBlocks[2].style.marginBottom = margBottom * 2.666 + "px";
}

function textAnim() {
    for (let i = 0, text = textsArr[i]; i < textsArr.length; text = textsArr[i]) {
        if (text.getBoundingClientRect().top + (mainElem.clientHeight * 0.05) < mainElem.clientHeight) {
            text.style.cssText =
            `animation-name: text_anim_0${Math.floor(Math.random() * (3)) + 1};\
            \nanimation-duration: 0.47s;\
            \nanimation-timing-function: linear;\
            \nanimation-fill-mode: forwards;`;
            textsArr.splice(i, 1);
        } else {
        	i++;
        }
    }
  
    if (textsArr.length === 0) {
        window.removeEventListener("resize", textAnim);
        window.removeEventListener("scroll", textAnim);
    }
}

function circleSize() {
	let circleSize = parseFloat(getComputedStyle(frontViewImage).width) * 0.02;

	for (let circle of circles) {
		circle.style.cssText = circle.style.cssText =
		`width: ${circleSize}px;\
		\nheight: ${circleSize}px;`;
	}
}


doAndAddEventListener("resize", boxShadowOfBackground);
doAndAddEventListener("resize", paddingOfPage);
doAndAddEventListener("resize", marginOfPageBlocks);
function startOnLoad0() {
	setTimeout(doAndAddEventListener, 250, "resize", textAnim);
	setTimeout(doAndAddEventListener, 250, "scroll", textAnim);
	window.removeEventListener("load", startOnLoad0);
}
window.addEventListener("load", startOnLoad0);
doAndAddEventListener("resize", circleSize);



//Рандомная установка анимации
/*for (let block of pageBlocks) {
	block.style.animationName = `switch_bgs__0${Math.floor(Math.random() * (6)) + 1}`;
}*/

//Рандомная установка анимации без повторений (сценариев, а не начальных цветов)
function randomColorsSet() {
	let alreadyUsed = [false, false, false, false, false, false];
	let randomSeq;
	for (let block of pageBlocks) {
		do {
			randomSeq = Math.floor(Math.random() * (6)) + 1;
		} while (alreadyUsed[randomSeq - 1] === true);
		alreadyUsed[randomSeq - 1] = true;
		block.style.animationName = `switch_bgs__0${randomSeq}`;
	}
}

randomColorsSet();



/*Установка высоты под самое высокое изображение*/
doAndAddEventListener("resize", function() {
	// 3 : 4
	frontViewImage.style.height = `${parseFloat(getComputedStyle(frontViewImage).width) * 0.75}px`;
});


const lastImage = 2;
function switchPos(pos) {
	if (pos < 0) {
		return lastImage;
	} else if (pos > lastImage) {
		return 0;
	} else {
		return pos;
	}
}
let currentImage = document.querySelector(".current_img");
let currentCircle = document.querySelector(".filled_circle");
const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
let currentImageHeight;
let imageMarginTopME, imageMarginTopML;

function imageMouseEnter() {
	currentImage.style.marginTop = imageMarginTopME;
	currentImage.classList.remove("imageMouseLeave");
	currentImage.classList.add("imageMouseEnter");
}
function imageMouseLeave() {
	currentImage.style.marginTop = imageMarginTopML;
	currentImage.classList.remove("imageMouseEnter");
	currentImage.classList.add("imageMouseLeave");
}
function startOnLoad1() {
    imageMarginTopME = `${(parseFloat(getComputedStyle(frontViewImage).height) - parseFloat(getComputedStyle(currentImage).height)) / 2}px`;
    imageMarginTopML = `${(parseFloat(getComputedStyle(frontViewImage).height) - parseFloat(getComputedStyle(currentImage).height) * 0.97) / 2}px`;
	frontViewImage.addEventListener("mouseenter", imageMouseEnter);
	doAndAddEventListener("mouseleave", imageMouseLeave, frontViewImage);
	window.removeEventListener("load", startOnLoad1);
}
window.addEventListener("load", startOnLoad1);

function arrowClickTemplate(k) {
    frontViewImage.removeEventListener("mouseenter", imageMouseEnter);
    frontViewImage.removeEventListener("mouseleave", imageMouseLeave);

    currentImage.classList.remove("current_img");
    currentImage.classList.add("hidden_img");
    currentImage.classList.remove("imageMouseLeave");
    currentImage.classList.add("imageMouseEnter");
    
    currentCircle.classList.remove("filled_circle");
    currentCircle.classList.add("empty_circle");
    
    let leftImagePos = switchPos(parseInt(currentImage.getAttribute("pos")) + k);
    currentImage = document.querySelector(`.front_view__image__img[pos="${leftImagePos}"]`);
    currentCircle = document.querySelector(`.image_control__circle[pos="${leftImagePos}"]`);
    
    currentCircle.classList.remove("empty_circle");
    currentCircle.classList.add("filled_circle");
    
    currentImage.classList.remove("hidden_img");
    currentImage.classList.add("current_img");
    currentImageHeight = parseFloat(getComputedStyle(currentImage).height);
    imageMarginTopME = `${(parseFloat(getComputedStyle(frontViewImage).height) - currentImageHeight) / 2}px`;
    imageMarginTopML = `${(parseFloat(getComputedStyle(frontViewImage).height) - currentImageHeight * 0.97) / 2}px`;

    imageMouseEnter();

    frontViewImage.addEventListener("mouseenter", imageMouseEnter);
    frontViewImage.addEventListener("mouseleave", imageMouseLeave);
}
frontViewImage.addEventListener("click", function(event) {
    if (event.target.closest(".arrow")) {
        if (event.target.closest(".arrow").classList.contains("left_arrow")) {
            arrowClickTemplate(-1);
        } else {
            arrowClickTemplate(1);
        }
    }
});

window.addEventListener("resize", function() {
    frontViewImage.removeEventListener("mouseenter", imageMouseEnter);
    frontViewImage.removeEventListener("mouseleave", imageMouseLeave);
    
    currentImage.style.transitionDuration = "0ms";

    currentImage.classList.remove("imageMouseEnter");
    currentImage.classList.add("imageMouseLeave");

    imageMarginTopML = `${(parseFloat(getComputedStyle(frontViewImage).height) - parseFloat(getComputedStyle(currentImage).height)) / 2}px`;
    imageMarginTopME = `${(parseFloat(getComputedStyle(frontViewImage).height) - parseFloat(getComputedStyle(currentImage).height) * 100/97) / 2}px`;
    
    currentImage.style.marginTop = imageMarginTopML;

    currentImage.style.transitionDuration = "500ms";

    frontViewImage.addEventListener("mouseenter", imageMouseEnter);
    frontViewImage.addEventListener("mouseleave", imageMouseLeave);
});



frontViewImage.addEventListener("selectstart", function() {
    event.preventDefault();
})
frontViewImage.addEventListener("mousedown", function() {
    event.preventDefault();
})


window.addEventListener("keydown", function() {
    if (!event.repeat) {
        if (event.code === "Enter") {
            const curElem = document.activeElement;
            if (curElem.classList.contains("left_arrow")) {
                arrowClickTemplate(-1);
            } else if (curElem.classList.contains("right_arrow")) {
                arrowClickTemplate(1);
            }
        } else if (event.code === "ArrowLeft") {
            arrowClickTemplate(-1);
        } else if (event.code === "ArrowRight") {
            arrowClickTemplate(1);
        }
    }
});


const refImgs = document.querySelectorAll(".ref__img");
doAndAddEventListener("resize", function() {
    for (let img of refImgs) {
        img.style.width = /*img.style.height = */`${parseFloat(getComputedStyle(pageBlocks[2]).width) * 0.03}px`;
    }
});