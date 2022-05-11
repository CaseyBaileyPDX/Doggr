import "dotenv/config";
import jwt from "jsonwebtoken";

export default function AuthenticateToken(req, res, next) {
  console.log("In authenticateToken");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  console.log("Token before verify:", token);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {

    if (err) {
      console.log(" ERROR", err);
      return res.sendStatus(403);
    }

    console.log("Gotem auth test");
    req.user = user;

    next();
  });
}