
define(
  [
    'react',
    'backbone',
    'showdown'
  ],
  function (React, Backbone, Showdown) {

    return React.createClass({
      displayName: "PrivacyView",

      propTypes: {
        image: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      render: function () {
        var image = this.props.image,
          converter = new Showdown.Converter(),
          privacy = (image.get('is_public') == false),
          privacyText = privacy ? "Private" : "Public";
        return (
          <div className="image-info-segment row">
            <h4 className="t-title col-md-2">Privacy:</h4>
            <div className="content col-md-10">
              {privacyText}
            </div>
          </div>
        );
      }

    });

  });
