import { Column, DataType, Table } from "sequelize-typescript";
import { IProject } from "../interfaces/project.interface";
import { BaseModel } from "./base.model";

@Table({
    timestamps: true,
    tableName: "projects",
})
export class ProjectModel extends BaseModel implements IProject {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;
}
