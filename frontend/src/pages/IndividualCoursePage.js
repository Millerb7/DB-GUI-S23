import { useEffect, useState } from "react"
import Page from '../components/Page'

export const IndividualCoursePage = () => {

    const [course, setCourse] = useState(undefined);

    useEffect(() => {
        // getCourseByID(num).then(x => setCourse(x));
    }, []);

    return <>
    <h1>HELLO!</h1>
    </>
}