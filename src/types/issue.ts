interface Project{
    _id:string,
    name?:string
}

interface User{
    _id:string,
    name?:string,
    email?:string
}

export interface Issue{
    _id:string,
    name: string,
    description: string,
    projectId: Project,
    createdBy: User,
    assignedBy: User,
    assignedTo: User,
    status:string,
    priority:string,
    duedate:Date,
    completedAt:Date,
    assignedAt:Date,
    createdAt:Date,
    updatedAt:Date,
    links:string[],
    attachments:[]
}
