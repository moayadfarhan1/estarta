import stylesTable from '../styles/Table.module.css'
import ReactPaginate from 'react-paginate';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
const tableComponent = ({ datatables }) => {
    const router = useRouter();
    const itemsPerPage = datatables.totalRecords;
    
    const [pageCount, setPageCount] = useState(datatables.totalRecords);
    const [itemOffset, setItemOffset] = useState(datatables.pageNumber);

    useEffect(() => {
        setPageCount(Math.ceil(datatables.totalRecords / datatables.pageSize));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * datatables.pageNumber) % datatables.length;

        setItemOffset(newOffset);
        router.query = {
            ...router.query,
            pageNumber: event.selected
        }
        router.push(router);
      };
    
    return (
        <>
            <table className={stylesTable.table}>
                <thead>
                    <tr>
                        <th>Log ID</th>
                        <th>Application Type</th>
                        <th>Application ID</th>
                        <th>Action</th>
                        <th>Action Details</th>
                        <th>Date: Time</th>
                    </tr>
                </thead>
                <tbody>
                    {datatables?.data.length > 0 && datatables?.data?.map((data, index) => (
                        <tr key={index}>
                            <td>{data.logId}</td>
                            <td>{data.applicationType}</td>
                            <td>{data.applicationId}</td>
                            <td>{data.actionType}</td>
                            <td>{data.logInfo}</td>
                            <td>{data.creationTimestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={stylesTable.pagination}>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={() => <>nothing</>}
            />

            </div>
        </>
    )
}

export default tableComponent;