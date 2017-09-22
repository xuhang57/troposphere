import React from "react";


export default React.createClass({
    displayName: "TutorialPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">Tutorials</h1>
            <div>
                <h4>How to launch an instance</h4>
                <p>
                    Video is comming soon
                </p>
                <h4>How to manage your SSH public key</h4>
                <p>
                    Video is comming soon
                </p>
            </div> 
        </div>
        );
    }
});
