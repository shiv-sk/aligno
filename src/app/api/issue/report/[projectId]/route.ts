import dbConnect from "@/lib/connection.db";
import { authorizeRole } from "@/lib/middleware/authorizerole";
import { streamPDF } from "@/lib/utils/pdf-utils";
import Issue from "@/models/issue.model";
import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export const runtime = 'nodejs';
export async function GET(req: NextRequest , {params}:{params:{projectId:string}}){
    await dbConnect();
    try {
        const projectId = params.projectId;
        if(!projectId){
            return NextResponse.json({
                success:false,
                status:400,
                message:"projectId is required!"
            } , {status:400})
        }
        const authorizedUser = await authorizeRole(["Manager" , "TeamLead" , "Employee"])(projectId.toString());
        if("status" in authorizedUser){
            return authorizedUser;
        }
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const issues = await Issue.find({projectId , updatedAt: { $gte: startDate, $lte: endDate }}).populate("assignedTo" , "name");
        if(issues.length === 0){
            return NextResponse.json({
                success:false,
                status:404,
                message:"Issues is not found!"
            } , {status:400})
        }
        const overdueStatus = ["Reopened" , "Open" , "Assigned"];
        const issueStatus = ["Assigned" , "Review"];
        const totalIssues = issues.length;
        const completedIssues = issues.filter((issue)=>(issue.status === "Closed")).length;
        const onProcessIssues = issues.filter((issue)=>(issueStatus.includes(issue.status))).length;
        const issueInReview = issues.filter((issue)=>(issue.status === "Review")).length;
        const reopenedIssues = issues.filter((issue)=>(issue.status === "Reopened")).length;
        const completionRate = Math.round((completedIssues / totalIssues) * 100);
        const overdueIssues = issues.filter((issue)=>((overdueStatus.includes(issue.status)) && new Date() > new Date(issue.duedate))).length;
        const overdueRate = Math.round((overdueIssues / totalIssues) * 100);
        let projectHealth = "Balanced";
        let teamEfficiency = "Medium";
        if(overdueRate > 40){
            projectHealth = "Delayed";
        }else if(onProcessIssues > completedIssues && overdueRate > 20){
            projectHealth = "Overloaded";
        }
        if(completionRate >= 80 && overdueIssues <= 1){
            teamEfficiency = "High";
        }else if(completionRate <= 40 && overdueRate >= 30){
            teamEfficiency = "Low";
        }
        const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf");
        const fontPathBold = path.join(process.cwd(), "public", "fonts", "Roboto-Bold.ttf");
        console.log("Regular exists:", fs.existsSync(fontPath));
        console.log("Bold exists:", fs.existsSync(fontPathBold));
        const doc = new PDFDocument({ margin: 40 });
        doc.registerFont("regular" , fontPath);
        doc.registerFont("bold" , fontPathBold);
        doc.font("regular");
        doc.fontSize(18).text("Weekly Project Report",{ align: "center" }).moveDown();
        doc.fontSize(16).text("Summary:", { underline: true }).moveDown(0.5);
        doc.fontSize(12);
        doc.text(`Total Issues: ${totalIssues}`);
        doc.text(`Completed Issues: ${completedIssues}`);
        doc.text(`Overdue Issues: ${overdueIssues}`);
        doc.text(`Issues in Review: ${issueInReview}`);
        doc.text(`Reopened Issues: ${reopenedIssues}`);
        doc.text(`Completion Rate: ${completionRate}%`);
        doc.text(`Overdue Rate: ${overdueRate}%`);
        doc.moveDown();
        doc.fontSize(14).text("Insights:", { underline: true }).moveDown(0.5);
        doc.fontSize(12);
        doc.text(`Project Health: ${projectHealth}`);
        doc.text(`Team Efficiency: ${teamEfficiency}`);
        doc.moveDown();
        doc.fontSize(14).text("Issue Breakdown:", { underline: true }).moveDown(0.5);
        doc.font("bold");
        doc.text("Name", 50, doc.y, { continued: true });
        doc.text("Priority", 150, doc.y, { continued: true });
        doc.text("DueDate", 250, doc.y, { continued: true });
        doc.text("AssignedTo", 350, doc.y, { continued: true });
        doc.text("CreatedAt", 450, doc.y, { continued: true });
        doc.text("CompletedAt", 550, doc.y);
        doc.moveDown(0.5);
        doc.font("regular");
        issues.forEach((issue)=>{
            doc.text(issue.name || "N/A", 50, doc.y, { continued: true });
            doc.text(issue.priority || "N/A", 150, doc.y, { continued: true });
            doc.text(new Date(issue.duedate).toLocaleDateString(), 250, doc.y, { continued: true });
            doc.text(issue.assignedTo?.name || "Unassigned", 350, doc.y, { continued: true });
            doc.text(new Date(issue.createdAt).toLocaleDateString(), 450, doc.y, { continued: true });
            doc.text(issue.completedAt ? new Date(issue.completedAt).toLocaleDateString() : "—", 550, doc.y);
        })
        doc.moveDown(2);
        doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: "right" });
        doc.fontSize(10).text(`Generated by: ${authorizedUser.user.name}`, { align: "right" });
        doc.end();
        const buffer = await streamPDF(doc);
        return new NextResponse(buffer , {
            status:200,
            headers:{
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=weekly-report.pdf"
            }
        })
    } catch (err) {
        console.error("PdfReport error!" , err);
        return NextResponse.json({
            success:false,
            status:500,
            message:"PdfReport error! "
        } , {status:500})
    }
}