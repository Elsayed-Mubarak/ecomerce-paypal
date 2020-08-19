var braintree = require("braintree");

exports.initializeBraintree = async (req, res) => {
    const gateway = braintree.connect({
        "environment": braintree.Environment.Sandbox,
        "merchantId": "2zb4kmc98rqzfhqy",
        "publicKey": "fkrqd8bsrhny7274",
        "privateKey": "4e8edc46ccfea04f40d7f225eb5cfcaf"
    });
    let token = (await gateway.clientToken.generate({})).clientToken;
    res.send({ data: token });
};

exports.confirmBraintree = async (req, res) => {
    const data = req.body;
    const gateway = braintree.connect({
        "environment": braintree.Environment.Sandbox,
        "merchantId": "2zb4kmc98rqzfhqy",
        "publicKey": "fkrqd8bsrhny7274",
        "privateKey": "4e8edc46ccfea04f40d7f225eb5cfcaf"
    });
    let transactionResponse = await gateway.transaction.sale({
        amount: data.amount,
        paymentMethodNonce: data.nonce,
        options: {
            submitForSettlement: true
        }
    });
    console.log(transactionResponse);
    res.send({ data: transactionResponse });
};