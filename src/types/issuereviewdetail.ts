export interface IssueData{
    name: string;
    priority: string;
    description: string;
    issueStatus: string;
    projectName: string | null;
    assignedTo: string | null;
}
export interface TimeLineEntry{
    label: string;
    timeStamp: Date | string | null;
    by:{
        name: string | null;
    }
}
export interface ReviewSummary{
    comment: string;
    attachment: string;
    status: "Pending" | "Approved" | "Rejected";
}

export interface IssueTimelineResponse{
    issueData: IssueData;
    timeLine: TimeLineEntry[];
    reviewSummary: ReviewSummary;
}