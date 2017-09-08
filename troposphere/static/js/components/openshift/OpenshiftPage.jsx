import React from "react";


export default React.createClass({
    displayName: "OpenShiftPage",

    render: function() {

    return (
        <div style={{paddingTop: "50px"}} className="container">
            <h1 className="t-display-1">MOC OpenShift</h1>
            <div>
                <p>
                    {"Please go to"}<a href={"https://128.31.22.40:8443/console/"} target="_blank"> {"MOC OpenShift"}</a>
                </p>
            </div>
        </div>
        );
    }
});
