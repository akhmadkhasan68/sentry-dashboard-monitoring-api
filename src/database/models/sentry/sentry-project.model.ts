import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "../base.model";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";

@Table({
    timestamps: true,
    tableName: "sentry_projects",
})
export class SentryProjectModel extends BaseModel implements ISentryProject {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryProjectId: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryProjectName: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryProjectSlug: string;
}
