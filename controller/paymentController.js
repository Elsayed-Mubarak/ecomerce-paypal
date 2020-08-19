var express = require("express")
var paypal = require('paypal-rest-sdk');

var PaymentDetails = require("../models/payment_details");


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AaU8tQfmz1_MFDTKuf84yYERXvdDt2ZFJVrxhNW_49DazF4A_F0VBuKyV5_nntyEdZqUa5Oq9ZBj65GV',
    'client_secret': 'EAZ8aFDU4lHHLy1bQqULYWqznf3dBknXZW3AH__zFC0bUs8AGUyR6RNbm-jHvqtikX7PsSqMO5vxuvKm'
});


exports.createPayPalPayment = (req, res) => {
    //  paypal.configure(paypal_config_sandBox);
    //   var orderId = req.body.orderId;
    var type = req.body.paymentType;
    var price = req.body.price;
    var quantity = req.body.quantity;
    var totalAmount = req.body.totalAmount;

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
                        "quantity": quantity
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": totalAmount
                },
                "description": "Hat for the best team ever"
            }]
        };
        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {

                        const paymentDetails = new PaymentDetails({
                            paymentId: payment.id,
                            paymentMethod: type,
                            paymentProviderName: "PayPal",
                            transactionDetails: [JSON.stringify(payment)],
                            paymentAmount: totalAmount,
                        });
                        const savedPayment = await paymentDetails.save();
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

exports.excutePayPalPayment = async (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    let pymntDetails = await PaymentDetails.findOne({
        paymentId: paymentId
    });
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": pymntDetails.paymentAmount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        console.log("..........payment......on exc............... ....", payment);

        if (error) {
            console.log(error.response);
            throw error;
        } else {
            pymntDetails.transactionDetails.push(JSON.stringify(payment));
            pymntDetails.paymentStatusHistory.push({
                fromStatus: pymntDetails.paymentStatus,
                toStatus: 'Approved',
                changeAt: new Date(),
                reason: 'after paypal send success to our backend then execute paypal.payment.excute'
            });
            pymntDetails.paymentStatus = 'Approved';
            pymntDetails.save();

            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
}
