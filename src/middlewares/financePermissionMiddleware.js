const financePermissionMiddleware = (req, res, next) => {
    const { user } = req;
  
    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
  
    if (user.role === 'viewer') {
      return res.status(403).json({ message: 'Permissão negada' });
    }
  
    next();
  };
  
  export default financePermissionMiddleware;