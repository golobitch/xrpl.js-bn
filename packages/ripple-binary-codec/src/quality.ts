import { coreTypes } from './types'
import BigNumber from 'bignumber.js'
import bigInt = require('big-integer')
import { Buffer } from 'buffer/'

/**
 * class for encoding and decoding quality
 */
class quality {
  /**
   * Encode quality amount
   *
   * @param arg string representation of an amount
   * @returns Serialized quality
   */
  static encode(quality: string): Buffer {
    const decimal = new BigNumber(quality)
    const exponent = (decimal.e as number) - 15
    const qualityString = decimal.times(`1e${-exponent}`).abs().toString()
    const bytes = coreTypes.UInt64.from(bigInt(qualityString)).toBytes()
    bytes[0] = exponent + 100
    return bytes
  }

  /**
   * Decode quality amount
   *
   * @param arg hex-string denoting serialized quality
   * @returns deserialized quality
   */
  static decode(quality: string): BigNumber {
    const bytes = Buffer.from(quality, 'hex').slice(-8)
    const exponent = bytes[0] - 100
    const mantissa = new BigNumber(`0x${bytes.slice(1).toString('hex')}`)
    return mantissa.times(`1e${exponent}`)
  }
}

export { quality }
