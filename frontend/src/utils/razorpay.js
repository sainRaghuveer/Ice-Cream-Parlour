export const makePayment = (total) => {
    var options = {
        "key": "", // Enter the Key ID generated from the Dashboard
        "amount": total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Raghuveer Sain Co.", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_M3Jy7kat4GK3vZ", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "raghuveer Sain", //your customer's name
            "email": "raghuveersain987@gmail.com",
            "contact": "1234567890"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    rzp1.open();
}