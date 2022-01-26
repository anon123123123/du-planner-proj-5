
// Call moment and get hour 
let now = moment();
let hour = now.hour();
if (hour >= 12) {
    hour = hour - 12 + "PM"
} else {
    hour = hour + "AM"
}
// Sets date to Dom
$("#currentDay").text(`${now.format('dddd, MMMM Do YYYY')}`)

// Handler to write events from LS to DOM
const writeLStoEvents = async() => {
    const lsObj = JSON.parse(localStorage.plans)
    const idArray = ["t9AM", "t10AM", "t11AM", "t12PM", "t1PM", "t2PM", "t3PM", "t4PM", "t5PM"]
    // Checks each Id if in LS adds to DOM
    idArray.forEach(element => {
        if(lsObj[element]){
            let matchedId = $(".plan-event[data-id=" + element + "]")[0]
            matchedId.innerText = lsObj[element]
        }
    })
}

// Checks if LS exists if yes write to DOM
if(localStorage.plans) {
    writeLStoEvents()
}

// Local storage handler for saving events
const addToLS = async(targetId, textData) => {
    let plans = {}
    if(localStorage.plans) {
        plans[targetId] = textData 
        let old = JSON.parse(localStorage.getItem('plans'))
        let newObj = {...old,...plans}
        localStorage.setItem('plans',JSON.stringify(newObj))
    } else {
        plans[targetId] = textData 
        localStorage.setItem('plans',JSON.stringify(plans))
    }
}


// Handler for "SVG" save option 
const saveData = async(e) => {
    const eventElement = $(e.target).parent().siblings('.plan-event')
    const targetEventId = eventElement.attr('data-id')
    const textData = eventElement[0].innerText
    addToLS(targetEventId,textData)
}

$('.save-svg').on('click', saveData)

// Modal for event text handler 
$('#plannerModal').on('show.bs.modal', function (event) {
    $('#event-text')[0].value = ""
    const timeSlot = $(event.relatedTarget)
    const eventTimeId = timeSlot.data('id')
    const modal = $(this)
    modal.find('.modal-title').text('New event for ' + eventTimeId.substring(1))
    $('#exit-modal').attr('data-id', eventTimeId)
  })

// Places model text in content on close 
$('#plannerModal').on('hidden.bs.modal', function () {
    const currId = $('#exit-modal').attr("data-id")
    const matchedId = $(".plan-event[data-id=" + currId + "]")[0]
    const textData = $('#event-text')[0].value
    matchedId.textContent = textData
});