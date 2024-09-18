import React from 'react';
import '../styles/Card.css';

interface CardProps {
  userId: number;
  username: string;
  email: string;
  codigoDevops: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ userId, username, email, codigoDevops, imageUrl, onEdit, onDelete }) => {
  return (
    <div className="card" data-id={userId}>
      <img
        src={imageUrl}
        alt={`Perfil de ${username}`}
        className="profile-image"
      />
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        <p className="card-text">{email}</p>
        <p className="card-text">Código Devops: {codigoDevops}</p>
      </div>
      <div className="card-actions">
        <button data-id={userId} onClick={onEdit} className="edit-button">
          Editar
        </button>
        <button data-id={userId} onClick={onDelete} className="delete-button">
          Eliminar
        </button>
      </div>
    </div>
  );
};


export default Card;
