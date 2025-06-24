export default function Footer(){
    return(
        <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4 shadow-xl">
            <aside>
                <p className="text-lg font-semibold">
                    Copyright © {new Date().getFullYear()} - All right reserved by Aligno Management
                </p>
            </aside>
        </footer>
    )
}