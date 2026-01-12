import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const {recipeId} = useParams();

    console.log(recipeId);
  return (
    <>
    <Navbar/>
    </>
  )
}

export default RecipePage