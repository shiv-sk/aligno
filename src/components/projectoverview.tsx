import { ProjectOverview as ProjectOverviewType } from "@/types/projectoverview";

export default function ProjectOverview({projectOverview}: {projectOverview:ProjectOverviewType | undefined | null}){
    let teamEfficiencytooltipData;
    let projectHealthtooltip;
    let workLoad;
    let workLoadbadge;
    let workLoadtooltip;
    switch(projectOverview?.teamEfficiency){
        case "Low":
            teamEfficiencytooltipData = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        case "Balanced":
            teamEfficiencytooltipData = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        case "High":
            teamEfficiencytooltipData = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        default:
            teamEfficiencytooltipData = `project has overduerate 0% and completionrate 0%`
    }

    switch(projectOverview?.projectHealth){
        case "Medium":
            projectHealthtooltip = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        case "Overloaded":
            projectHealthtooltip = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        case "Underloaded":
            projectHealthtooltip = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        case "Needs Attention":
            projectHealthtooltip = `project has overduerate ${projectOverview.overdueRate} and completionrate ${projectOverview.completionRate}`
            break
        default:
            projectHealthtooltip = `project has overduerate 0% and completionrate 0%`
    }
    if(projectOverview?.completionRate && projectOverview?.overdueRate){
        if(projectOverview?.completionRate >= 40 && projectOverview?.overdueRate <= 30){
            workLoad = "Healthy";
            workLoadbadge = "badge badge-success";
            workLoadtooltip = `project has ${projectOverview.perUserIssue} with ${projectOverview.completionRate} completionRate , ${projectOverview.overdueRate} overdueRate`
        }
        else if(projectOverview?.completionRate >= 40 && projectOverview?.overdueRate <= 40){
            workLoad = "Moderate";
            workLoadbadge = "badge badge-primary";
            workLoadtooltip = `project has ${projectOverview.perUserIssue} with ${projectOverview.completionRate} completionRate , ${projectOverview.overdueRate} overdueRate`
        }
        else if(projectOverview?.completionRate <= 30 && projectOverview?.overdueRate > 40){
            workLoad = "Moderate";
            workLoadbadge = "badge badge-error";
            workLoadtooltip = `project has ${projectOverview.perUserIssue} Tasks Per User with ${projectOverview.completionRate} completionRate , ${projectOverview.overdueRate} overdueRate`
        }
    }
    return(
        <div className="bg-base-300 rounded-lg shadow-lg py-6 px-3 space-y-6 w-full mb-6">
            <h1 className="text-center font-semibold text-xl">ProjectOverview</h1>
            {
                projectOverview ? (
                    <div className="flex flex-wrap justify-evenly ietms-center gap-4">
                        <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                            <p>Teamefficiency</p>
                            <p className="tooltip" data-tip={teamEfficiencytooltipData}>
                                <span className="badge badge-primary">{projectOverview?.teamEfficiency || "Teamefficiency"}</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[150px] h-[80px]">
                            <p>Projecthealth</p>
                            <p className="tooltip" data-tip={projectHealthtooltip}>
                                <span className="badge badge-success">{projectOverview?.projectHealth || "ProjectHealth"}</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-center bg-base-100 rounded-lg shadow-lg py-6 px-3 w-[180px] h-[80px]">
                            <p>Workload</p>
                            <p className="tooltip" data-tip={workLoadtooltip}>
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