import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ unique: true})
    correo: string;

    @Column()
    contraseña: string;

    @Column()
    rol: string; // definimos los que los usuario sean 'admin', 'empleado', 'cliente'
}