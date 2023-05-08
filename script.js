const inputContainer = document.getElementById('input-container')
const countDownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countDownValue = Date
let countdownActive;
let savedCountdown;


const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownValue - now
        
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        
        // Hide Input
        inputContainer.hidden = true

        // If the countdown has ended, show complete
        if(distance<0) {
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        } else {
            // Else, show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second)

}

// Take Values from Form Input
const updateCountDown = (e) => {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title : countdownTitle,
        date: countdownDate
    };
    console.log(savedCountdown)
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    // Get number version of current Date, updateDOM
    countDownValue = new Date(countdownDate).getTime()
    updateDOM()
}

// Reset All Values
const reset = () => {
    // Reset Values
    countdownTitle = ''
    countdownDate = ''
    // Hide Countdowns, show Input
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false
    // Stop the countdown
    clearInterval(countdownActive)
    localStorage.removeItem('countdown')
}

const restorePreviousCountdown = () => {
    // Get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countDownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event Listeners
countDownForm.addEventListener('submit', updateCountDown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On Load, check local Storage
restorePreviousCountdown()