﻿
var _table = {

    //btn: fun button in tr
    rowMoveUp: function (btn) {
        var row = $(btn).closest('tr');
        row.insertBefore(row.prev());
    },
    rowMoveDown: function (btn) {
        var row = $(btn).closest('tr');
        row.insertAfter(row.next());
    },

    //delete, up, down
    rowFun: function () {
        return '' +
            _str.format('<a href="javascript:_crud.onUpdate(\'{0}\');"><i class="icon-times" title="{0}"></i></a>', key, RB.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="icon-up" title="{0}"></i></a>', RB.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="icon-down" title="{0}"></i></a>', RB.TipUpdate);
    },

}; //class