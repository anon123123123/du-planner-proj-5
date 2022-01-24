// Globals 
const closeModal = $("#close-modal")
const planClassSelect = $(".plan-event")
let targetEventId = ""

// Call moment and get hour 
let now = moment();
let hour = now.hour();
if (hour >= 12) {
    hour = hour - 12 + "PM"
    console.log(hour)
} else {
    hour = hour + "AM"
}
// Sets date to Dom
$("#currentDay").text(`${now.format('dddd, MMMM Do YYYY')}`)

const writeLStoEvents = async () => {
    // Check if LS id matches data id 
}

// Checks if LS exists
if(localStorage.plans) {
    writeLStoEvents()
}

// Local storage handler 
const addToLS = async (textData, x) => {
    let targetId = x
    let plans = {}
    plans[targetId] = textData 
    if(localStorage.plans) {
        let old = JSON.parse(localStorage.getItem('plans'))
        let newObj = {...old,...plans}
        localStorage.setItem('plans',JSON.stringify(newObj))
    } else {
        localStorage.setItem('plans',JSON.stringify(plans))
    }
}


// Adds text to event upon close of modal
const addTextFromModal = async (e) => {
    let eventTextEl = $('.plan-event[data-id="' + targetEventId +'"]')[0]
    let textData = $("#modal-textarea")[0].value
    eventTextEl.innerText = textData
    addToLS(textData, targetEventId) 
}
// Listen for close button on event
closeModal.on('click', addTextFromModal)

// Hacky way to grab data id 
planClassSelect.on('click', function(e) {
    targetEventId = $(e.target).attr('data-id')
})