import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../styles/RegistrosList.css'; // Asegúrate de crear este archivo CSS

interface Registro {
  id: number;
  username: string;
  email: string;
  depositCode: string;
}

const RegistrosList: React.FC = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch para obtener los registros de usuarios
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/registro', {
          credentials: 'include',
        });
        const data: Registro[] = await response.json();
        setRegistros(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los registros:', error);
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  // Función para editar usuario
  const editUser = (id: number) => {
    console.log(`Editar usuario con id: ${id}`);
    // Aquí puedes abrir el modal de edición y rellenar los campos del formulario con los datos correspondientes
  };

  // Función para eliminar usuario
  const deleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/registro/${id}`, {
        method: 'DELETE',
      });
      // Actualizar la lista de registros eliminando el usuario correspondiente
      setRegistros((prevRegistros) =>
        prevRegistros.filter((registro) => registro.id !== id)
      );
      console.log(`Usuario con id ${id} eliminado`);
    } catch (error) {
      console.error(`Error al eliminar el usuario con id ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Cargando registros...</p>;
  }

  // Agrupar registros en filas de 3
  const rows = [];
  for (let i = 0; i < registros.length; i += 3) {
    rows.push(registros.slice(i, i + 3));
  }

  return (
    <div className="registros-list">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="registros-row">
          {row.map((registro) => (
            <Card
              key={registro.id}
              userId={registro.id} // Aquí se pasa el userId
              username={registro.username}
              email={registro.email}
              codigoDevops={registro.depositCode}
              imageUrl="https://res.cloudinary.com/dpttspfhc/image/upload/v1726512520/imagenMujer_zdo1vs.png"
              onEdit={() => editUser(registro.id)}
              onDelete={() => deleteUser(registro.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default RegistrosList;
