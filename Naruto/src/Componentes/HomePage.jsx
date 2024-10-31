// HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db } from '../FireBase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './HomePage.css';

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dattebayo-api.onrender.com/characters')
      .then(response => {
        setCharacters(response.data.characters);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addFavorite = async (character) => {
    try {
      await addDoc(collection(db, 'favorites'), {
        name: character.name,
        birthday: character.birthday
      });
      alert(`${character.name} agregado a favoritos`);
    } catch (error) {
      console.error('Error al agregar favorito:', error);
    }
  };

  const handleViewFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className="homepage-container">
      <Button
        variant="contained"
        color="primary"
        onClick={handleViewFavorites}
      >
        Ver Favoritos
      </Button>
      {Array.isArray(characters) && characters.map(character => (
        <Card key={character.id} className="card">
          <CardMedia
            component="img"
            image={character.images[0]}
            alt={character.name}
          />
          <CardContent className="card-content">
            <Typography className="card-title">{character.name}</Typography>
            <Typography className="card-subtitle">{character.birthday}</Typography>
            <Link to={`/character/${character.id}`} className="card-link">Ver Detalles</Link>
            <IconButton onClick={() => addFavorite(character)} className="icon-button">
              <FavoriteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
