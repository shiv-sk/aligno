import { Issue } from "@/types/issue";

export default function ActionableTable({issues}: {issues:Issue[]}){
    return(
        <div className="overflow-x-auto bg-base-300 shadow-lg rounded-lg w-full py-6 px-3">
            <h1 className="text-center font-semibold text-xl">Actionable Task</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>assignedTo</th>
                        <th>status</th>
                        <th>Priority</th>
                        <th>duedate</th>
                        <th>riskLabel</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        issues && issues.length > 0 ? issues.map((issue)=>(
                            <tr key={issue._id}>
                                <td>{issue.name}</td>
                                <td>{issue.assignedTo?.name || "userName"}</td>
                                <td>{issue.status}</td>
                                <td>{issue.priority}</td>
                                <td>{issue.duedate ? new Date(issue.duedate).toDateString() : "Date"}</td>
                                <td>{"riskLabel"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No actionable Tasks found.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}