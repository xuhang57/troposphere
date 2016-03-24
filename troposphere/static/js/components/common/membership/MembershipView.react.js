define(function (require) {

  var React = require('react/addons'),
      Backbone = require('backbone');

  var ENTER_KEY = 13;

  return React.createClass({
    displayName: "EditMembershipView",

    propTypes: {
      activeMemberships: React.PropTypes.instanceOf(Backbone.Collection),
      label: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
      return {
        activeMemberships: new Backbone.Collection(),
      }
    },
    renderMembershipItem: function(membership) {
        return (
            <li className="tag">
              <a href="javascript:void(0)">{membership.get('group').name}</a>
            </li>
        );
    },
    render: function () {
      var query = this.state.query,
          link,
          membershipView,
          memberships = this.props.memberships;

        membershipView = memberships.map(this.renderMembershipItem);

      return (
        <div className="resource-users">
          <h4 className='user-title'>{this.props.label}</h4>
          <ul className="tags">
            {membershipView}
          </ul>
        </div>
      );
    }

  });

});
