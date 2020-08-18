var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PaymentDetailsSchema = new Schema({
    user: {
        id: String,
        firstName: String,
        lastName: String,
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'ePayment Network', 'Scratch Card', 'PAYPAL', 'bank Deposit', 'Cash']
    },

    paymentProviderName: {
        type: String
    },
    paymentAmount: {
        type: Number,
        required: true,
        default: 0.00
    }
    ,
    paymentDate: {
        type: Date,
        default: Date.now
    },
    transactionCode: {
        type: String
    },
    transactionDetails: [{
        type: String,
        maxlength: 3000
    }],
    paymentId: {
        type: String
    },
    payerId: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['Not_Create', 'Created', 'Approved', 'Captured', 'Refunded', 'Partially Refunded']
    },
    paymentStatusHistory: [{
        fromStatus: String,
        toStatus: String,
        changeAt: Date,
        reason: String
    }],
    feesAmount: {
        type: Number,
        default: 0.00
    },
    feesCurrency: {
        type: String,
        default: 'USD'
    },
    subscriptionDetail: {
        royalSubscriptionId: Number,
        subscriptionDetailId: String
    }
});

PaymentDetailsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.transactionCode = generateCode();
        this.paymentStatusHistory = [{
            fromStatus: this.paymentStatus,
            toStatus: this.paymentStatus,
            changeAt: new Date(),
            reason: 'Start Payment Cycle from pre Save Function in model'
        }];
    }
    // if (this.isModified('lastLogin')) {
    //     this.userLoginHistory.push(this.lastLogin);
    // }
    return next();
});


function generateCode() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    for (var i = 0; i < 25; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

module.exports.PaymentDetails = mongoose.model('PaymentDetails', PaymentDetailsSchema);