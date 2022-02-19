import React from 'react'
import Sidebar from '../sidebar/Sidebar'

function PageWrap(props) {
  return (
    <>
      <div className="mt-[60px] flex flex-row">     
            <Sidebar/>
        <div className="w-full">
            {props.children}
        </div>
        </div>

  </>
        
  )
}

export default PageWrap