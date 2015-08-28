define(function (require) {
  "use strict";

  var React = require('react'),
      modals = require('modals'),
      stores = require('stores');

  return React.createClass({
    handleClick: function(e){
      this.setState({selected: !this.state.selected});
    },

    getInitialState: function(){
      return({
            selected: false
        });
    },

    addToBackpack: function(){
        console.log("You want to add " + this.props.badge + " to your backpack!");
        OpenBadges.issue(this.props.badge.get('assertionUrl'));
    },

    render: function () {
      var badge = this.props.badge;
      var content = (
              <p>{badge.get('strapline')}</p>
      );
      if(this.state.selected){
        content = (
            <div className="text">
            <p>{badge.get('strapline')}</p>
            <p>Awarded on: {badge.get('issuedOn')}</p>
            <div className = "btn btn-default" onClick={this.addToBackpack}>Add to backpack!</div>
            </div>
        );
      }

      return(
        <li onClick={this.handleClick} className='badge-li'>
          <img className='image' src={badge.get('imageUrl')} />
          <h4 className='badge-name'>{badge.get('name')}</h4>
          {content}
        </li>
      );
    }


  });

});
