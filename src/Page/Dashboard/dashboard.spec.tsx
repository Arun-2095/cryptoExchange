import { render } from '@testing-library/react'
import { Dashboard } from './index'
import { MemoryRouter, Route, Routes, Outlet } from 'react-router-dom'
import { type ReactNode } from 'react'

interface RenderRouteWithOutletContextProps<T = any> {
  context: T
  children: ReactNode
}

export const RenderRouteWithOutletContext = <T,>({
  context,
  children
}: RenderRouteWithOutletContextProps<T>) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/"element={<Outlet context={context } />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('verify component mounted properly', () => {
  it('check template mounted properly', () => {
    render(<RenderRouteWithOutletContext context={{ currency: [], totalPages: 9, updatePage: jest.fn, page: 4 }}>
      <Dashboard />
    </RenderRouteWithOutletContext>)
  })
})
