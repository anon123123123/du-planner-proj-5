// Sets date to Dom
$("#currentDay").text(`${moment().format('dddd, MMMM Do YYYY')}`)

// Check current time to time on events (9-5) 
const plannerAvailability = async() => {
    $('.time-tbl').each(function (i,e) {
        const currentHour = moment().format('H')
        const prepCurrentHour = moment(currentHour, 'H')
        const hour = moment($(this)[0].innerText, 'LT').format('H')
        const prepHourinTable = moment(hour, 'H')
        if(prepCurrentHour.isAfter(prepHourinTable)) {
            $(this).siblings('.plan-event').addClass('past-time')
        } else if (currentHour === hour) {
            $(this).siblings('.plan-event').addClass('current-time')
        } else {
            $(this).siblings('.plan-event').addClass('future-time')
        }
    })
} 

// Handler to write events from LS to DOM
const writeLStoEvents = async() => {
    const lsObj = JSON.parse(localStorage.plans)
    const idArray = ["t9AM", "t10AM", "t11AM", "t12PM", "t1PM", "t2PM", "t3PM", "t4PM", "t5PM"]
    // Checks each Id if in LS adds saved text to DOM where Id matches
    idArray.forEach(element => {
        if(lsObj[element]){
            let matchedId = $(".plan-event[data-id=" + element + "]")
            matchedId[0].innerText = lsObj[element]
            matchedId.siblings('.plan-save').find('img').attr("src", "assets/svg/lock.svg");
        }
    })
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
    eventElement.siblings('.plan-save').find('img').attr("src", "assets/svg/lock.svg");
    $('.toast').toast({delay: 2500});
    $('.toast').toast('show')
}

// ### Event Handlers ###
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

// Save Event (click on SVG)
$('.save-svg').on('click', saveData)

// Checks if LS Object exists if yes write to DOM
if(localStorage.plans) {
    writeLStoEvents()
}

// Init Func
plannerAvailability()