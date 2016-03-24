define(function (require) {

  var React = require('react/addons'),
    ImageListCard = require('../common/ImageListCard.react');

  return React.createClass({

    propTypes: {
      title: React.PropTypes.string,
      images: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    getInitialState: function() {
        return {
            expanded: {},
        }
    },

    onExpand: function(image) {
        console.log(image);
        if (image === this.state.expanded) {
            image = {}
        };
        this.setState({
            expanded: image
        })
    },

    renderTitle: function () {
      var title = this.props.title;
      if (!title) return;

      return (
        <h3>{title}</h3>
      )
    },

    renderCard: function(image){
      let isExpanded = (this.state.expanded === image) ? true : false;

      return (
        <li style={{listStyle: "none"}} key={image.id}>
          <ImageListCard {...{...this.props, image }}
            onExpand={this.onExpand.bind(this, image)}
            isExpanded={isExpanded}
          />
        </li>
      );
    },

    render: function () {
      var images = this.props.images;
      var imageCards = images.map(this.renderCard);

      return (
        <div>
          {this.renderTitle()}
          <ul style={{padding: "0"}}>
            {imageCards}
          </ul>
        </div>
      );
    }

  });

});
