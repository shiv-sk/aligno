/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export interface IssueSummary{
    totalIssues:number,
    overdueIssues:number,
    completedIssues:number,
    onProcessIssues:number,
    issueInReview:number,
    reopenedIssues:number,
    overdueRate:number,
    completionRate:number
}
export interface ProjectInsights{
    teamEfficiency:string,
    projectHealth:string,
}
export interface Footer{
    generatedBy:string,
}
export interface Issues{
    name:string,
    status:string,
    priority:string,
    assignedTo:string,
    assignedAt:string,
    completedAt:string,
    duedate:string,
}
interface Props{
    issueSummary:any,
    projectInsights:any,
    issues:any[],
    footer:any
}

const styles = StyleSheet.create({
    page:{
        padding: 20,
        fontSize: 18,
        fontFamily: "Helvetica",
        textAlign: 'center'
    },
    header:{
        marginBottom: 20
    },
    headerText:{
        fontSize: 12,
        marginBottom: 2
    },
    summaryBox:{
        marginBottom: 20
    },
    table:{
        display: "table" as any,
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow:{
        flexDirection: "row"
    },
    tableCol:{
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 4
    },
    insight:{
        marginBottom: 20
    },
    footerNote:{
        marginTop: 20,
        fontStyle: "italic"
    }
})
export default function PDFReport({issueSummary , projectInsights , issues , footer}:Props){
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Name:Weekly-Report</Text>
                    <Text style={styles.headerText}>Date:{`${currentDate.toDateString()}-${startDate.toDateString()}`}</Text>
                    <Text style={styles.headerText}>GeneratedOn:{`${currentDate.toDateString()}`}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text>WeeklyTotalTasks:{issueSummary.totalIssues}</Text>
                    <Text>WeeklyOverdueTasks:{issueSummary.overdueIssues}</Text>
                    <Text>WeeklyCompletedTasks:{issueSummary.completedIssues}</Text>
                    <Text>WeeklyInProcessTasks:{issueSummary.onProcessIssues}</Text>
                    <Text>WeeklyInReviewTasks:{issueSummary.issueInReview}</Text>
                    <Text>WeeklyReopenedTasks:{issueSummary.reopenedIssues}</Text>
                    <Text>WeeklyoverDueRate:{issueSummary.overdueRate}</Text>
                    <Text>WeeklyCompletionRate:{issueSummary.completionRate}</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text>Name</Text></View>
                        <View style={styles.tableCol}><Text>Status</Text></View>
                        <View style={styles.tableCol}><Text>Priority</Text></View>
                        <View style={styles.tableCol}><Text>overDue</Text></View>
                        <View style={styles.tableCol}><Text>AssignedTo</Text></View>
                        <View style={styles.tableCol}><Text>AssignedAt</Text></View>
                        <View style={styles.tableCol}><Text>CompletedAt</Text></View>
                    </View>
                    {
                        issues.map((issue , index)=>(
                            <View key={index} style={styles.tableRow}>
                            <View style={styles.tableCol}><Text>{issue.name}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.status}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.priority}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.duedate}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.assignedTo}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.assignedAt}</Text></View>
                            <View style={styles.tableCol}><Text>{issue.completedAt}</Text></View>
                            </View> 
                        ))
                    }
                </View>
                <View style={styles.insight}>
                    <Text>ProjectHealth:{projectInsights.projectHealth}</Text>
                    <Text>TeamEfficiency:{projectInsights.teamEfficiency}</Text>
                </View>
                <View style={styles.footerNote}>
                    <Text>GeneratedBy:{footer.generatedBy}</Text>
                </View>
            </Page>
        </Document>
    )
}