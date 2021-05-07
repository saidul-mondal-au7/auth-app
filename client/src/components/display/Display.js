import React, {useState, useEffect, useMemo} from 'react';
import { useTable, usePagination } from 'react-table';
import { Link } from "react-router-dom";
import { COLUMNS } from './columns'

import './Display.css';


const Layout = (props) => {
  
  const columns = useMemo(() => COLUMNS, [])
  const [data, setUsers] = useState([ {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 6,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }
])

  const getUsers = async() => {
    try {
        const response = await fetch("http://localhost:5000/api/users/getdata");
        const data = await response.json()
        if(data) {
            setUsers(data)
        }
    } catch(e) {
        console.log("My error is ", e)
    }
     
}
useEffect(() => {
    getUsers()
})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 }
  }, 
  usePagination
  )
  // console.log(page.map((user) => user.original.id))
  const { pageSize } = state;
  useEffect(() => {
    setPageSize(20)
  }, [])
  
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                </th>
              ))}
                 
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (  
                    <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                    
                    </td>
                   
                    )
                })}
                
              </tr>
            )
          })}
         
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <Link className="btn btn-success" to="/profile">Profile page</Link>
      </div>
    </>
  )
}

export default Layout;