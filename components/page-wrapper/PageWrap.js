import React from 'react'
import Sidebar from '../sidebar/Sidebar'

function PageWrap(props) {
  return (
    <>
      <div className="page-wrap flex flex-row">     
        <div className="w-20 bg-gray-900">
            <Sidebar/>
        </div>
        <div className="w-full">
            {props.children}
        </div>
        </div>

    <style jsx>
    {`
      .page-wrap {
        height: calc(100vh - 60px);
      }
    `}
    </style>
  </>
        
  )
}

export default PageWrap