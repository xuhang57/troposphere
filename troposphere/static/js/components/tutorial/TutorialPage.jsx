import React from "react";


export default React.createClass({
    displayName: "TutorialPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">Tutorials</h1>
            <div>
                <h3>How to launch an instance</h3>
                <p>
                    Video is comming soon
                </p>
            </div>
            <div>
                <h3>How to manage your SSH public key</h3>
                <p>
                    Video is comming soon
                </p>
            </div> 
        </div>
        );
    }
});
