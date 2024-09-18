import { db } from '../config/database';

export interface Registro {
  id?: number;
  username: string;
  password: string;
  email: string;
  depositCode: string;
}

// Obtener usuario por nombre de usuario
export const findRegistroByUsername = async (username: string): Promise<Registro | null> => {
  const [rows] = await db.query('SELECT * FROM registro WHERE username = ?', [username]);
  return (rows as Registro[])[0] || null;
};

// Crear nuevo registro
export const createRegistro = async (registro: Registro): Promise<void> => {
  await db.query(
    'INSERT INTO registro (username, password, email, depositCode) VALUES (?, ?, ?, ?)',
    [registro.username, registro.password, registro.email, registro.depositCode]
  );
};

// Obtener todos los registros
export const getAllRegistros = async (): Promise<Registro[]> => {
  const [rows] = await db.query('SELECT * FROM registro');
  return rows as Registro[];
};

// Actualizar un registro
export const updateRegistro = async (id: number, registro: Partial<Registro>): Promise<void> => {
  const fields = Object.keys(registro).map(field => `${field} = ?`).join(', ');
  const values = Object.values(registro);
  await db.query(`UPDATE registro SET ${fields} WHERE id = ?`, [...values, id]);
};

// Eliminar un registro
export const deleteRegistro = async (id: number): Promise<void> => {
  await db.query('DELETE FROM registro WHERE id = ?', [id]);
};
