export default function AboutIssue(){
    return(
        <div className="bg-base-200 min-h-screen">
            <div className="flex flex-col items-center pt-8">
                <h1 className="text-xl font-bold py-4 px-2.5">About Issue</h1>
                <div className="flex items-center justify-center gap-4 pt-2.5">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Issue-Title!</h2>
                            <p>About-Issue!</p>
                            <p>CreatedBy-UserOne</p>
                            <p>AssignedBy-UserTwo</p>
                            <p>AssignedTo-UserThree</p>
                            <p>Satus-Open</p>
                            <p>Priority-High</p>
                            <p>Duedate-date</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">Btn-1</button>
                            <button className="btn btn-primary">Btn-2</button>
                            <button className="btn btn-primary">Btn-3</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}