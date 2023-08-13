import { END_POINTS, ApiCall } from '@/Helpers'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
export default function Dashboard (): JSX.Element {
  useEffect((): void => {
    ApiCall(END_POINTS.GET_CURRENCIES).then((data: any) => { console.log(data, 'CHECK') }).catch((err) => {
      console.log(err, 'ERROR')
    })
  }, [])
  return (<>
    { <div>Dashboard {process.env.REACT_APP_BASE_URL} <Outlet />  </div> }
  </>
  )
}
