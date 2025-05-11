// // src/components/ActiveTailors.jsx
// import React, { useEffect, useState } from 'react';

// const ActiveTailors = () => {
//   const [activeTailors, setActiveTailors] = useState([]);

//   useEffect(() => {
//     // Placeholder data from backend
//     setActiveTailors([
//       { name: 'John Doe', location: 'Karachi' },
//       { name: 'Jane Smith', location: 'Lahore' },
//     ]);
//   }, []);

//   return (
//     <div className="active-tailors-container">
//       <h2 className="section-title">Active Tailors</h2>
//       <ul className="active-tailors-list">
//         {activeTailors.map((tailor, index) => (
//           <li key={index} className="active-tailor-item">
//             <p>{tailor.name}</p>
//             <p>{tailor.location}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ActiveTailors;
