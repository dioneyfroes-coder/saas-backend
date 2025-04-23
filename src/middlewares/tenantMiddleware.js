// Middleware que extrai o tenantId do usuário autenticado e insere em req.tenantId
const tenantMiddleware = (req, res, next) => {
  try {
    // Verifica se o usuário está autenticado e possui um tenantId
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Acesso negado: usuário não autenticado' });
    }

    if (!user.tenantId) {
      return res.status(403).json({ message: 'Acesso negado: tenant não identificado' });
    }

    // Adiciona o tenantId ao objeto da requisição
    req.tenantId = user.tenantId;
    next();
  } catch (error) {
    console.error('Erro no tenantMiddleware:', error);
    res.status(500).json({ message: 'Erro interno no middleware de tenant' });
  }
};

export default tenantMiddleware;