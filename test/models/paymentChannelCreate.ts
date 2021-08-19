import { ValidationError } from 'xrpl-local/common/errors'
import { verifyPaymentChannelCreate } from './../../src/models/transactions/paymentChannelCreate'
import { assert } from 'chai'

/**
 * PaymentChannelCreate Transaction Verification Testing
 *
 * Providing runtime verification testing for each specific transaction type
 */
describe('PaymentChannelCreate Transaction Verification', function () {
    let channel

    beforeEach(() => {
        channel = {
            "Account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
            "TransactionType": "PaymentChannelCreate",
            "Amount": "10000",
            "Destination": "rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW",
            "SettleDelay": 86400,
            "PublicKey": "32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A",
            "CancelAfter": 533171558,
            "DestinationTag": 23480,
            "SourceTag": 11747
        }        
    })
    
    it (`verifies valid PaymentChannelCreate`, () => {        
        assert.doesNotThrow(() => verifyPaymentChannelCreate(channel))
    })

    it (`verifies valid PaymentChannelCreate w/o optional`, () => {
        delete channel.CancelAfter
        delete channel.DestinationTag
        delete channel.SourceTag

        assert.doesNotThrow(() => verifyPaymentChannelCreate(channel))
    })

    it (`missing Amount`, () => {
        delete channel.Amount
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: missing Amount"
        )
    })


    it (`missing Destination`, () => {
        delete channel.Destination  
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: missing Destination"
        )
    })

    it (`missing SettleDelay`, () => {
        delete channel.SettleDelay    
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: missing SettleDelay"
        )
    })

    it (`missing PublicKey`, () => {
        delete channel.PublicKey   
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: missing PublicKey"
        )
    })

    it (`invalid Amount`, () => {
        channel.Amount = 1000
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: Amount must be a string"
        )
    })


    it (`invalid Destination`, () => {
        channel.Destination = 10;   
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: Destination must be a string"
        )
    })

    it (`invalid SettleDelay`, () => {
        channel.SettleDelay = "10"    
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: SettleDelay must be a number"
        )
    })

    it (`invalid PublicKey`, () => {
        channel.PublicKey = 10       
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: PublicKey must be a string"
        )
    })

    it (`invalid DestinationTag`, () => {
        channel.DestinationTag = "10"

        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: DestinationTag must be a number"
        )
    })

    it (`invalid CancelAfter`, () => {
        channel.CancelAfter = "100"
        
        assert.throws(
            () => verifyPaymentChannelCreate(channel),
            ValidationError,
            "PaymentChannelCreate: CancelAfter must be a number"
        )
    })
})