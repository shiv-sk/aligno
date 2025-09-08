import { ProjectOverview as ProjectOverviewType } from "@/types/projectoverview";

export default function ProjectOverview({projectOverview}: {projectOverview:ProjectOverviewType | undefined | null}){
    let teamEfficiencytooltipData;
    let projectHealthtooltip;
    let workLoad;
    let workLoadbadge;
    let workLoadtooltip;
    switch(projectOverview?.teamEfficiency){
        case "Low":
            teamEfficiencytooltipData = `This project has an overdue rate of ${projectOverview.overdueRate}% and a completion rate of ${projectOverview.completionRate}%.`
            break
        case "Balanced":
            teamEfficiencytooltipData = `This project has an overdue rate of ${projectOverview.overdueRate}% and a completion rate of ${projectOverview.completionRate}%.`
            break
        case "High":
            teamEfficiencytooltipData = `This project has an overdue rate of ${projectOverview.overdueRate}% and a completion rate of ${projectOverview.completionRate}%.`
            break
        default:
            teamEfficiencytooltipData = `This project has an overdue rate of 0% and a completion rate of 0%.`
    }

    switch(projectOverview?.projectHealth){
        case "Medium":
            projectHealthtooltip = `This project is ${projectOverview.completionRate}% complete with an overdue rate of ${projectOverview.overdueRate}%.`
            break
        case "Overloaded":
            projectHealthtooltip = `This project is ${projectOverview.completionRate}% complete with an overdue rate of ${projectOverview.overdueRate}%.`
            break
        case "Underloaded":
            projectHealthtooltip = `This project is ${projectOverview.completionRate}% complete with an overdue rate of ${projectOverview.overdueRate}%.`
            break
        case "Needs Attention":
            projectHealthtooltip = `This project is ${projectOverview.completionRate}% complete with an overdue rate of ${projectOverview.overdueRate}%.`
            break
        default:
            projectHealthtooltip = `This project is 0% complete with an overdue rate of 0%.`
    }
    if((projectOverview?.completionRate && projectOverview?.overdueRate) || projectOverview?.perUserIssue){
        if(projectOverview?.completionRate >= 40 && projectOverview?.overdueRate <= 30){
            workLoad = "Healthy";
            workLoadbadge = "badge badge-success";
            workLoadtooltip = `Each user has an average of ${projectOverview.perUserIssue} Tasks, with a ${projectOverview.completionRate}% completion rate and ${projectOverview.overdueRate}% overdue rate.`
        }
        else if(projectOverview?.completionRate >= 40 && projectOverview?.overdueRate <= 40){
            workLoad = "Moderate";
            workLoadbadge = "badge badge-primary";
            workLoadtooltip = `Each user has an average of ${projectOverview.perUserIssue} Tasks, with a ${projectOverview.completionRate}% completion rate and ${projectOverview.overdueRate}% overdue rate.`
        }
        else if(projectOverview?.completionRate <= 30 && projectOverview?.overdueRate > 40){
            workLoad = "Overload";
            workLoadbadge = "badge badge-error";
            workLoadtooltip = `Each user has an average of ${projectOverview.perUserIssue} Tasks, with a ${projectOverview.completionRate}% completion rate and ${projectOverview.overdueRate}% overdue rate.`
        }
    }else{
        workLoad = "no Data";
        workLoadbadge = "badge badge-secondary";
        workLoadtooltip = `Each user has an average of 0 Tasks, with a 0% completion rate and 0% overdue rate.`
    }
    return(
        <div className="bg-base-300 rounded-lg shadow-lg py-6 px-3 space-y-6 w-full mb-6">
            <h1 className="text-center font-semibold text-xl">ProjectOverview</h1>
            {
                projectOverview ? (
                    <div className="flex md:flex-row md:flex-wrap flex-col md:justify-center items-center gap-4 mx-auto w-full">
                        <div className="w-full md:flex-col flex items-center bg-base-100 
                        rounded-lg shadow-lg py-6 px-3 md:w-[180px] h-[90px]">
                            <p className="px-1.5 font-semibold text-lg">Teamefficiency</p>
                            <p className="tooltip font-bold" data-tip={teamEfficiencytooltipData}>
                                <span className="badge badge-primary">{projectOverview?.teamEfficiency || "Teamefficiency"}</span>
                            </p>
                        </div>
                        <div className="w-full flex md:flex-col items-center bg-base-100 
                        rounded-lg shadow-lg py-6 px-3 md:w-[180px] h-[90px]">
                            <p className="px-1.5 font-semibold text-lg">Projecthealth</p>
                            <p className="tooltip font-bold" data-tip={projectHealthtooltip}>
                                <span className="badge badge-success">{projectOverview?.projectHealth || "ProjectHealth"}</span>
                            </p>
                        </div>
                        <div className="w-full flex md:flex-col items-center bg-base-100 
                        rounded-lg shadow-lg py-6 px-3 md:w-[180px] h-[90px]">
                            <p className="px-1.5 font-semibold text-lg">Workload</p>
                            <p className="tooltip font-bold" data-tip={workLoadtooltip}>
                                <span className={workLoadbadge}>{workLoad}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg font-semibold">
                            Not Enough Data!.
                        </p>
                    </div>
                )
            }
            
        </div>
    )
}