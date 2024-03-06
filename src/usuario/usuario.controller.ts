import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMQ, UsuarioMSG } from 'src/common/constants';
import { AllExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('usuario')
@UseFilters(AllExceptionFilter) // Aplica el filtro de excepciones a este controlador
export class UsuarioController {
  private usuarioClient: ClientProxy; // Declaración del cliente RabbitMQ

  constructor() {
    this.usuarioClient = ClientProxyFactory.create({
      transport: Transport.RMQ, // Utiliza el transporte RMQ
      options: {
        urls: [process.env.AMQP_URL], // Utiliza la URL de RabbitMQ desde las variables de entorno
        queue: RabbitMQ.UsuarioQueue, // Utiliza la cola adecuada definida en tu configuración de RabbitMQ
        queueOptions: {
          durable: false // Opciones de la cola
        },
      },
    });
  }

  @Post()
  async create(@Body() data: any) {
    try {
      const result = await this.usuarioClient.send(UsuarioMSG.CREATE, data).toPromise();
      return result;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.usuarioClient.send(UsuarioMSG.FIND_ALL, {}).toPromise();
      return result;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.usuarioClient.send(UsuarioMSG.FIND_ONE, id).toPromise();
      return result;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      const result = await this.usuarioClient.send(UsuarioMSG.UPDATE, { id, data }).toPromise();
      return result;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.usuarioClient.send(UsuarioMSG.DELETE, { id }).toPromise();
      return result;
    } catch (error) {
      throw new HttpException('Error al enviar solicitud a microservicio', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
