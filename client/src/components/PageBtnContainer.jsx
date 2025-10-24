import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';


export const PageBtnContainer = ({ data }) => {

  const { numOfPages, currentPage } = data
  
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  //create an array of pages
  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);


  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    //set the new value of the query param page, with pageNumber
    searchParams.set('page', pageNumber);
    //build url to navigate with the new value of page to /dashboard/all-jobs?page=4
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  

  
  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) return;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      
      {/* simple button rendering */}
      <div className='btn-container'>
        {pages.map((pageNumber) => (
          <button
            className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) return;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}