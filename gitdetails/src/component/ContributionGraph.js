import React, { useState, useEffect } from 'react';

const ContributionGraph = (props) => {
  const [activityData, setActivityData] = useState([]);
  const [max, setMax] = useState(0)

   useEffect(() => {
    setActivityData(props.activityData)
    setMax(props.map)

   }, []);

//   useEffect(() => {
//     // Fetch repository data
//     fetch("http://localhost:5000/user/repo", {
//       method: 'POST',
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       });
//   }, []);

  const renderContributionGraph = () => {
    if (!activityData) {
      return null;
    }


    return (
      <div className="outer-container" id="contributionGraph">
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
      </div>
    );
  };

  return (
    <div>
      {renderContributionGraph()}
    </div>
  );
};

export default ContributionGraph;
