import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, Link, } from "@inertiajs/react";
import { WorkflowIcon,SchoolIcon,StarIcon,ArrowBigDownDashIcon, LandPlotIcon} from "lucide-react";

const config = {
    title: 'Timeline'
}

export default function timeline({ auth }: any){
    
    return (
        <AuthenticatedLayout auth_user={auth.user} header={config.title}>
        <Head title={config.title} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2 pl-5 mb-5">
            { config.title }
        </h1>
        <div style={{background:"#f5f5f5"}} className="rounded-lg">
        <VerticalTimeline>

            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2025-02-01"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={<ArrowBigDownDashIcon />}
            >
                <h3 className="vertical-timeline-element-title">Art Director</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                </p>
            </VerticalTimelineElement>
            
            <VerticalTimelineElement
                iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                icon={<LandPlotIcon />}
            />
        </VerticalTimeline>
        </div>
        </AuthenticatedLayout>
    )
}