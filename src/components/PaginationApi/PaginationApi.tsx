import { Pagination } from "react-bootstrap";
import { useState } from "react";
import "./PaginationApi.css";
interface Props {
    itemsNumber: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const PaginationApi = ({ itemsNumber, itemsPerPage, onPageChange }: Props) => {
    const [active, setActive] = useState(1);
    const totalPages = Math.ceil(itemsNumber / itemsPerPage);
    const changePage = (page:number) => {
        setActive(page);
        onPageChange(page);
    };
    if (totalPages <= 1) {
        return (
            <Pagination className="page w-fit mx-auto mt-3">
                <Pagination.Item active>{1}</Pagination.Item>
            </Pagination>
        );
    }
    const pagesToShow =
        totalPages > 5
            ? [1, 2, 3, 4]
            : Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <Pagination className="page w-fit mx-auto mt-3">
            <Pagination.Prev
                disabled={active === 1}
                onClick={() => changePage(active - 1)}
            />
            {pagesToShow.map((page) => (
                <Pagination.Item
                    key={page}
                    active={page === active}
                    onClick={() => changePage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
            {totalPages > 5 && <Pagination.Ellipsis disabled />}
            <Pagination.Next
                disabled={active === totalPages}
                onClick={() => changePage(active + 1)}
            />
        </Pagination>
    );
};

export default PaginationApi;

