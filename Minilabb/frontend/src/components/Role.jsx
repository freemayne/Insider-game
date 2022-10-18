import { Box } from '@mui/system'
import React from 'react'

const Role = () => {
  let roles = ["Master", "Insider"]

  for (let index = 2; index < 6; index++) {
    roles.push("commoner")
    
  }
  console.log(roles)

    return (
    <Box></Box>
  )
}

export default Role