import React, { useState,useEffect } from 'react'
import ContributionGraph from '../component/ContributionGraph'
import { 
    MDBBtn, 
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBInput,
    MDBTable, MDBTableBody,
 } from 'mdb-react-ui-kit';

const Home = () => {

    const [username1, setUsername1] = useState('')
    const [username2, setUsername2] = useState('')
    const [repo, setRepo] = useState('')

    const [activityData, setActivityData] = useState([])
    const [max, setMax] = useState(0)
    const [repoData, setRepoData] = useState({})

    const fetchContribution = () => {
        console.log("clicked")
        fetch("http://localhost:5000/user/push", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username1})
        })
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            setActivityData(data.contributions);
            setMax(data.max)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const fetchRepoDetails = () => {
        console.log("clicked")
        fetch("http://localhost:5000/user/repo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username2, repo_name:repo})
        })
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then(data => {
            console.log('Data:', data);
            setRepoData(data.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

  return (
    <div>
        <div className='navbar'>
            <h3>Git Details</h3>
        </div>
        <center>
        <MDBInput
            value={username1}
            wrapperClass="custom-input" 
            onChange={(e) => setUsername1(e.target.value)}
            label='Enter your gitHub User name'
            type='text'
         />
        </center>
        <center>
            <MDBBtn className="custom-button" onClick={() => fetchContribution()}  >Get Contributions</MDBBtn>
        </center>

       <center>
       <MDBCard className='custom-class' alignment='center'>
            <MDBCardHeader>Contributions in last 90 days</MDBCardHeader>
            <MDBCardBody>
            {activityData && activityData.length >0 &&(<div className="outer-container" id="contributionGraph">
                {console.log(activityData)}
                {activityData.map((column, columnIndex) => (
                <div key={columnIndex} className="inner-grid">
                    {column.map((activity, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="contribution-square"
                        style={{ backgroundColor: `rgba(0, 200, 0, ${activity / max})` }}
                    />
                    ))}
                </div>
                ))}
            </div>)}
            </MDBCardBody>
        </MDBCard>
       </center>

       <center>
        <MDBInput
            value={username2}
            wrapperClass="custom-input" 
            onChange={(e) => setUsername2(e.target.value)}
            label='Enter your gitHub User name'
            type='text'
         />
        </center>
        <center>
        <MDBInput
            value={repo}
            wrapperClass="custom-input2" 
            onChange={(e) => setRepo(e.target.value)}
            label='Enter your gitHub Repo name'
            type='text'
         />
        </center>
        <center>
            <MDBBtn className="custom-button" onClick={() => fetchRepoDetails()} >Get Repo details</MDBBtn>
        </center>

       <center>
       <MDBCard className='custom-class2' alignment='center'>
            <MDBCardHeader>Details of your Repo</MDBCardHeader>
            <MDBCardBody>
            <MDBTable>
                <MDBTableBody>
                    <tr>
                    <th scope='row'>Id</th>
                    <td>{repoData.id}</td>
                    </tr>
                    <tr>
                    <th scope='row'>owner_name</th>
                    <td>{repoData.owner_name}</td>
                    </tr>
                    <tr>
                    <th scope='row'>owner Avatar</th>
                    <td><img src={repoData.owner_avatar} className='img-class' /></td>
                    </tr>
                    <tr>
                    <th scope='row'>size</th>
                    <td>{repoData.size}</td>
                    </tr>
                    <tr>
                    <th scope='row'>language</th>
                    <td>{repoData.language}</td>
                    </tr>
                    <tr>
                    <th scope='row'>visibility</th>
                    <td>{repoData.visibility}</td>
                    </tr>
                    <tr>
                    <th scope='row'>Forks</th>
                    <td>{repoData.forks}</td>
                    </tr>
                    <tr>
                    <th scope='row'>default branch</th>
                    <td>{repoData.default_branch}</td>
                    </tr>
                    <tr>
                    <th scope='row'>subscribers count</th>
                    <td>{repoData.subscribers_count}</td>
                    </tr>
                    <tr>
                    <th scope='row'>default branch</th>
                    <td>{repoData.default_branch}</td>
                    </tr>
                </MDBTableBody>
                </MDBTable>
            </MDBCardBody>
        </MDBCard>
       </center>
        
    </div>
  )
}

export default Home