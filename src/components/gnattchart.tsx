"use client";

import { useEffect, useRef } from "react";
import Gantt from "frappe-gantt";
import "../../node_modules/frappe-gantt/dist/frappe-gantt.css"
type GanttTask = {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies?: string;
};

type Props = {
    tasks: GanttTask[];
}
export default function GanttChart({ tasks }: Props){
    const ganttRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(ganttRef.current && tasks.length > 0){
            new Gantt(ganttRef.current , tasks , {
                view_mode: "Day",
                date_format: "YYYY-MM-DD",
            })
        }
    } , [tasks])
    return(
        <div ref={ganttRef}></div>
    )
}