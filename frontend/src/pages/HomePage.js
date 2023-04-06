import { MissingAssignments } from "../components/MissingAssignments"

export const HomePage = (user) => {
    return<>
        <div className="container">
            <h1>Missing Assignments</h1>
            <MissingAssignments missingAssignments={user.MissingAssignments} />
        </div>
    </>
}