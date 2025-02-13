

// // src/components/Drawings.js
// import React from "react";
// import "./drawing.css"; // Import the CSS file for styling

// const Drawings = () => {
//     // Sample data for drawings (you can replace this with data from an API)
//     const drawings = [
//         {
//             id: 1,
//             title: "Sunset",
//             imageUrl: "./sunset.jpg", // Replace with your image path
//             description: "A beautiful sunset over the ocean, painted by one of our talented children."
//         },
//         {
//             id: 2,
//             title: "Forest Adventure",
//             imageUrl: "./ForestAdventure.avif", // Replace with your image path
//             description: "A vibrant depiction of a forest adventure, showcasing the beauty of nature."
//         },
//         {
//             id: 3,
//             title: "Dreamy Night Sky",
//             imageUrl: "./Nightsky.jpg", // Replace with your image path
//             description: "A dreamy night sky filled with stars, capturing the imagination of our children."
//         }
//     ];

//     return (
//         <div className="container text-center mt-4">
//             <h2>Drawings by Our Children</h2>
//             <div className="drawings-gallery">
//                 {drawings.map((drawing) => (
//                     <div key={drawing.id} className="drawing-card">
//                         <img src={drawing.imageUrl} alt={drawing.title} className="drawing-image" />
//                         <h3>{drawing.title}</h3>
//                         <p>{drawing.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Drawings;


// src/components/Drawings.js
import React from "react";
import "./drawing.css"; // Import the CSS file for styling

const Drawings = () => {
    // Sample data for drawings (you can replace this with data from an API)
    const drawings = [
        {
            id: 1,
            title: "Sunset",
            imageUrl: "./sunset.jpg", // Replace with your image path
            description: "A beautiful sunset over the ocean, painted by one of our talented children."
        },
        {
            id: 2,
            title: "Forest Adventure",
            imageUrl: "./ForestAdventure.avif", // Replace with your image path
            description: "A vibrant depiction of a forest adventure, showcasing the beauty of nature."
        },
        {
            id: 3,
            title: "Dreamy Night Sky",
            imageUrl: "./Nightsky.jpg", // Replace with your image path
            description: "A dreamy night sky filled with stars, capturing the imagination of our children."
        }
    ];

    return (
        <div className="container text-center mt-4">
            <h2>Drawings by Our Children</h2>
            <div className="drawings-gallery">
                {drawings.map((drawing) => (
                    <div key={drawing.id} className="drawing-card">
                        <img src={drawing.imageUrl} alt={drawing.title} className="drawing-image" />
                        <h3>{drawing.title}</h3>
                        <p>{drawing.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Drawings;