import ReactPaginate from "react-paginate";
import styles from './Paginator.module.scss'
import { FC } from "react";

type TProps = {
    onActualPageChange: (actualPage: number) => void
    currentPage: number
    totalPageCount: number
    pageLimit: number
}

const Paginator: FC<TProps> = ({ totalPageCount, pageLimit, currentPage, onActualPageChange }) => {

    return <ReactPaginate
        className={styles.root}
        pageCount={totalPageCount}
        nextLabel='>'
        breakLabel='...'
        previousLabel='<'
        forcePage={currentPage - 1}
        onPageChange={(e) => onActualPageChange(e.selected + 1)}
        pageRangeDisplayed={pageLimit}
        renderOnZeroPageCount={null}
    />
}

export default Paginator;