import jwt from "jsonwebtoken"

const isAuthenticated = (req: any, res: any, next: any) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {

       const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
       req.userId = decoded;
       next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
      
    }
}

module.exports = isAuthenticated;