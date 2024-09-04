import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AbomtModule } from './abomt/abomt.module';
import { DomaineModule } from './domaine/domaine.module';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitutionModule } from './institution/institution.module';
import { ModuloModule } from './modulo/modulo.module';
import { FormationModule } from './formation/formation.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MessageModule } from './message/message.module';
import { DiscussionModule } from './discussion/discussion.module';

// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// }

// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN)
//   }
//   return null
// }

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/', // L'URL de base pour accéder aux fichiers
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/elearningplatform'),AuthModule, AbomtModule, DomaineModule, InstitutionModule, ModuloModule, FormationModule, MessageModule, DiscussionModule,
  // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
  // import('@adminjs/nestjs').then(({ AdminModule }) => AdminModule.createAdminAsync({
  //   useFactory: () => ({
  //     adminJsOptions: {
  //       rootPath: '/admin',
  //       resources: [],
  //     },
  //     auth: {
  //       authenticate,
  //       cookieName: 'adminjs',
  //       cookiePassword: 'secret'
  //     },
  //     sessionOptions: {
  //       resave: true,
  //       saveUninitialized: true,
  //       secret: 'secret'
  //     },
  //   }),
  // })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
