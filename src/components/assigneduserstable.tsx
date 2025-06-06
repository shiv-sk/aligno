import { RxCross1 } from "react-icons/rx";
export default function AssignedusersTable(){
    return(
        <div className="overflow-x-auto py-4 px-2.5 shadow-xl rounded-xl">
            <h1 className="text-center px-2.5 py-4 text-lg font-semibold border-b-2 border-b-base-300">AssignedUsers</h1>
            <table className="table">
                <thead>
                <tr>
                    <th className="text-neutral text-sm">UserName</th>
                    <th className="text-neutral text-sm">UserEmail</th>
                    <th className="text-neutral text-sm">Role</th>
                    <th className="text-neutral text-sm">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr className="hover:bg-base-300 transition-all ease-in-out">
                    <td className="first:rounded-l-xl">userOne</td>
                    <td>userIne@email.com</td>
                    <td>Role</td>
                    <td className="last:rounded-r-xl">
                        <div className="tooltip tooltip-error" data-tip="Remove User">
                            <button className="bg-base-100 text-lg rounded-xl hover:shadow-xl ease-in-out hover:cursor-pointer badge">
                                <RxCross1 />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>userOne</td>
                    <td>userIne@email.com</td>
                    <td>Role</td>
                    <td>remove</td>
                </tr>
                <tr>
                    <td>userOne</td>
                    <td>userIne@email.com</td>
                    <td>Role</td>
                    <td>remove</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}