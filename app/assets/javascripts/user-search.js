( function() {

  $.UsersSearch = function (el) {
    this.$el = $(el);
    this.$input = $el.find("#users-search-input");
    this.$ul = $el.find("#users-search-list");
    this.$el.on("input", this.render.bind(this));
    this.renderResults();
  };

  $.UsersSearch.prototype.handleInput = function(e) {

    var getFollowState = this.render();
    var value = this.$input.val();
    path = "/users/search";
    var verb = "post";
    $.ajax({
      url: path,
      type: verb,
      dataType: "json",
      data: {
        query: value;
      },
      success: function(data){

        this.$el.html(this.renderResults());
      }.bind(this)

    });
  };

  $.UserSearch.prototype.renderResult = function () {
    this.$ul.empty();
  }


  $.fn.usersSearch = function () {
    return this.each(function () {
      new $.UserSearch(this);
    });
  };

  $(function () {
    $(".users-search").usersSearch();
  });
})();
