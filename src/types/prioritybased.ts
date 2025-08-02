export interface Priority{
    priority:string,
    count:number
}
export interface IssueRates{
    activityRate:number,
    completionRate:number,
    overdueRate:number,
    prioritybased:Priority[]
}

/* 
const projectHealth = {
            completionRate,
            overdueRate,
            activityRate,
        }
*/