import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  findRegistroByUsername,
  createRegistro,
  getAllRegistros,
  updateRegistro,
  deleteRegistro,
  Registro,
} from '../models/registroModel';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, email, depositCode } = req.body;

    // Validación del código de depósito
    if (depositCode !== '12345') {
      return res.status(400).json({ message: 'Código de depósito incorrecto' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await findRegistroByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo registro
    const newRegistro: Registro = {
      username,
      password: hashedPassword,
      email,
      depositCode,
    };

    await createRegistro(newRegistro);

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await findRegistroByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Configura la sesión
    req.session.user = { id: user.id, username: user.username };

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const getRegistros = async (req: Request, res: Response) => {
  try {
    const registros = await getAllRegistros();
    res.status(200).json(registros);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    await updateRegistro(Number(id), updates);

    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteRegistro(Number(id));
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
