import React from 'react'

function Student(props) {
    return (
        <tr>
            <th scope="row">{props.slno}</th>
            <td>{props.student.id}</td>
            <td>{props.student.name}</td>
            <td>{props.student.percentage}</td>
        </tr>
    )
}

export default Student
