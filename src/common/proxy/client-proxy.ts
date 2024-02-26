import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";

@Injectable()
export class ClientProxyBigSys{
    constructor(private readonly config:ConfigService){}

    clientProxyUsuarios(): ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.UsuarioQueue,
            }
        })
    }
}
