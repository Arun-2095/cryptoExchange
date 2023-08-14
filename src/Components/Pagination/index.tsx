export default function Pagination ({ page, totalPages, updatePage }: PaginationProps): JSX.Element {
  return (
    <>
      <nav className='d-flex justify-content-center align-items-center mx-4' aria-label="Page navigation">
        <div className='mx-3'> Page {page} of Page {totalPages}</div>
        <ul className="pagination justify-content-end m-0">
          <li data-testid="decrement-btn" className="page-item p-2 px-3 border rounded mr-4 cursor-pointer increment-btn" onClick={() => { updatePage('DECREMENT') }}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only"></span>
          </li>

          <li data-testid="increment-btn" className="page-item p-2 px-3 border rounded cursor-pointer decrement-btn" onClick={() => { updatePage('INCREMENT') }}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only"></span>
          </li>
        </ul>
      </nav>
    </>
  )
}

interface PaginationProps {
  page: number
  totalPages: number
  updatePage: (operation: string) => void
}
