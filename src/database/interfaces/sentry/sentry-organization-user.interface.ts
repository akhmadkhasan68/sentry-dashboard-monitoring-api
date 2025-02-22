import { IBase } from "../base.interface";

export interface ISentryOrganizationUser extends IBase {
    sentryUserId: string;
    sentryUserEmail: string;
    sentryUserName: string;
}
