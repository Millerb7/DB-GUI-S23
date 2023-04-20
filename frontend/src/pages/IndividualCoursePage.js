import { useEffect, useState } from "react"
import Page from '../components/Page'

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState(undefined);

    useEffect(() => {
        // getCourseByID(courseId).then(x => setCourse(x));
    }, []);

    return <>
        <h2>Individual Course Page</h2>
    </>;
}