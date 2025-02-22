import { Column, Table, DataType } from "sequelize-typescript";
import { ISentryOrganizationUser } from "../../interfaces/sentry/sentry-organization-user.interface";
import { BaseModel } from "../base.model";

@Table({
    timestamps: true,
    tableName: "sentry_organization_users",
})
export class SentryOrganizationUserModel extends BaseModel implements ISentryOrganizationUser {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryUserId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryUserEmail: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    sentryUserName: string;
}
