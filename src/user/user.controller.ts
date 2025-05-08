import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Creamos un nuevo usuario

  @Post('crear')
  async crearUsuario(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.crearUsuario(userData);
  }

  // Obtenemos usuarios por su correo
  @Get('correo/:correo')
  async obtenerPorCorreo(@Param('correo') correo: string): Promise<User | null>{
    return this.userService.obtenerPorCorreo(correo);
  }

}
