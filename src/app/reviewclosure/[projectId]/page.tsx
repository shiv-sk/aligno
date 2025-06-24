export default function ReviewClosure(){
    return(
        <div className="flex flex-col justify-center items-center min-h-screen py-5 bg-base-300">
            <h1 className="text-xl font-semibold py-3.5 px-2">AllTasks</h1>
            <div className="flex flex-wrap gap-3 justify-center items-center">
                <div className="card bg-base-100 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Task-Title!</h2>
                        <p>Task Description!</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-neutral shadow-xl tooltip" data-tip="Mark As Completed">Close</button>
                        <button className="btn btn-neutral shadow-xl tooltip" data-tip="Mark As Reopens">Reopen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}