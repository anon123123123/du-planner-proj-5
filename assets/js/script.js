// 
const closeModal = $("#close-modal")
let targetEventId = ""

// Function to get date and set it 
const setDate = async () => {
    const today = new Date();
    const dayIndex = today.getDay();
    const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    // Gets today's day e.g., Sunday 
    const currentDay = dayList[dayIndex]
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = today.getMonth();
    const currentMonth = month[monthIndex]
    // Thanks to https://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th/15397495 for next const 
    const nth = function (d) {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    // Sets Date to DOM
    $("#currentDay").text(`${currentDay}, ${currentMonth} ${today.getDate()}`)
    $("#date-ordinal").text(nth(today.getDate()))
}

setDate();

// Adds text to event upon close of modal
const addTextFromModal = async (e) => {
    let eventTextEl = $('.plan-event[data-id="' + targetEventId +'"]')[0]
    let textData = $("#modal-textarea")[0].value
    eventTextEl.innerText = textData 
}
closeModal.on('click', addTextFromModal)

// Hacky way to grab data id 
$(".plan-event").on('click', function(e) {
    targetEventId = $(e.target).attr('data-id')
})