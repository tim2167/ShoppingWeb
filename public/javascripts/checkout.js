
Stripe.setPublishableKey('pk_test_a36pzG7bPP7bKX3NKE14QK3C');
var $form = $('#checkout-form');
$form.submit(function(event){
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);
    var elements = stripe.elements();
    var cardNumber = elements.create('cardNumber');
    cardNumber.mount($('#card-number'));
    var cardExpiry = elements.create('cardExpiry');
    //var expiry = $('#card-expiry-month').val() + $('#card-expiry-year').val()
    cardExpiry.mount("04/20");
    var cardCvc = elements.create('cardCvc');
    cardCvc.mount($('#card-cvc'));
    stripe.createToken(cardNumber);//.then(stripeResponseHandler));
    console.log("something happend");
    return false;
});

function stripeResponseHandler(status, response) {
    console.log("really!");
    if (response.error) { // Problem!

        // Show the errors on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.token.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}