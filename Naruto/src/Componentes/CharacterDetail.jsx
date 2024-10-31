import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { db } from '../FireBase/firebase'; 
import { Card, CardContent, Typography } from '@mui/material';
import './CharacterDetail.css'; // Asegúrate de tener estilos definidos
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://dattebayo-api.onrender.com/characters/${id}`)
      .then(response => {
        console.log(response.data); // Verifica cómo luce la respuesta completa
        setCharacter(response.data);
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
      });
  }, [id]);

  if (!character) {
    return <p>Loading...</p>;
  }

  const {
    name,
    images,
    personal,
    rank,
    debut,
    family,
    jutsu,
    affiliation,
    clan,
    titles
  } = character;

  return (
    <div className="character-detail-container">
      <Card className="character-card">
        <Carousel className="character-carousel" showThumbs={true} infiniteLoop autoPlay>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Character ${index}`} />
            </div>
          ))}
        </Carousel>
        <CardContent className="character-content">
          <Typography variant="h4" className="character-name">{name}</Typography>
          {personal && (
            <>
              <Typography variant="h6" className="section-title">Información Personal</Typography>
              <Typography>Fecha de nacimiento: {personal.birthdate}</Typography>
              <Typography>Sexo: {personal.sex}</Typography>
              <Typography>Altura: {personal.height && JSON.stringify(personal.height)}</Typography>
              <Typography>Peso: {personal.weight && JSON.stringify(personal.weight)}</Typography>
              <Typography>Grupo sanguíneo: {personal.bloodType}</Typography>
              <Typography>Clan: {clan}</Typography>
              <Typography>Clasificación: {personal.classification}</Typography>
            </>
          )}
          {rank && (
            <>
              <Typography variant="h6" className="section-title">Rango Ninja</Typography>
              <Typography>Rango: {rank.ninjaRank && JSON.stringify(rank.ninjaRank)}</Typography>
              <Typography>Número de registro: {rank.ninjaRegistration}</Typography>
            </>
          )}
          {affiliation && (
            <>
              <Typography variant="h6" className="section-title">Afiliaciones</Typography>
              {affiliation.map((affil, index) => (
                <Typography key={index}>{affil}</Typography>
              ))}
            </>
          )}
          {jutsu && (
            <>
              <Typography variant="h6" className="section-title">Jutsus</Typography>
              {jutsu.map((j, index) => (
                <Typography key={index}>{j}</Typography>
              ))}
            </>
          )}
          {titles && (
            <>
              <Typography variant="h6" className="section-title">Títulos</Typography>
              {titles.map((title, index) => (
                <Typography key={index}>{title}</Typography>
              ))}
            </>
          )}
          {debut && (
            <>
              <Typography variant="h6" className="section-title">Debut</Typography>
              <Typography>Manga: {debut.manga}</Typography>
              <Typography>Anime: {debut.anime}</Typography>
              <Typography>Novela: {debut.novel}</Typography>
              <Typography>Película: {debut.movie}</Typography>
            </>
          )}
          {family && (
            <>
              <Typography variant="h6" className="section-title">Familia</Typography>
              {Object.entries(family).map(([key, value], index) => (
                <Typography key={index}>{`${key}: ${value}`}</Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CharacterDetail;
