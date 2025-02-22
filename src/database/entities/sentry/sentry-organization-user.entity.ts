import { Column, Entity } from "typeorm";
import { ISentryOrganizationUser } from "../../interfaces/sentry/sentry-organization-user.interface";
import { BaseEntity } from "../base.entity";

@Entity({
    name: "sentry_organization_users",
})
export class SentryOrganizationUserEntity extends BaseEntity implements ISentryOrganizationUser {
    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryUserId: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryUserEmail: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    sentryUserName: string;
}
