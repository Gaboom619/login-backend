import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,        
    ) {}
    async validarUsuario(correo: string, contraseña: string): Promise <any> {
        const usuario = await this.userService.obtenerPorCorreo(correo);
        if (usuario && await this.userService.validarContraseña(contraseña, usuario.contraseña)) {
             const { contraseña, ...resto } = usuario;
             return resto;           
        }
        return null;
    }

    async login(usuario: any) {
        const payload = { correo: usuario.correo, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
