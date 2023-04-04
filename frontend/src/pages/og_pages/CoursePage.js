import { Course } from "../components/Course";

export const CoursePage = () => {
    //Navigation component

    //not sure if this should be in here or in Course.jsx
    const getCourses = () => {

    }

    //will probably be removed, but just using this to mock teh use of map to populate li
    const courses = [

    ];

    return <>
        {/*I'll make these components at some point*/}
        <div className="courses-container current">
            <h2 className="course-container-title">Current Courses</h2>
            {/*Temporary, will populate with li values once I figure out how to do that */}
            <ul className="courses-list">
            {

            }
            </ul>
        </div>
        <div className="courses-container past">
            <h2 className="course-container-title">Past Courses</h2>
            {/*Temporary, will populate with li values once I figure out how to do that */}
            <ul className="courses-list">
            {
                courses.map(() => <li className="courses-list"></li>)
            }
            </ul>
        </div>
    </>;
}