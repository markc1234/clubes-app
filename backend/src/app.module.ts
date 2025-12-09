import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SocioModule } from './socio/socio.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from './usuario/usuario.module';
import { DeporteModule } from './deporte/deporte.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaDeporteModule } from './categoria_deporte/categoria_deporte.module';
import { DeporteSocioModule } from './deporte_socio/deporte_socio.module';
import { ComprobanteItemModule } from './comprobante_item/comprobante_item.module';
import { ComprobanteModule } from './comprobante/comprobante.module';
import { TipoComprobanteModule } from './tipo_comprobante/tipo_comprobante.module';
import { TipoItemModule } from './tipo_item/tipo_item.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'supabase-auth' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: 'aws-0-us-east-1.pooler.supabase.com',
        database: 'postgres',
        port: 6543,
        username: process.env.SUPABASE_DB_USERNAME,
        password: process.env.SUPABASE_PASSWORD,
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [],
    }),
    AuthModule,
    SocioModule,
    UsuarioModule,
    DeporteModule,
    CategoriaModule,
    CategoriaDeporteModule,
    DeporteSocioModule,
    ComprobanteItemModule,
    ComprobanteModule,
    TipoComprobanteModule,
    TipoItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
