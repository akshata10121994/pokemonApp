import React from 'react'

export default function Pagination({gotoNextPage,gotoPrevPage}) {
  return (
    <>
    <div>
{gotoPrevPage&& <button onClick={gotoPrevPage}>Previos Page</button>}
{gotoNextPage&&<button onClick={gotoNextPage}>Next Page</button>}

    </div>
    </>
  )
}
