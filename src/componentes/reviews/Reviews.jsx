import { Avatar, Box, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from '../../redux/actions'
import '../css/revwievs.css' 


export default function Reviews() {
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.reviews)
    console.log(allReviews)
    useEffect(() => {
      dispatch(getAllReviews())
    }, [dispatch])

  return (
    <Box>
      {
        allReviews && allReviews.map(rev => {
          return (
            <Box className='reviewCard' key={rev.id}>
              <Avatar sx={{ width: 152, height: 152, bottom:'80px', marginBottom:'-50px', boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" }}>
            {rev.user?.img ? (
              <img src={rev.user?.img} alt="?" width="152px" height="152px" />
            ) : (
              "?"
            )}
          </Avatar>
          <Box component='div' className='rev-dataUser'>
            <Typography>
              {rev.user.firstName}
            </Typography>
                <Typography>
                <Rating defaultValue={rev.rate} readOnly/> 
                </Typography>
          </Box>
              <Typography>
            ¨{rev.message}¨
              </Typography>
            </Box>
          )
        })
      }

    </Box>
  )
}
