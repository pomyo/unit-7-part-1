

const state = {
  addButton: $(".add-to-do"),
  inputBar: $(".inputBar"),
  toDoList: $(".list")
};

const _functions = {
  init: function() {
    state.addButton.on("click", function() {
      _functions.add();
    });
  },
  render: item => {
    state.toDoList.append(item);
  },
  add: function() {
    let data = { todo: state.inputBar.val() };

    if (data.todo) {
      $.post("/api/add", data).then(function(entry) {
        if (entry.success) {
          _functions.render(_functions.makeNewItem(entry.data));
          state.inputBar.val("");
        }
      });
    }
  },
  delete: function(ex_mark) {
    let container = $(ex_mark)
      .parent()
      .parent();
    let description = $(ex_mark)
      .siblings("p")
      .first();
    let objectID = $(description).attr("id");
    let data = { id: objectID };

    $.ajax({
      url: "/api/delete",
      method: "DELETE",
      data: data
    }).then(function(deletion) {
      if (deletion.success) {
        container.remove();
      }
    });
  },
  update: function(check_box) {
    let isChecked = _functions.toggleCheck(check_box);
    let description = $(check_box)
      .siblings("p")
      .first();
    let objectID = $(description).attr("id");
    let data = { id: objectID, checked: isChecked };

    $.ajax({
      url: "/api/update",
      method: "PUT",
      data: data
    });
  },
  toggleCheck: function(check_box) {
    let $check_box = $(check_box);

    if ($check_box.hasClass("far fa-square")) {
      $check_box.removeClass("far fa-square");
      $check_box.addClass("fas fa-check-square");

      return true;
    } else {
      $check_box.removeClass("fas fa-check-square");
      $check_box.addClass("far fa-square");

      return false;
    }
  },
  getList: function() {
    $.get("/api/list").then(function(list) {
      $.each(list.data, function(index, entry) {
        _functions.render(_functions.makeNewItem(entry));
      });
    });
  },
  makeNewItem: function(entry) {

    let list_item_container = $("<div></div>");
    list_item_container.addClass("list-item-container");

    let list_item = $("<div></div>");
    list_item.addClass("list-item");

    let check_box = $("<i></i>");
    let icon = !entry.completed ? "far fa-square" : "fas fa-check-square";
    check_box.addClass(icon);
    check_box.on("click", function() {
      _functions.update(this);
    });

    let description = $("<p></p>");
    description.text(entry.text);
    description.attr("id", entry._id);

    let ex_mark = $("<i></i>");
    ex_mark.addClass("fas fa-times");
    ex_mark.on("click", function() {
      _functions.delete(this);
    });

    list_item.append(check_box, description, ex_mark);
    list_item_container.append(list_item);

    return list_item_container;
  }
};

$(document).ready(function() {
  _functions.init();
  _functions.getList();
});
