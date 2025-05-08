import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

    async obtenerTodos(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async obtenerPorCorreo(correo: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { correo } });
    }
}
