var paypal = require('paypal-rest-sdk');
var { paypal_config_sandBox } = require('../config/paypal');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AYj-oJHOog8-c6ioaReg6Q5o4nMWnmLoD5-yHsY0AEs76WDRSyt_imjNhvhq1qGPKhVkOmFmk31OYxs9',
    'client_secret': 'EP1FW9ww99Uz8Orhn01DwIuwxPfuZYuEBFmVoL9_WSSoRQD6y0zE4uVjfiNam_flAoyHUmM4ohumPjkT'
  });


exports.createPayPalPayment = (req, res, next) => {
  //  paypal.configure(paypal_config_sandBox);
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/api/v1/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Red Sox Hat",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Hat for the best team ever"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("..........payment.links ....", payment);
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    console.log("...........payment.links[i].href..... ....", payment.links[i].href);
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });


}

exports.excutePayPalPayment = (req, res, next) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
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

}
