import Pagination from './index'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
describe('test compounded Properly', () => {
  it('check component renders properly', async () => {
    const { getByText, container } = render(<Pagination page={1}
      totalPages={2}
      updatePage={jest.fn()} />)

    const checkPaginationText = getByText('Page 1 of Page 2')
    expect(checkPaginationText).toBeInTheDocument()

    expect(container.getElementsByClassName('increment-btn').length).toBe(1)
    expect(container.getElementsByClassName('decrement-btn').length).toBe(1)
  })

  it('when user clicks expect function to trigger with increment or decrement params', async () => {
    const mockClickHandler = jest.fn()
    const { getByTestId } = render(<Pagination page={1}
      totalPages={2}
      updatePage={mockClickHandler} />)

    user.click(getByTestId('increment-btn'))

    expect(mockClickHandler).toBeCalledWith('INCREMENT')

    user.click(getByTestId('decrement-btn'))

    expect(mockClickHandler).toBeCalledWith('DECREMENT')
  })
})
