import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Hola! Has llegado al controlador de bienvenida, aquí lo más interesante eres tú. Sigue explorado para ver más.';
  }
}
