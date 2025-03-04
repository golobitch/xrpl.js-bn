import { assert } from 'chai'

import { validate, ValidationError } from '../../src'
import { validateEscrowCancel } from '../../src/models/transactions/escrowCancel'

/**
 * Transaction Verification Testing.
 *
 * Providing runtime verification testing for each specific transaction type.
 */
describe('EscrowCancel', function () {
  let cancel

  beforeEach(function () {
    cancel = {
      TransactionType: 'EscrowCancel',
      Account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
      Owner: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
      OfferSequence: 7,
    }
  })

  it(`Valid EscrowCancel`, function () {
    assert.doesNotThrow(() => validateEscrowCancel(cancel))
    assert.doesNotThrow(() => validate(cancel))
  })

  it(`Valid EscrowCancel with string OfferSequence`, function () {
    cancel.OfferSequence = '7'

    assert.doesNotThrow(() => validateEscrowCancel(cancel))
    assert.doesNotThrow(() => validate(cancel))
  })

  it(`Invalid EscrowCancel missing owner`, function () {
    delete cancel.Owner

    assert.throws(
      () => validateEscrowCancel(cancel),
      ValidationError,
      'EscrowCancel: missing Owner',
    )
    assert.throws(
      () => validate(cancel),
      ValidationError,
      'EscrowCancel: missing Owner',
    )
  })

  it(`Invalid EscrowCancel missing offerSequence`, function () {
    delete cancel.OfferSequence

    assert.throws(
      () => validateEscrowCancel(cancel),
      ValidationError,
      'EscrowCancel: missing OfferSequence',
    )
    assert.throws(
      () => validate(cancel),
      ValidationError,
      'EscrowCancel: missing OfferSequence',
    )
  })

  it(`Invalid Owner`, function () {
    cancel.Owner = 10

    assert.throws(
      () => validateEscrowCancel(cancel),
      ValidationError,
      'EscrowCancel: Owner must be a string',
    )
    assert.throws(
      () => validate(cancel),
      ValidationError,
      'EscrowCancel: Owner must be a string',
    )
  })

  it(`Invalid OfferSequence`, function () {
    cancel.OfferSequence = 'random'

    assert.throws(
      () => validateEscrowCancel(cancel),
      ValidationError,
      'EscrowCancel: OfferSequence must be a number',
    )
    assert.throws(
      () => validate(cancel),
      ValidationError,
      'EscrowCancel: OfferSequence must be a number',
    )
  })
})
