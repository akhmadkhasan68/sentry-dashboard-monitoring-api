export interface SentryOrganizationProjectIssuesListDto {
    id:                  string;
    shareId:             null | string;
    shortId:             string;
    title:               string;
    culprit:             string;
    permalink:           string;
    logger:              any | null;
    level:               Level;
    status:              Status;
    statusDetails:       StatusDetails;
    substatus:           Substatus;
    isPublic:            boolean;
    platform:            any;
    project:             Project;
    type:                SentryOrganizationProjectIssuesListDtoType;
    metadata:            Metadata;
    numComments:         number;
    assignedTo:          AssignedTo | null;
    isBookmarked:        boolean;
    isSubscribed:        boolean;
    subscriptionDetails: null;
    hasSeen:             boolean;
    annotations:         any[];
    issueType:           string;
    issueCategory:       IssueCategory;
    priority:            Priority;
    priorityLockedAt:    null;
    isUnhandled:         boolean;
    count:               string;
    userCount:           number;
    firstSeen:           Date;
    lastSeen:            Date;
    stats:               any;
}

export interface AssignedTo {
    email: string;
    type:  string;
    id:    string;
    name:  string;
}

export enum IssueCategory {
    Error = "error",
    Performance = "performance",
}

export enum Level {
    Error = "error",
    Info = "info",
}

export interface Metadata {
    value:                          string;
    type?:                          string;
    filename?:                      string;
    function?:                      string;
    in_app_frame_mix?:              InAppFrameMix;
    sdk?:                           SDK;
    initial_priority:               number;
    title?:                         null | string;
    display_title_with_tree_label?: boolean;
    location?:                      string;
}

export enum InAppFrameMix {
    InAppOnly = "in-app-only",
    Mixed = "mixed",
    SystemOnly = "system-only",
}

export interface SDK {
    name:            string;
    name_normalized: string;
}

export enum Priority {
    High = "high",
    Low = "low",
}

export interface Project {
    id:       string;
    name:     string;
    slug:     string;
    platform: string;
}

export enum Status {
    Unresolved = "unresolved",
}

export interface StatusDetails {
}

export enum Substatus {
    Escalating = "escalating",
    New = "new",
    Ongoing = "ongoing",
    Regressed = "regressed",
}

export enum SentryOrganizationProjectIssuesListDtoType {
    Error = "error",
    Transaction = "transaction",
}
