import React from "react";

import Typography from '@mui/material/Typography';
import {Card as ServiceCard} from '@mui/material'
import { CardActionArea } from '@mui/material';
import "./css/card.css";


  const styles = {
    containerCard:{
      margin: '20px',


    },
    cardContent: {
      display: 'flex',
      flexDirection:'column',
      alignItems: 'center',
      height:'400px',
      gap:'20px',
      padding: '15px'
    },
    img: {
      width: '50%',
    },
    name: {
      color: '#1F2937',
      padding: '10px 0 20px 0'
    },
    tipography: {
      color: '#1F2937',
      padding: '5px 0 5px 0'
    }
  }

export default function Card({ name, img, description, price, category }) {
  return (
    <ServiceCard style={styles.containerCard}>
      <CardActionArea style={styles.cardContent}>
      <Typography style={styles.name} variant="h5">{name}</Typography>
      <img style={styles.img} src={img} alt="not found"/>
      <Typography style={styles.tipography} variant="h6">Price: ${price}</Typography>
      <Typography style={styles.tipography} variant="h6">Category: {category}</Typography>
      </CardActionArea>
    </ServiceCard>
  );
}