
//on focus remove password warning and if password field, empty it
$('input').focus(function () {
    $('#pwdErr').remove();
    if ($(this).attr('type') == 'password') {
        $(this).val('');
    }
})
$('form').on('submit', function (event) {

    event.preventDefault();
    //remove input focus
    $('input').blur();
    // see if pass word fields match
    if ($('input[name=pass').val() == $('input[name=passTest]').val()) {
        console.log('true and posting');
        const inputs = $(this).find($('input'))
        console.log('inputs');
        console.log(inputs);


        const obj = {};

        inputs.forEach(el => obj[el.name] = el.value())
        console.log(inputs);



    } else {
        $('label[for=passTest').before(`<span id="pwdErr"> Password mismatch</span>`)
    }

})

