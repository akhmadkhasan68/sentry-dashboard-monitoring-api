import { BelongsTo, Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "../base.model";
import { ISentryProject } from "../../interfaces/sentry/sentry-project.interface";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";
import { SentryTeamModel } from "./sentry-team.model";

@Table({
    timestamps: true,
    tableName: "sentry_projects",
})
export class SentryProjectModel extends BaseModel implements ISentryProject {
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    sentryTeamId: string;

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

    /* Relations */

    @BelongsTo(() => SentryTeamModel, {
        foreignKey: "sentryTeamId",
        as: "team",
    })
    sentryTeam?: ISentryTeam;
}
