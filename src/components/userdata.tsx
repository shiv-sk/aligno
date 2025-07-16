import userData from "@/types/userData"
export default function UserData({userData} : {userData: userData}){
    return(
        <div className="space-y-1 py-6 px-3 bg-base-200 overflow-y-auto overflow-x-auto shadow-md rounded-xl w-full">
            <h1 className="text-center font-bold text-lg">UserInfo</h1>
            <p className="text-lg">name: 
                <span className="text-base">{userData.name || "UserName"}</span>
            </p>
            <p className="text-lg">email: 
                <span className="text-base">{userData.email || "UserEmail"}</span>
            </p>
        </div>
    )
}