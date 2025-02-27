import { IBase } from "../base.interface";
import { IProject } from "./project.interface";

export interface IProjectMicroserviceService extends IBase {
    projectId: string;
    name: string;
    isActive: boolean;

    /* Relations */
    project?: IProject;
}
