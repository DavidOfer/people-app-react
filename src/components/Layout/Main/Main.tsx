import { useEffect, useState } from "react";
import { Person } from "../../../models/PersonModel";
import { Order } from "../../../types";
import PaginationTable from "../../PaginationTable/PaginationTable";
import { StyledMain } from "./Main.styled";


const Main: React.FC = () => {
    const URL = process.env.REACT_APP_TABLE_URL + '?page='
    const [error, setError] = useState<{ message: string } | undefined>(undefined);
    const [isLoading, setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState<{ field: string, order: Order }>({ field: 'idNumber', order: 'asc' })
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const sortByHandler = (field: string) => {
        setSortBy((prevSortBy) => {
            if (prevSortBy.field !== field) {
                return { field, order: 'asc' }
            }
            if (prevSortBy.order === 'asc') {
                return { field, order: 'desc' }
            }
            return { field, order: 'asc' }
        })
        setCurrentPage(prevPage => 0)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(prevPage => 0);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const [data, setData] = useState<{ count: number, people: Person[] }>({ count: 0, people: [] })
    useEffect(() => {
        setIsloading(true);
        setError(undefined);
        fetch(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}&perPage=${rowsPerPage}`)
            .then(result => result.json())
            .then(data => {
                setData({ count: data.count, people: data.result })
                setIsloading(false);
                console.log(data)
                console.log(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}`)
            })
            .catch(err => {
                setIsloading(false);
                const message = err.message ? err.message : 'An error has occured while attempting to fetch the data';
                setError({ message: message })
                console.log(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}`)
            })
    }, [currentPage, sortBy, URL,rowsPerPage])
    return (
        <StyledMain>
            {error && error.message}
            <PaginationTable isLoading={isLoading} count={data.count} sortBy={sortBy}
                sortByHandler={sortByHandler} page={currentPage} rows={data.people} rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
        </StyledMain>
    );
}
export default Main;