import axios from "axios";
export const makePayment = async (amount, toastMsg) => {
    //Request to backend
    const data = await axios.post(`https://tender-bear-school-uniform.cyclic.app/create-order`, { amount });

    //options
    var options = {
        "key": "rzp_test_QYlrHuVo3qPFle", // Enter the Key ID generated from the Dashboard
        "amount": +data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Raghuveer Sain Co.", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            window.navigator.vibrate(1000);
            toastMsg({
                title: `Payment successful`,
                status: "success"
            });
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Raghuveer Sain", //your customer's name
            "email": "raghuveersain987@gmail.com",
            "contact": "+918440874898"  //Provide the customer's phone number for better conversion rates 
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
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
            toastMsg({
                title: `Payment failed`,
                status: `${response.error.reason}`
            });
    });
    rzp1.open();
}