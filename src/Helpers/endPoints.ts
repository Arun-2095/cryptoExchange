import { RequestMethod } from './Types'

export const END_POINTS = {
  GET_CURRENCIES: {
    method: RequestMethod.GET,
    endpoint: 'currency'
  },
  GET_CURRENCY: {
    method: RequestMethod.GET,
    endpoint: 'currency/:params/summary'
  }

}
