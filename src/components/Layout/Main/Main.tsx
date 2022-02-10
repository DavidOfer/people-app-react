import { useEffect, useState } from "react";
import { Person } from "../../../models/PersonModel";
import PaginationTable from "../../PaginationTable/PaginationTable";
import { StyledMain } from "./Main.styled";

const Main: React.FC = () => {
    const URL = process.env.REACT_APP_TABLE_URL +'?page='
    const [isLoading,setIsloading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState<{ field: String, order: String }>({ field: 'idNumber', order: 'asc' })
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
        setCurrentPage(prevPage=>0)
    }
    // const onNext = () => {
    //     setCurrentPage(prevPage => prevPage + 1)
    // }
    // const onPrevious = () => {
    //     setCurrentPage(prevPage => prevPage - 1)
    // }
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('clicked change page')
        console.log(newPage)
        setCurrentPage(newPage);
    };
    const [data, setData] = useState<{count:number,people:Person[]}>({count:0,people:[]})
    useEffect(() => {
        setIsloading(true)
        fetch(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}`)
            .then(result => result.json())
            .then(data => {
                setData({count:data.count,people:data.result})
                setIsloading(false);
                console.log(data)
                console.log(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}`)
            })
            .catch(err=>{
                setIsloading(false);
                console.log(err);
                console.log(URL + currentPage + `&sortBy=${sortBy.field}&order=${sortBy.order}`)
            })
    }, [currentPage, sortBy,URL])
    return (
        <StyledMain>
            {/* {people.map((person, index1) => <div key={index1} style={{ textAlign: 'center' }}>{Object.entries(person).map((field, index) => <div key={index}>{field[0]}: {field[1]} </div>)} </div>)} */}
            {/* <button onClick={onNext}>next</button>
            <button onClick={onPrevious}>previous</button> */}
            {/* <div className="paginationContainer">
                <PaginationControlled page={currentPage} handleChange={handleChange} />
            </div> */}
            <PaginationTable isLoading={isLoading} count={data.count} sortByHandler={sortByHandler} page={currentPage} rows={data.people} handleChangePage={handleChangePage} />
        </StyledMain>
    );
}
export default Main;