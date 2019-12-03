
//on focus remove password warning and if password field, empty it
$('input').focus(function () {
    $('#pwdErr').remove();
    if ($(this).attr('type') == 'password') {
        $(this).val('');
    }
})
$('#signUpForm').on('submit', function (event) {

    event.preventDefault();
    //remove input focus
    $('input').blur();
    // see if pass word fields match
    if ($('input[name=pass').val() == $('input[name=passTest]').val()) {
        console.log('true and posting');
        //build array of object key value pairs excluding passTest
        const inputs = $('input[name!=passTest]').serializeArray();
        console.log('inputs');
        console.log(inputs);

        $.post('/api/auth/newuser', inputs, function (res) {
            console.log(res);
        })
    } else {
        $('label[for=passTest').before(`<span id="pwdErr"> Password mismatch</span>`)
    }

})

$('#loginForm').on('submit', function (event) {
    event.preventDefault();
    console.log($(this).serialize());

    $.post('/api/auth/login', $(this).serialize(), function (res) {
        console.log(res);

    })
})