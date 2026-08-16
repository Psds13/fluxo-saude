export interface Tenant {
  id: string;
  nome: string; // Ex: Prefeitura de São Luís
  municipio: string;
  estado: string;
  cnpj?: string;
  logoUrl?: string;
  corPrimaria?: string;
  contatoSuporte?: string;
  siteOficial?: string;
  ativo: boolean;
}

export interface UsuarioAdmin {
  id: number;
  tenantId: string;
  nome: string;
  email: string;
  perfil: 'GESTOR_MUNICIPAL' | 'ADMIN_REDE' | 'OPERADOR';
  ativo: boolean;
}
