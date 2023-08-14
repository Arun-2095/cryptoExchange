import { type ContextType, type Currency } from '@/Type/dashboard'
import { useOutletContext } from 'react-router-dom'
import Pagination from '@/Components/Pagination'
import './dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

export function Dashboard (): JSX.Element {
  const { currency, totalPages, updatePage, page } = useOutletContext<ContextType>()

  return (<>

    <table className="table table-hover  table-dark dashboard w-75 mx-auto">
      <thead>
        <tr>
          <th className='thead-cell'scope="col">Market</th>
          <th className='thead-cell' scope="col">Price/Approx</th>
          <th className='thead-cell' scope="col">24hr High</th>
          <th className='thead-cell' scope="col">24hr Low</th>
          <th className='thead-cell' scope="col">24hr Change</th>
          <th className='thead-cell'scope="col">24hr Volume</th>
        </tr>
      </thead>
      <tbody>
        {currency.map((data: Currency, index: number) => {
          const percentageSign = Math.sign(parseFloat(data.percentChange))

          return <tr key={index}>
            <th className='tbody-cell' scope="row" >  <div>
              <img src={data.imgUrl} /> <span className='symbol-text'> {data.symbol}</span>
            </div></th>
            <td className='tbody-cell'> {(parseFloat(data.high) + parseFloat(data.low)) / 2}</td>
            <td className='tbody-cell'>{data.high}</td>
            <td className='tbody-cell low-value'>{data.low}</td>
            <td className={'tbody-cell ' + (percentageSign === -1 ? 'text-danger' : 'text-success') }>{data.percentChange}  <FontAwesomeIcon icon={percentageSign === -1 ? faArrowDown : faArrowUp} style={{ color: percentageSign === -1 ? 'red' : 'green' }} />  </td>
            <td className='tbody-cell'>{(parseFloat(data.volume)).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            }) }</td>
          </tr>
        })}
      </tbody>
    </table>
    <Pagination page={page} totalPages={totalPages} updatePage={updatePage}/>

  </>
  )
}
