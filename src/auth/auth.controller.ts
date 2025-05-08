import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}    

    @Post('login')
    async login(@Body() body: any) {
        const usuario = await this.authService.validarUsuario(body.correo, body.contraseña);
        if (!usuario) {
            throw new UnauthorizedException('Correo o contraseña incorrectos');
        }
        return this.authService.login(usuario);
    }

}
