interface Issue{
    name:string,
    status:string,
    priority:string,
    duedate:Date | string,
    assignedTo:string,
    assignedAt:Date | string,
    completedAt:Date | string,
}

export default function WeeklyTasksTable({issues}: {issues:Issue[]}){
    return(
        <div className="overflow-x-auto bg-base-300 shadow-lg rounded-lg w-full py-6 px-3">
            <h1 className="text-center font-semibold text-xl">Weekly Tasks</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>status</th>
                        <th>Priority</th>
                        <th>duedate</th>
                        <th>assignedTo</th>
                        <th>assignedAt</th>
                        <th>completedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        issues && issues.length > 0 ? issues.map((issue , index)=>(
                            <tr key={index}>
                                <td>{issue.name}</td>
                                <td>{issue.status}</td>
                                <td>{issue.priority}</td>
                                <td>{issue.duedate ? new Date(issue.duedate).toDateString() : "-"}</td>
                                <td>{issue.assignedTo || "userName"}</td>
                                <td>{issue.assignedAt ? new Date(issue.assignedAt).toDateString() : "-"}</td>
                                <td>{issue.completedAt ? new Date(issue.completedAt).toDateString() : "-"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">weekly Tasks not found.</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}