import Issuedetail from "@/components/issuedetail"
export default function IssueDetail(){
    return(
        <div className="bg-base-300 min-h-screen py-6">
            <h1 className="text-center font-bold py-2 px-3 text-2xl">Task-Detail</h1>
            <div className="flex justify-center">
                <Issuedetail/>
            </div>
        </div>
    )
}