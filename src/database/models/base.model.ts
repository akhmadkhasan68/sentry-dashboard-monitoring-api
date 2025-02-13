import { Column, DataType, CreatedAt, UpdatedAt, DeletedAt, Model } from "sequelize-typescript";
import { IBase } from "../interfaces/base.interface";

export class BaseModel extends Model implements IBase {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    id: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
