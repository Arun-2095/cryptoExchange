import { END_POINTS, ApiCall } from '@/Helpers'
import { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import { type ContextType, type Currency } from '@/Type/dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Header from '@/Components/Header'
import './main.css'

const RamdomUrl: string[] = [
  'https://bittrex.com/content/dynamic/currencies/logos/a8e1ab91-8752-41cc-be66-93b63d7c47ab.png',
  'https://bittrex.com/content/dynamic/currencies/logos/2a901abf-548c-409a-94c7-41d952a0a757.png',
  'https://bittrex.com/content/dynamic/currencies/logos/e581f6ac-4e91-4f97-b720-ba80a7edc16c.png',
  'https://bittrex.com/content/dynamic/currencies/logos/b6018f57-731e-4dcb-90a1-b18f78524ab4.png',
  'https://bittrex.com/content/dynamic/currencies/logos/7e5638ef-8ca0-404d-b61e-9d41c2e20dd9.png'
]

export default function Dashboard (): JSX.Element {
  const [currency, setCurrency] = useState<Currency[]>([])

  const [page, setPage] = useState<number>(1)

  const [totalPages, setTotalPage] = useState<number>(0)

  const [currentData, setcurrentData] = useState<Currency[]>([])

  const [search, setSearch] = useState<string | null>(null)

  const [currencyDetail, setCurrencyDetail] = useState<Currency | null>(null)

  const perPage = 20

  useEffect((): void => {
    ApiCall(END_POINTS.GET_CURRENCIES).then((response: { data: Currency[] }) => {
      const cookedResponse = response.data.map((datum) => {
        const randomIndex = Math.floor(Math.random() * RamdomUrl.length)
        return {
          ...datum,
          imgUrl: RamdomUrl[randomIndex]
        }
      })

      setCurrency(cookedResponse)
      setTotalPage(Math.floor(response.data?.length / perPage))
    }).catch((err) => {
      console.log(err, 'ERROR')
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== null && search.length !== 0) {
        ApiCall({ ...END_POINTS.GET_CURRENCY, endpoint: END_POINTS.GET_CURRENCY.endpoint.replace(':params', search) }).then((response: { data: Currency }) => {
          setCurrencyDetail(response.data)
        }).catch((err) => {
          setCurrencyDetail(null)
          console.log(err, 'ERROR')
        })
      }
    }, 1000)

    return () => { clearTimeout(timer) }
  }, [search])

  useEffect(() => {
    if (page !== 0 || totalPages > page) {
      const currentData = currency?.filter((datum, index) => (page - 1) * 20 < index && page * 20 > index)
      console.log('currentData', currency, page, totalPages, currentData)
      setcurrentData(currentData)
    }
  }, [page, totalPages])

  function onPageChange (operation: string): void {
    if (operation === 'INCREMENT') {
      page < totalPages && setPage(page + 1)
    } else {
      page !== 1 && setPage(page - 1)
    }
  }

  return (<>
    { <div className='wrapper'>
      <Header search={search} setSearch={setSearch} />

      {(currencyDetail != null) &&
   <div className="card w-25 mx-auto currency-details">
     <h5 className="card-header bg-dark text-white font-weigh-bold">{currencyDetail.symbol}</h5>
     <div className="card-body bg-grey">
       <h5 className="card-title">{currencyDetail.percentChange} <FontAwesomeIcon icon={ Math.sign(parseFloat(currencyDetail.percentChange)) !== -1 ? faArrowUp : faArrowDown} style={{ color: Math.sign(parseFloat(currencyDetail.percentChange)) !== -1 ? 'green' : 'red' }} /> </h5>
       <p className="card-text">
     volumne : {currencyDetail.volume}
       </p>
     </div>
   </div>}
      <main className='px-3 main'>

        <Outlet context={{ currency: currentData, totalPages, page, updatePage: onPageChange }} />
      </main>
      <footer>footer</footer> </div> }
  </>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function OutletProps () {
  return useOutletContext<ContextType>()
}
