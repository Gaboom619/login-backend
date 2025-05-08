import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World Gabriel y Hola Mundo en español xD !';
  }
}
