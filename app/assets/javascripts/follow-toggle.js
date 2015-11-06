( function() {

  $.FollowToggle = function (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    // debugger;
    this.$el.html(this.render());

    this.$el.on("click", this.handleClick.bind(this) )
  };

  // $.FollowToggle.prototype.method1 = function () {
  //
  // };

  $.FollowToggle.prototype.render = function () {

    // debugger;
    if (this.followState === "following" || this.followState === "unfollowing") {
      $(".follow-toggle").prop("disabled", true);
    }
    else{
      $(".follow-toggle").prop("disabled", false);

    }
    if (this.followState == "followed") {
      return "unfollow!";
    } else {
      return "follow!";
    }
  };


  $.FollowToggle.prototype.handleClick = function (e) {
    e.preventDefault();

    var verb, path;
    if (this.followState === "unfollowed") {
      verb = "post";
      this.followState = "following";
    } else {
      verb = "delete";
      this.followState = "unfollowing";
    }
    var getFollowState = this.render();

    path = "/users/" + this.userId + "/follow";

    $.ajax({
      url: path,
      type: verb,
      dataType: "json",
      data: {
        user_id: this.userId
      },
      success: function(data){
        if (this.followState == "unfollowing"){
            this.followState = "unfollowed";
          }
        else{
          this.followState = "followed";
        }
        this.$el.html(this.render());
      }.bind(this)

    });
  };

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };

  $(function () {
    $("button.follow-toggle").followToggle();
  });
})();
