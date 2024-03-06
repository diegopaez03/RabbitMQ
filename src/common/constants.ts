export enum RabbitMQ {
  UsuarioQueue = 'usuario',
  EmpresaQueue = 'empresa',
}

export enum UsuarioMSG {
  CREATE = 'CREATE_USUARO',
  FIND_ALL = 'FIND_USUARIOS',
  FIND_ONE = 'FIND_USUARIO',
  UPDATE = 'UPDATE_USUARIO',
  DELETE = 'DELETE_USUARIO',
  VALID_USER = 'VALID_USUARIO',
}

export enum EmpresaMSG {
  CREATE = 'CREATE_EMPRESA',
  FIND_ALL = 'FIND_EMPRESAS',
  FIND_ONE = 'FIND_EMPRESA',
  UPDATE = 'UPDATE_EMPRESA',
  DELETE = 'DELETE_EMPRESA',
  VALID = 'VALID_EMPRESA',
}