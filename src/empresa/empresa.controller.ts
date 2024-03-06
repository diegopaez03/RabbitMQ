import { Controller, Get, HttpException, HttpStatus, Logger, Param } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { EmpresaMSG, RabbitMQ } from 'src/common/constants';

@Controller('empresa')
export class EmpresaController {

    private empresaClient: ClientProxy; // Declaración del cliente RabbitMQ
    private readonly logger = new Logger(EmpresaController.name);

    constructor() {
      this.empresaClient = ClientProxyFactory.create({
        transport: Transport.RMQ, // Utiliza el transporte RMQ
        options: {
          urls: [process.env.AMQP_URL], // Utiliza la URL de RabbitMQ desde las variables de entorno
          queue: RabbitMQ.EmpresaQueue, // Utiliza la cola adecuada definida en tu configuración de RabbitMQ
          queueOptions: {
            durable: false // Opciones de la cola
          },
        },
      });
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
    try {
      const result = await this.empresaClient.send(EmpresaMSG.FIND_ONE, id);
      return result;
    } catch (error) {
      this.logger.error(error.msg);
      throw new HttpException(error.msg, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
