import React from 'react';

export default React.createClass({
    onExpand: function() {
        this.props.onExpand();
        window.scrollBy(0,50);
    },

    render: function() {
        let detailWidth = "";
        let titleMarg = "";
        let openStyle = {};
        let openClass = "";
        let HeaderRule = null;

        if (this.props.isExpanded) {
            detailWidth = "100%";
            titleMarg = "20px";
            openStyle = { margin: "50px -20px" };
            openClass = "CardList--expanded";
            HeaderRule = (<hr style={{margin: "0 -20px 20px"}}/>);
        }

        let headerIcons = (icon) => {
            return (
                <div style={{float:"right", marginLeft: "5px"}}>
                    {icon}
                </div>
            )
        };

        let header = this.props.header ?
            (
                <div className="clearfix"
                    style={{
                        margin: "-20px -20px 0",
                        position: "relative",
                        padding: "3px"
                    }}
                >
                    {this.props.header.map(headerIcons)}
                </div>
            ) : null;

        return (
            <div className={`CardList ${openClass}`}
                style={{
                    ...openStyle,
                    transition: "all ease .1s",
                    
                    cursor: "pointer",
                }}
                onClick={this.onExpand}
            >
                {header}
                <div className="t-wordBreaker"
                    style={{
                        display: "flex",
                        flexFlow: "row wrap"
                    }}
                >
                    <div style={{marginRight: "10px"}}>
                            {this.props.image}
                    </div>

                    <div
                        style={{flex: "0 300px",
                            marginBottom: `${titleMarg}`
                        }}
                    >
                        {this.props.title}
                        <span className="t-caption">
                            {this.props.subTitle}
                        </span>
                    </div>
                    <div style={{flex: `1 0 ${detailWidth}`}}>
                        {HeaderRule}
                        {this.props.detail}
                    </div>
                </div>
            </div>
        )
    }
})
