import { Column, DataType, Table } from "sequelize-typescript";
import { BaseModel } from "../base.model";
import { ISentryTeam } from "../../interfaces/sentry/sentry-team.interface";

@Table({
    timestamps: true,
    tableName: "sentry_teams",
})
export class SentryTeamModel extends BaseModel implements ISentryTeam {
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    projectId: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryTeamId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryTeamSlug: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryTeamName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    sentryMemberCount: number;
}
