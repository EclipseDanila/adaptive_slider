//SETTINGS
var btnBlockTime = 400 // Time limit for pressing 500ms
var autoSwitching = true // Auto switch mode

const sliderItems = document.querySelectorAll('.slider__item'); /* Array with slides */
const btnLeft = document.querySelector('#btn-left'); /* Left btn */
const btnRight = document.querySelector('#btn-right'); /* Right btn */

btnLeft.addEventListener('click', ()=> {slideFunction(true)});
btnRight.addEventListener('click', ()=> {slideFunction(false)});

let autoSlide = setTimeout(slideFunction, 2000)

let btnOff = false; /* Variable for limit of pressing */
setTimeout(btnOff = true, btnBlockTime)

slideFunction(true)

function slideFunction (duration) {
    if (autoSwitching) {
        clearTimeout(autoSlide);
        autoSlide = setTimeout(slideFunction, 2000)  
    }

    /* Prohibition of pressing a button for a specified period of time */
    if (btnOff == true) {     
        btnOff = false;

        let btnBlock = setTimeout(() => {
            btnOff = true;
        }, btnBlockTime) /* Time limit for pressing 500ms*/

        for (let i = 0; i < sliderItems.length; i++) {
            let sliderItem = sliderItems[i];
            let sliderPos = sliderItem.getAttribute('slider-pos');
            let sliderWidth = sliderItem.offsetWidth; 

            /* Slides will move to the left side */
            if (duration == true) {
                /* If the slide is on the left edge, then it will move to the right edge */
                if (sliderPos == -1) {
                    sliderPos = sliderItems.length - 2;
                    sliderItem.setAttribute('slider-pos', sliderPos)
                    sliderItem.style.opacity = '0'
                    sliderItem.style.transition = 'margin-left 0s'
                } else {
                    sliderItem.style.opacity = '1'
                    sliderItem.style.transition = 'margin-left 0.4s'
                    sliderPos--;
                    sliderItem.setAttribute('slider-pos', sliderPos)
                }
            
            /* Slides will move to the right side */
            } else {
                /* If the slide is on the right edge, then it will move to the left edge */
                if (sliderPos == sliderItems.length - 2) {
                    sliderPos = -1;
                    sliderItem.setAttribute('slider-pos', sliderPos)
                    sliderItem.style.opacity = '0'
                    sliderItem.style.transition = 'margin-left 0s'
                } else {
                    sliderItem.style.opacity = '1'
                    sliderItem.style.transition = 'margin-left 0.4s'
                    sliderPos++;
                    sliderItem.setAttribute('slider-pos', sliderPos)
                }
            }

            sliderItem.style.marginLeft = (sliderPos * sliderWidth) + 'px' /* Change position of slide */ 
        }
    }  
}


