define(
  [
    'react',
    'backbone',
    'showdown',
    'components/common/ui/SelectMenu.react'
  ],
  function (React, Backbone, Showdown, SelectMenu) {

    return React.createClass({
      displayName: "EditPrivacyView",

      getDefaultProps: function() {
        return {
          title: "Privacy",
          className: "image-privacy"
        }
      },
      propTypes: {
        title: React.PropTypes.string,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        titleClassName:React.PropTypes.string,
        formClassName:React.PropTypes.string
      },
      renderOptionName: function(option) {
          return option;
      },
      render: function () {
        var hintText = "If True, allows you to set image membership."
        "If False, the image will be publicly available to all users.",
            privacy = (this.props.image.get('is_public') == false),
            currentSelection = privacy ? 'Private' : 'Public',
            selectionList = ['Private', 'Public'];

        return (
          <div className={this.props.className}>
            <h4 className={this.props.titleClassName}>{this.props.title}</h4>
            <div className={this.props.formClassName}>
              <SelectMenu
                selection={currentSelection}
                optionName={this.renderOptionName}
                onSelectChange={this.props.onChange}
                selection={currentSelection}
                list={selectionList}
                hintText={hintText} />
            </div>
          </div>
        );
      }

    });

});
