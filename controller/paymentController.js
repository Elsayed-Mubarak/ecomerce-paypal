var paypal = require('paypal-rest-sdk');
var { paypal_config_sandBox } = require('../config/paypal');

var Product = require("../models/productModel")
var PaymentDetails = require("../models/payment_details");


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYj-oJHOog8-c6ioaReg6Q5o4nMWnmLoD5-yHsY0AEs76WDRSyt_imjNhvhq1qGPKhVkOmFmk31OYxs9',
    'client_secret': 'EP1FW9ww99Uz8Orhn01DwIuwxPfuZYuEBFmVoL9_WSSoRQD6y0zE4uVjfiNam_flAoyHUmM4ohumPjkT'
});


exports.createPayPalPayment = (req, res, next) => {
    //  paypal.configure(paypal_config_sandBox);

    //   var orderId = req.body.orderId;
    //   var type = req.body.paymentType;
    var price = req.body.price;
    //   var redirectUrl = req.body.redirectUrl;


    try {

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/api/v1/success",
                "cancel_url": "http://localhost:5000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "ay haga",
                        "sku": "001",
                        "price": price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "Hat for the best team ever"
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {

                console.log("..........payment..................... ....", payment);

                let pyment;

                if (payment)
                    pyment = new PaymentDetails({
                        paymentMethod: paymentType,
                        paymentProviderName: "PayPal",
                        transactionDetails: [JSON.stringify(payment)],
                        paymentId: payment.id
                    });


                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        console.log("...........payment.links[i].href..... ....", payment.links[i].href);
                        res.status(200).json({
                            url: payment.links[i].href
                        })
                    }
                }
            }
        });



    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }

}

exports.excutePayPalPayment = (req, res, next) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    try {
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": req.body.price
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            console.log("..........payment.first on exc ....", payment);

            if (error) {
                console.log("..........payment. on exc errr ....", error);

                console.log(error.response);
                throw error;
            } else {
                console.log("..........payment.links on exc ....", payment);

                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    } catch (err) {
        console.log(err)
    }
}
