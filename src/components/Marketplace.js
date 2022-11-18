import { Box } from '@mui/material'
import React from 'react'

function Marketplace() {
  return (
    <div className='container'>
      <Box sx={{ width: '100%', padding: '0', marginTop: { xs: '50px', sm: '60px', md: '70px', lg: '100px' } }}>
        <div className='footer-position '>
          <div className='container mt-4' style={{ margin: '5% 0' }}>
            <div className='row'>
              <div className='col'>
                <h4>Coming Soon...!</h4>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Marketplace