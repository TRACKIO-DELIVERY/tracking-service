import express from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!
type Response = express.Response;
type Request = express.Request;
type Next = express.NextFunction

function authenticateToken(req: Request, res:Response, next:Next) {

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

  const token = authHeader.split(' ')[1]; // Bearer  token..

  if (!token) return res.status(401).json({ error: 'Token inválido' });

  jwt.verify(token, secret, (err) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });

    next();
  });
}

export default authenticateToken;
