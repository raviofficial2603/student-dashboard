import React, { useEffect, useState } from 'react'
import Student from './Student'
import axios from 'axios';

function StudentGroup() {
    const [studentList, setStudentList] = useState([])
    const [student, setStudent] = useState({
        id: '',
        name: '',
        percentage: ''
    })
    const arr = []
    const arr1 = []
    useEffect(() => {
        axios.get('https://students-dashboard-354fe-default-rtdb.asia-southeast1.firebasedatabase.app/student.json').then((response) => {
            console.log(response.data);

            response.data && Object.keys(response.data).forEach(key => {
                arr.push(response.data[key]);
                console.log(response.data[key])
            });
            setStudentList([...arr])

        }).catch(err => console.log(err));
    }, []);
    function addStudent(e) {
        e.preventDefault()
        axios.get('https://students-dashboard-354fe-default-rtdb.asia-southeast1.firebasedatabase.app/student.json').then((response) => {
            console.log(response.data);
            // const arr = []
            const arr1 = []
            response.data && Object.keys(response.data).forEach(key => {
                // arr.push(response.data[key]);
                arr1.push(response.data[key].id)
            });
            if (!arr1.includes(student.id)){
                console.log('hi executed')
                axios
            .post('https://students-dashboard-354fe-default-rtdb.asia-southeast1.firebasedatabase.app/student.json', {
                ...student
            })
            .then((response) => {
                console.log(response.data);
                setStudent({
                    id: '',
                    name: '',
                    percentage: ''
                })
                axios.get('https://students-dashboard-354fe-default-rtdb.asia-southeast1.firebasedatabase.app/student.json').then((response) => {
                    console.log(response.data);
                    const arr = []
                    response.data && Object.keys(response.data).forEach(key => {
                        arr.push(response.data[key]);
                    });
                    console.log(arr)
                    setStudentList([...arr])
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));;
            }
            else{
                alert('ID already exists')
            }
            // setStudentList([...arr])
        }).catch(err => console.log(err));

        

    }
    function handleInput(e) {
        setStudent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid fw-bolder h3 text-white">

                    Student Dashboard

                </div>
            </nav>
            
            <div className='container'>
                <form onSubmit={addStudent} className='w-75 mx-auto form-horizontal shadow-lg m-3 p-5 card text-end'>
                <h1 className='text-center my-5'>Enter Student Details</h1>

                    <div className="row g-3  mb-3">
                        <div className="col-3 text-end">
                            <label for="id" className="col-form-label text-end">ID:</label>
                        </div>
                        <div className="col-9">
                            <input type="text" value={student.id} required id="id" name='id' onChange={(e) => handleInput(e)} className="form-control" aria-describedby="passwordHelpInline" />
                        </div>

                    </div>
                    <div className="row g-3  mb-3">
                        <div className="col-3">
                            <label for="name" className="col-form-label text-end">Name:</label>
                        </div>
                        <div className="col-9">
                            <input type="text" value={student.name} required id="name" name="name" onChange={(e) => handleInput(e)} className="form-control" aria-describedby="passwordHelpInline" />
                        </div>

                    </div>
                    <div className="row g-3 align-items-right mb-3">
                        <div className="col-3">
                            <label for="percentage" className="col-form-label text-end">Percentage:</label>
                        </div>
                        <div className="col-9">
                            <input type="number" value={student.percentage} required max={100} id="percentage" onChange={(e) => handleInput(e)} name='percentage' className="form-control" aria-describedby="passwordHelpInline" />
                        </div>

                    </div>


                    <button type="submit" className="btn btn-info text-white w-75 mx-auto">Add Student</button>
                </form>

                {studentList.length > 0 ? <div className='card shadow-lg p-5'><h1 className='my-3'>Students Dashboard</h1><table className="table container  table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Percentage</th>
                        </tr>
                    </thead>
                    <tbody>

                        {studentList.map((student, key) => <Student key={key} slno={key + 1} student={student} />)}

                    </tbody>
                </table></div>
                    : <h1>No data found</h1>}
            </div>
        </>
    )
}

export default StudentGroup
