import jwt from "jsonwebtoken";

export const generateJWT = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
