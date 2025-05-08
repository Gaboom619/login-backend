import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Console } from 'console';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    async crearUsuario(datos: Partial<User>): Promise<User> {
        if (!datos.contraseña) {
            throw new Error('La contraseña es requerida');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(datos.contraseña, saltOrRounds);

        const nuevoUsuario = this.userRepository.create({
            ...datos,
            contraseña: hashedPassword,
        });
        return await this.userRepository.save(nuevoUsuario);
    }
    
    async obtenerPorCorreo(correo: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { correo } });
    }

    // Metodo para validar usuario y contraseña
    async login(correo: string, contraseña: string): Promise<string> {
        // Busca al usuario por su correo
        const usuario = await this.obtenerPorCorreo(correo);
        if (!usuario) {            
            console.error('Usuario no encontrado');
            return 'Usuario no encontrado';
        }    
        // haremos una prueba de compósicion de contraseña con bcryp
        if (correo == "Jonathan2@gmail.com") {
            const salt = "$2b$10$pUVR25FR3uEDm5bAfY1a/.";
            const nuevohash = bcrypt.hashSync('123456gabo',salt);
            console.log("Contraseña GENERADA "+nuevohash);
            if (nuevohash == "$2b$10$pUVR25FR3uEDm5bAfY1a/./G3IC/hSO7r91Vbp3x3vlmpvD1zU1AO") {
                console.log("Contraseña Base de datos: "+"$2b$10$pUVR25FR3uEDm5bAfY1a/./G3IC/hSO7r91Vbp3x3vlmpvD1zU1AO")
                console.log("La contraseña coincide con la contraseña de la base de datos")
            }
        }


    // Compara la contraseña ingresada con la almacenada
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if(!contraseñaValida) {
            console.error('Contraseña incorrecta');
            return 'Contraseña incorrecta';
        }
        return 'Login exitoso';
    }

    async validarContraseña(plain: string, hash: string): Promise<boolean> {
        //const hasheado = bcrypt.compare(plain, hash);
        //Console.log(hasheado);
        return await bcrypt.compare(plain, hash);    
      }
      

    async obtenerTodos(): Promise<User[]> {
        return await this.userRepository.find();
    }    
}
