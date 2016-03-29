import React from 'react';

export default React.createClass({

    getInitialState() {
        return({
            isOpen: false,
        })
    },

    onTouch(e) {
        e.stopPropagation();
        e.preventDefault();
        let isOpen = this.state.isOpen ?
            false : true;
        this.setState({
            isOpen,
            itemHoverd: null,
        })
    },

    onSelectOption(action, e) {
        e.stopPropagation();
        e.preventDefault();
        action();
        let isOpen = this.state.isOpen ?
            false : true;
        this.setState({
            isOpen
        })
    },

    onItemEnter(item) {
        this.setState({
            itemHovered: item
        })
    },

    onItemLeave() {
        this.setState({
            itemHovered: null
        });
    },

    renderMenuItem(item) {
        let isHoveredStyle = this.state.itemHovered === item ?
            { background: "#EFEFEF" } :
            {}
        return (
            <li onMouseEnter={ this.onItemEnter.bind(this, item) }
                onMouseLeave={ this.onItemLeave }
                style={{
                    display: "block",
                    padding: "10px 14px",
                    listStyle: "none",
                    ...isHoveredStyle,
                }}
                onClick={this.onSelectOption.bind(this, item.action)}
            >
                {item.name}
            </li>
        )
    },

    render() {
        let menuItemList = this.props.menuItemList.map(this.renderMenuItem);
        let showList = this.state.isOpen ?
            "block" : "none";
        let openMenuStyle = this.state.isOpen ?
            {
                background: "#EFEFEF",
                color: "black",
            } :
            { color: "grey" };

        return (
            <div>
            <div
                style={{
                    ...openMenuStyle,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "17px",
                    paddingLeft: "2px",
                    borderRadius: "50%",
                    border: "solid 1px rgba(0,0,0,.1)",
                    height: "35px",
                    width: "35px",
                }}
                onClick={this.onTouch}
            >
                <i style={{top:"0"}} className="glyphicon glyphicon-option-vertical"/>
            </div>
            <ul 
                style={{
                    display: showList,
                    width: "200px",
                    position: "absolute",
                    background: "white",
                    right: "0",
                    top: "40px",
                    padding: "6px 0",
                    zIndex: "200",
                    boxShadow: "0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24)",
                }}
            >
                {menuItemList}
            </ul>
            </div>
        )
    },
});
