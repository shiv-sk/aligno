"use client";

import { GanttComponent } from "@syncfusion/ej2-react-gantt";

export default function GanttChart({data}){
    return(
        <GanttComponent dataSource={data}></GanttComponent>
    )
}