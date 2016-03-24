define(function (require) {

  var React = require('react/addons'),
    ImageListCard = require('../common/ImageListCard.react');

  return React.createClass({

    propTypes: {
      title: React.PropTypes.string,
      images: React.PropTypes.instanceOf(Backbone.Collection).isRequired
    },

    style: function() {
        if (this.props.viewType === "list") {
            return {
                listStyle: "none",
            }
        }

        return {
            marginBottom: "20px",
            listStyle: "none",
        }
    },

    renderTitle: function () {
      var title = this.props.title;
      if (!title) return;

      return (
        <h3>{title}</h3>
      )
    },

    renderCard: function(image){
      let listStyle = (this.props.viewType === "list") ?
          null : "col-md-3";

      return (
        <li className={listStyle} style={this.style()} key={image.id}>
          <ImageListCard {...{...this.props, image }}/>
        </li>
      );
    },

    render: function () {
      var images = this.props.images;
      var imageCards = images.map(this.renderCard);
      let isRow =  (this.props.viewType !== "list") ?
          "row" : "";

      return (
        <div className={isRow}>
          {this.renderTitle()}
          <ul className='app-card-list'>
            {imageCards}
          </ul>
        </div>
      );
    }

  });

});
