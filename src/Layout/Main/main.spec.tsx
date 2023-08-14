import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Dashboard from './index'
import { render } from '@testing-library/react'

const mock = new MockAdapter(axios, { delayResponse: 100 })
describe('test compounded Properly', () => {
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mock.reset()
  })

  beforeAll(() => {
    mock
      .onGet('/currency')
      .reply(() => {
        return [200, {
          data: [{
            symbol: 'ADX-BTC',
            high: '0.000004360000',
            low: '0.000004340000',
            volume: '193.52621806',
            quoteVolume: '0.00084178',
            percentChange: '-0.23',
            updatedAt: '2023-08-13T20:36:21.417Z',
            imgUrl: 'https://bittrex.com/content/dynamic/currencies/logos/b6018f57-731e-4dcb-90a1-b18f78524ab4.png'
          }]
        }]
      })
  })

  it('check component renders properly', async () => {
    const { getByText } = render(<Dashboard />)

    const headerElement = getByText('Market')
    expect(headerElement).toBeInTheDocument()

    const footerElement = getByText('footer')
    expect(footerElement).toBeInTheDocument()
  })
})
