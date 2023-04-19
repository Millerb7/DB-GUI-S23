import { useEffect, useState } from "react"
import { getCourseById } from "src/api/coursePageApi";
import Page from '../components/Page'

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState(undefined);

    useEffect(() => {
        getCourseById(course).then(x => setCourse(x));
    }, []);

    return<>
        <h1>Course Name</h1>
    </>
}
