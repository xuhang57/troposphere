/** @jsx React.DOM */

define(
  [
    'react',
    'components/mixins/BootstrapModalMixin.react',
    'stores',
    'globals',
    'actions/BadgeActions'
  ],
  function (React, BootstrapModalMixin, stores, globals, BadgeActions) {

    function getState() {
      return {
        badge: null
      }
    }

    return React.createClass({
      mixins: [BootstrapModalMixin],

      //
      // Mounting & State
      // ----------------
      //
      getInitialState: function(){
        return getState();
      },

      updateState: function () {
        if (this.isMounted()) this.setState(getState());
      },

      //
      // Internal Modal Callbacks
      // ------------------------
      //

      cancel: function(){
        this.hide();
      },

      confirm: function () {
        this.hide();
        this.props.onConfirm(this.state.badge);
      },

      render: function () {
        var criteria = this.props.badge.get('criteria').map(function(item) {
          return(
            <p>{item.description} </p>
          )
        });

        var content = (
          <div>
            <img className="badge-modal-image" src={this.props.badge.get('imageUrl')} />
            <p><strong>Criteria: </strong>{criteria}</p>
          </div>
        );

        return (
          <div className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {this.renderCloseButton()}
                  <strong>{this.props.badge.get('name')}</strong>
                </div>
                <div className="modal-body">
                  {content}
                </div>
              </div>
            </div>
          </div>
        );
      }

    });

  });
