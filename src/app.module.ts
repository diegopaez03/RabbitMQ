import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQ } from './common/constants';
import { UsuarioModule } from './usuario/usuario.module';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'API_Gateway',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: RabbitMQ.UsuarioQueue,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    UsuarioModule,
    EmpresaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
