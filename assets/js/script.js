// Globals 
const closeModal = $("#close-modal")
const planClassSelect = $(".plan-event")
let targetEventId = ""
let textData = ""

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
    let lsObj = JSON.parse(localStorage.plans)
    const idArray = ["t9AM", "t10AM", "t11AM", "t12PM", "t1PM", "t2PM", "t3PM", "t4PM", "t5PM"]
    idArray.forEach(element => {
        if(lsObj[element]){
            console.log(element)
            let matchedId = $(".plan-event[data-id=" + element + "]")[0]
            matchedId.innerText = lsObj[element]
            console.log(matchedId)
        }
    })
    // Check if LS id matches data id  $(".plan-event[data-id=9AM]")[0]
}

// Checks if LS exists
if(localStorage.plans) {
    writeLStoEvents()
}

// Local storage handler 
const addToLS = async (textData, x) => {
    let plans = {}
    if(localStorage.plans) {
        let targetId = x
        plans[targetId] = textData 
        let old = JSON.parse(localStorage.getItem('plans'))
        let newObj = {...old,...plans}
        localStorage.setItem('plans',JSON.stringify(newObj))
    } else {
        let targetId = x
        plans[targetId] = textData 
        localStorage.setItem('plans',JSON.stringify(plans))
    }
}


// Adds text to event upon close of modal
function addTextFromModal (e)  {
    let eventTextEl = $('.plan-event[data-id="' + targetEventId +'"]')[0]
    textData = $("#modal-textarea")[0].value
    eventTextEl.innerText = textData
    $("#modal-textarea")[0].value = "" 
}

const saveData =  async (e) => {
    let eventElement = await $(e.target).parent().siblings(".plan-event")
    console.log(eventElement)
    targetEventId = await eventElement.attr('data-id')
    console.log(targetEventId)
    // textData = await eventElement[0].value
    // console.log(textData) TO DO FIX
    // addToLS(textData, targetEventId)
}
// Listen for close button on event
closeModal.on('click', addTextFromModal)
$('.plan-save').on('click', saveData)

// Hacky way to grab data id 
planClassSelect.on('click', function(e) {
    targetEventId = $(e.target).attr('data-id')
})