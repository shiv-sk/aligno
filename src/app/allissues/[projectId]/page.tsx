import Link from "next/link";

export default function AllIssues(){
    return(
        <div className="bg-base-200 min-h-screen">
            <div className="flex flex-col items-center pt-8">
                <h1 className="text-xl font-bold py-4 px-2.5">All Issues</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2.5">
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Issue Title!</h2>
                            <p>Issue-Description!</p>
                            <div className="card-actions justify-end">
                            <Link href={`/aboutissue/1234`}><button className="btn btn-primary">More</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Issue Title!</h2>
                            <p>Issue-Description!</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Issue Title!</h2>
                            <p>Issue-Description!</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Issue Title!</h2>
                            <p>Issue-Description!</p>
                            <div className="card-actions justify-end">
                            <button className="btn btn-primary">More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}