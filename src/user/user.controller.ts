import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Creamos un nuevo usuario

  @Post('crear')
  async crearUsuario(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.crearUsuario(userData);
  }

  @Post('login')
  async login(@Body() body: { correo: string; contraseña: string}): Promise<string> {
    const { correo, contraseña } = body;
    return this.userService.login(correo, contraseña);
  }

  @UseGuards(JwtAuthGuard)
      @Get('perfil')
      getPerfil(@Request() req) {
          return {
              mensaje: 'Este es tu perfil Protegido',
              usuario: req.user,
          }
      }


  // Obtenemos usuarios por su correo
  @Get('correo/:correo')
  async obtenerPorCorreo(@Param('correo') correo: string): Promise<User | null>{
    return this.userService.obtenerPorCorreo(correo);
  }

}
