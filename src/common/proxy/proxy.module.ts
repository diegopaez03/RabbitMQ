import { Module } from "@nestjs/common";
import { ClientProxyBigSys } from "./client-proxy";

@Module({
    providers: [ClientProxyBigSys],
    exports: [ClientProxyBigSys],
})

export class ProxyModule {}

