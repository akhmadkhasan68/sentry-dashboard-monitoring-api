import { IBase } from "../base.interface";
import { ISentryTeam } from "../sentry/sentry-team.interface";
import { IProjectMicroserviceService } from "./project-microservice-service.interface";
import { IProjectSentryTeam } from "./project-sentry-team.interface";

export interface IProject extends IBase {
    name: string;
    description?: string;
    isActive: boolean;
    isMicroservices: boolean;

    /* Relations */
    projectMicroserviceServices?: IProjectMicroserviceService[];
    projectSentryTeams?: IProjectSentryTeam[];
}
