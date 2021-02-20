//for date input (bootstrap-datepicker)
var _idate = $.extend({}, _ibase, {

    //=== get/set start ===
    getO: function (obj) {
        return _date.uiToJsDate(obj.val());
    },

    setO: function (obj, value) {
        var date = _date.jsToUiDate(value);
        obj.val(date);
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },


    //=== 日期元件 start ===
    //initial by fid
    //onChange event 記錄在 data-onchange
    //init: function (fid, box, fnOnChange) {
    init: function (fid, box) {
        var obj = _str.isEmpty(fid)
            ? $('.xg-date')
            : _obj.get(fid, box).closet('.xg-date');
        if (obj.length > 0)
            _idate.initO(obj);
    },

    //initial by object(s)
    //initO: function (obj, fnOnChange) {
    initO: function (obj) {
        /*
        //datepicker指向 date input 外面的 div
        obj = (obj === null || obj === undefined)
            ? $('.xg-date')
            : obj.closet('.xg-date');
        */

        //日期欄位
        obj.datepicker({
            //format: _BR.UiDateFormat,
            language: _fun.locale,
            autoclose: true,
            showOnFocus: false,
            //startDate: '-3d'            
        }).on('changeDate', function (e) {
            //$(this).datepicker('hide');
            //傳入 fid, value
            /* temp remark
            if (fnOnChange !== undefined) {
                var me = $(this);
                var fid = !_str.isEmpty(me.attr('id')) ? me.attr('id') : me.data('id');
                fnOnChange(fid, me.val());
            }
            */
        });

        //取消event listen, 否則清除時會顯示日曆(jquery 3.21 會listen) !!
        obj.find('.input-group-addon').off('click');
    },

    //for 多筆區域
    initByBox: function (box, fnOnChange) {
        _idate.initO(box.find('.xg-date'), fnOnChange);
    },

    //show/hide datepicker
    toggle: function (btn) {
        //$(btn).parent().parent().find('input').trigger('focus');
        $(btn).parent().parent().datepicker('show');
    },

    //clean value
    clean: function (btn) {
        $(btn).parent().parent().datepicker('update', '');
    },

    //date, hour, minute fields to datetime string
    //hour, min為下拉欄位
    field3ToDt: function (fDate, fHour, fMin, box) {
        var date = _idate.get(fDate, box);
        if (date == '')
            return '';

        var hour = _iselect.get(fHour, box);
        var min = _iselect.get(fMin, box);
        return date + ' ' +
            (hour == '' ? '00' : hour) + ':' +
            (min == '' ? '00' : min);
    },

}); //class