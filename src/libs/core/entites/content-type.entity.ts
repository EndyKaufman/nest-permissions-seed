import { IsNotEmpty, MaxLength, validateSync } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Permission } from './permission.entity';
import { CustomValidationError } from '../exceptions/custom-validation.error';

@Entity({ name: 'content_type' })
export class ContentType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @Column({ length: 255 })
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @OneToMany(type => Permission, permission => permission.contentType)
    permissions: Permission[];

    @BeforeInsert()
    doBeforeInsertion() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }

    @BeforeUpdate()
    doBeforeUpdate() {
        const errors = validateSync(this, { validationError: { target: false } });
        if (errors.length > 0) {
            throw new CustomValidationError(errors)
        }
    }
}