define(function(require) {

  "use strict";

  var Backbone = require("backbone");
  var validator = require("validator");
  var EAU = require("app/ns");

  /**
   *
   *
   *
   */
  var Field = Backbone.Model.extend({
    initialize: function() {
      this.url = "/api/field?token=" + EAU.user.get("token");
    },

    parse: function(response) {
      if (typeof response.value !== "undefined") {
        response.value = parseFloat(response.value);
      }

      if (typeof response.ust !== "undefined") {
        response.ust = parseInt(response.ust, 10);
      }
      
      if (typeof response.date !== "undefined") {
        response.date = new Date(response.date);
      }

      return response;
    },

    validate: function(attributes) {
      if (!validator.isLength(attributes.description, 0, 100)) {
        return "description too long";
      }

      if (!validator.isFloat(attributes.value)) {
        return "value has to be a number";
      }

      if (attributes.value <= 0 || attributes.value > 1000000) {
        return "value has to be between 0 and 1000000";
      }
      
      if (!validator.isIn(attributes.ust, [0, 7, 19])) {
        return "ust has to be either 0, 7 or 19";
      }

      if (!validator.isIn(attributes.type, ["in", "out"])) {
        return "type has to be either 'in' or 'out'";
      }
    }

  }); // end Field


  return Field;
});