$(document).ready(function() {
    $('.modal').modal(); // initialize all modals

    let action_buttons = $('.action-btn');
    action_buttons.click(function(event) {
        event.preventDefault(); // prevent button within form from sending form
        let id = $(this).data('modal-id'); // fetch data-modal-id attr from button (put there by backend)
        $(`#modal${id}`).modal('open'); // open mthe correct modal
    })
})