import { IBase } from "./../base.interface";

export interface ISentryProject extends IBase {
    sentryProjectId: string;
    sentryProjectName: string;
    sentryProjectSlug: string;
}
