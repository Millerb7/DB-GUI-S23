import { Assignment } from '../sections/Assignment';
import { useEffect, useState } from 'react';
import { getAssignmentById } from '../api/coursePageApi';

export const MissingAssignments = ({assignments}) => {
    const [Assignment, setAssignment] = useState();

    useEffect(() => {
        getAssignmentById(Assignment.id).then(data => Assignment.data);
        var todaysDate = new Date();
        console.log(todaysDate);
    }, []);
}