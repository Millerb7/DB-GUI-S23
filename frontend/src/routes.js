import { Navigate, useRoutes } from 'react-router-dom';
import { Home, CalendarPage, CoursePage, IndividualCoursePage, AssignmentPage } from "./pages/index";

export default function Router () {
    return useRoutes([
        {
            path: '/',
            element: <Home />,
            children: [
                { path: 'courses', element: <CoursePage /> },
                { path: 'calendar', element: <CalendarPage />},
                { path: 'assignemnt', element: <AssignmentPage />},
                { path: 'course', element: <IndividualCoursePage />}
        ]
        }
    ])
}