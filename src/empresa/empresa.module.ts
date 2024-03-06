import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';

@Module({
  controllers: [EmpresaController]
})
export class EmpresaModule {}
