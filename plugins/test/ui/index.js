import React from 'react'
const test = (props) => {
  console.log(props)
  return(
    <div>
      TEST
    </div>
  )
}

export default () => {
  return {
    customerRightSidebarSection: {
      section: test
    }
  }
}