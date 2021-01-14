//jquery ajax call
var _ajax = {

    /** 
     * ajax return json
     * param url {string} action url
     * param data {json} property should be string !!
     * param fnOk {function} success callback function
     * param fnError {function} failed callback function
     * return {json}
     */
    getJson: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',   //backend return json(JsonResult)
            //processData: false
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return json by FormData, for upload file
     * return {json}
     */
    getJsonByFormData: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            cache: false,
            data: data,
            contentType: false,     //false!! 傳入參數編碼方式, default為 "application/x-www-form-urlencoded"
            dataType: 'json',       //TODO: pending test
            processData: false,     //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return string
     */ 
    getStr: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',   //backend return text(ContentResult with text)
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return html string
     * return html string
     */
    getView: function (url, data, fnOk, fnError) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json, fnOk, fnError);
    },

    /**
     * ajax return image file
     * return html string
     */
    getImageFile: function (url, data) {
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'html',
        };
        _ajax._call(json);
    },

    /**
     * ajax upload file
     * param url {string}
     * param serverFid {string} server side fid
     * param fileObj {file} file object
     * param fnOk {function}
     */
    /*
    file: function (url, serverFid, fileObj, fnOk, fnError) {
        var data = new FormData();  //for upload files if need 
        data.append(serverFid, fileObj);
        var json = {
            url: url,
            type: 'POST',
            data: data,
            dataType: 'text',       //server return text
            cache: false,
            contentType: false,     //false!! 傳入參數編碼方式, default為 "application/x-www-form-urlencoded"
            processData: false,     //false!! if true it will convert input data to string, then get error !!
        };
        _ajax._call(json, fnOk, fnError);
    },
    */

    /**
     * ajax call(private), only return success info(include custom message)
     * param json {json} ajax json
     * param fnOk {function} callback function
     * return {json} ResultDto
     */
    _call: function (json, fnOk, fnError) {
        var config = {
            //contentType: 'application/json; charset=utf-8',
            //traditional: true,
            //async: false,
            success: function (data) {
                //data maps to ResultDto
                if (data && data.ErrorMsg) {
                    if (fnError == null)
                        _tool.msg(data.ErrorMsg);
                    else
                        fnError(data);
                } else if (fnOk) {
                    fnOk(data);
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                if (xhr != null) {
                    console.log("status" + xhr.status);
                    console.log(thrownError);
                }
            },
            beforeSend: function () {
                _tool.showWait();
            },
            complete: function () {
                _tool.hideWait();
            },
        };

        $.ajax(_json.copy(json, config));
    },

};//class

var _array = {

    /**
     * find array
     * param ary {array}
     * param id {int/string} find value
     * return {int} -1(not found), n
     */ 
    find: function (ary, id) {
        if (ary == null)
            return -1;

        for (var i = 0; i < ary.length; i++) {
            if (ary[i] == id)
                return i;
        }
        return -1;
    },

    /**
     * convert array to string with seperator
     * param ary {array} source array
     * param sep {string} seperator, default to ','
     * retrun {string} ex: '1,2,3'
     */ 
    toStr: function (ary, sep) {
        sep = sep || ',';
        return ary.join(sep);
    },

};//class
var _assert = {

    echo: function (msg) {
        _error.log('_assert.js ' + msg);
    },

    //find array
    //return index
    inArray: function (value, ary) {
        var find = false;
        for (var item in ary) {
            if (item == value) {
                find = true;
                break;
            }
        }
        if (!find)
            _assert.echo('inArray failed: ' + value);
    },

}; //class

var _browser = {

    //傳到後端的語系code 欄位
    _langCode: '_langCode',

    pushState: function (url) {
        history.pushState(null, null, url);
    },

    /*
    //把語系code寫入 cookie (以後可改寫入 localeStorage)
    setLang: function (lang) {
        $.cookie(_browser._langCode, lang);
    },
    */

    zz_print: function (id, fm, fnCallback) {
        _browser.printO(_obj.getById(id, fm, fnCallback));
    },
    zz_printO: function (obj, fnCallback) {
        window.print();
        /*
        debugger;
        //var me = _me;
        var body = document.body;
        var old = body.innerHTML;
        body.innerHTML = obj.html();
        window.print();
        body.innerHTML = old;
        //_me = me;
        //_me.divRead = $('#divRead');
        //if (fnCallback !== undefined)
        //    fnCallback();
        */
    },

}; //class

//button
var _btn = {

    setEdit: function (id, status, box) {
        //use _obj.getById() !!
        _btn.setEditO(_obj.getById(id, box), status);
    },
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    setEditF: function (ft, status, box) {
        _btn.setEditO(_obj.getF(ft, box), status);
    },

}; //class

//use chart.js
var _chart = {

    //彩虹顏色
    rainbowColors: [
        "#F32E37",
        "#EABE37",
        "#89E926",
        "#22E352",
        "#2FE5E8",
        "#295AE7",
        "#8828EE",
        "#E629B7",
    ],

    /**
     * @description initial datatable(use jquery datatables)
     * @param {object} canvasObj
     * @param {string[]} labels
     * @param {number[]} values
     * @param {string[]} colors
     * @param {json} config: custom config
     * @return {Chart}
     */
    initPie: function (canvasObj, labels, values, colors, config) {

        //default config
        var config0 = {
            type: 'pie',
            options: {
                /*
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                },
                */
                legend: {
                    position: 'right',
                    //fullWidth: false,
                    labels: {
                        boxWidth: 10,
                        //padding: 5,
                    },
                },
            },
            data: {
                labels: labels, // 標題
                datasets: [{
                    //label: "# of Votes", // 標籤
                    data: values, // 資料
                    backgroundColor: colors,
                    borderWidth: 1 // 外框寬度
                }]
            },
        };

        //加入外部傳入的自定義組態
        if (config)
            config0 = _json.copy(config, config0);
        return new Chart(canvasObj, config0);
    },

}; //class
//crud static 公用類別
//只處理master table跟第一層child table
var _crud = {

    /**
     * constant
     */
    Rows: '_rows',
    Childs: '_childs',
    Deletes: '_deletes',

    Create: 'C',
    Update: 'U',
    View: 'V',

    /**
     * save middle variables
     */
    temp: {},

    //=== jQuery datatables start ===
    /**
     * datatable layout
     */
    dtDom: '<"toolbar">t<li>p',

    /**
     * datatable column config
     */ 
    dtColConfig: {
        className: 'xg-center',
        orderable: false,
        targets: '_all',
    },

    /**
     * dt欄位: checkbox欄位 for 選取多筆
     * param {string} value checkbox value
     * param {bool} editable (optional true) 是否可選取
     * param {string} fid (optional '_check1') data-id value
     */
    dtCheck0: function (value, editable, fid) {
        if (editable === undefined)
            editable = true;
        fid = fid || _icheck.check0Id;
        return _icheck.render2(0, fid, value, false, '', editable);
    },

    //??
    dtRadio1: function (value, editable) {
        if (editable === undefined)
            editable = true;
        return _iradio.render(_icheck.check0Id, '', false, value, editable);
    },

    /**
     * dt欄位: set Status(checkbox)
     * value {string} checkbox value, will translate to bool
     * onClickFn {string} 自定義function, 如果空白則使用default(_crud.onSetStatus)
     */ 
    dtSetStatus: function (key, value, onClickFn) {
        //TODO: pending
        return '';

        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(onClickFn)) {
            onClickFn = _str.format("_crud.onSetStatus(this,\'{0}\')", key);
        }
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + onClickFn);
    },

    /**
     * crud funs: 修改,刪除,檢視
     * key {} row key
     * rowName {} 刪除時提示框顯示的欄位值, 表示要刪除的資料列
     * hasUpdate {bool} update 功能
     * hasDelete {bool} delete 功能
     * hasView {bool} view 功能
     */
    dtCrudFun: function (key, rowName, hasUpdate, hasDelete, hasView) {
        var funs = '';
        if (hasUpdate)
            funs += _str.format('<a onclick="_crud.onUpdate(\'{0}\');"><i class="icon-pen" title="{1}"></i></a>', key, _BR.TipUpdate);
        if (hasDelete)
            funs += _str.format('<a onclick="_crud.onDelete(\'{0}\',\'{1}\');"><i class="icon-times" title="{2}"></i></a>', key, rowName, _BR.TipDelete);
        if (hasView)
            funs += _str.format('<a onclick="_crud.onView(\'{0}\');"><i class="icon-eye" title="{1}"></i></a>', key, _BR.TipView);

        return funs;
    },
    //=== jQuery datatables end ===    

    /**
     * initial, 傳入簡化的edits[]
     * dtConfig {Object} datatables config
     * edits {Array} 維護畫面設定{object},
     *   1.null: 表示單一table, 固定捉取formEdit
     *   2.多個edit object, 如果第一個陣列為null, 則使用new EditOne()
     */
    init: function (dtConfig, edits) {
        //set _me.edits[]
        var Childs = _crud.Childs;  //constant
        var edit = null;  //具有結構的edit設定
        if (edits == null) {
            edit = new EditOne();
            //_me.hasChild = false;
        } else {
            edit = (edits[0] === null) ? new EditOne() : edits[0];
            //_me.hasChild = edits.length > 1;
            if (edits.length > 1) {
                edit[Childs] = [];
                //var childs = _me.edits._childs;
                for (var i = 1; i < edits.length; i++)
                    edit[Childs][i - 1] = edits[i];
            }
        }

        //set variables
        //_me.row = null; //edit時從後端傳回
        _me.nowFun = '';    //now fun of edit form
        _me.divRead = $('#divRead');
        //_me.divReadTool = $('#divReadTool');
        _me.divEdit = $('#divEdit');
        _me.formFind = $('#formFind');
        _me.formFind2 = $('#formFind2');
        if (_me.formFind2.length === 0)
            _me.formFind2 = null;
        //_me.formEdit = $('#formEdit');

        _me.edit = edit;
        _me.hasChild = (_fun.notNull(_me.edit[Childs]) && _me.edit[Childs].length > 0);
        //_me.editLen = _me.edits.length;

        //initial forms(recursive)
        _crud.initForm(_me.edit);

        //for xgOpenModal
        _me.modal = null;

        //table div id固定為 table1, 後端固定呼叫 GetPage
        _me.dt = new Datatable('#table1', 'GetPage', dtConfig);
        _prog.init();   //prog path
    },

    //initial forms(recursive)
    initForm: function (edit) {
        if (edit.form == null)
            return;

        _idate.init('', edit.form);  //init 日期欄位(所有欄位)
        _valid.init(edit.form);
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++)
            _crud.initForm(_crud.getEditChild(edit, i));
    },

    /**
     * get master edit form
     */
    getForm0: function () {
        return _me.edit.form;
    },

    //=== event start ===
    /**
     * 展開查詢畫面的額外欄位
     */ 
    onFind2: function () {
        //$('.xg-find-form').slideToggle();
        var find2 = _me.formFind2;
        if (find2 == null)
            return;
        else if (_obj.isShow(find2))
            _form.hideShow([find2]);
        else
            _form.hideShow(null, [find2]);

    },

    /**
     * get Find condition
     */
    getFindCond: function () {
        var row = _form.toJson(_me.formFind);
        var find2 = _me.formFind2;
        if (find2 !== null && _obj.isShow(find2))
            _json.copy(_form.toJson(find2), row);
        return row;
    },

    /**
     * click Find(查詢資料)
     */
    onFind: function () {
        var cond = _crud.getFindCond();
        _me.dt.find(cond);
    },

    /**
     * click Export(匯出excel)
     */
    onExport: function () {
        var cond = _crud.getFindCond();
        window.location = 'Export?cond=' + _json.toStr(cond);
    },

    /**
     * onclick toRead button
     */
    onToRead: function () {
        _crud.toReadMode();
    },

    /**
     * onclick Create button
     */
    onCreate: function () {
        _me.key = '';
        _crud.setEditStatus(_fun.funC);
        _prog.setPathCreate();
        _crud.resetForm(_me.edit);
        _form.swap(_me.divEdit);
    },

    /**
     * onclick Update button
     * param key {string} row key
     */
    onUpdate: function (key) {
        _crud.getJsonAndSetMode(key, _fun.funU);
    },

    /**
     * onclick View button
     * param key {string} row key
     */
    onView: function (key) {
        _crud.getJsonAndSetMode(key, _fun.funV);
    },

    getJsonAndSetMode: function (key, fun) {
        if (_str.isEmpty(key)) {
            _log.error('error: key is empty !');
            return;
        }

        //_crud.toUpdateMode(key);
        _ajax.getJson('GetJson', { key: key }, function (data) {
            //_me.nowRow = data;
            _crud.loadJson(data);

            //to edit(U/V) mode
            _me.key = key;
            _prog.setPathUpdate();
            _crud.setEditStatus(fun);
            _form.swap(_me.divEdit);

            /*
            //trigger custom function if any
            if ($.isFunction(_me._ueOnUpdate)){
                _me._ueOnUpdate(data);
            }
            */
        });
    },

    /**
     * to edit(U/V) mode
     */
    /*
    setModeAndShow: function (mode, key) {
        _me.key = key;
        _crud.setEditStatus(mode);
        //_me.isNew = false;
        //_me.divReadTool.hide();
        _prog.setPathUpdate();
        _form.swap(_me.divEdit);
    },
    */

    //set edit form status
    //fun: C,U,V
    setEditStatus: function (fun) {
        var isView = (fun == _fun.funV);
        var run = (_me.nowFun == _fun.funV && !isView) ? true :
            (_me.nowFun != _fun.funV && isView) ? true :
                false;

        //set variables
        _me.nowFun = fun;

        if (run) {
            var div = _me.divEdit;
            div.find('input, textarea, select, button').prop('disabled', isView);
            if (isView)
                div.find('#btnToRead').prop('disabled', false);
            //div.find('input', '').prop('disabled', isView); //for selected
        }
    },

    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {string} checkbox element
     * key {string} row key
     */
    onSetStatus: function (me, key) {
        var status = _icheck.checkedO($(me));
        _ajax.getStr('SetStatus', { key: key, status: status }, function (msg) {
            _tool.alert(_BR.UpdateOk);
        });
    },

    /**
     * load row(include childs) into UI
     * will call ufAfterLoadJson() 
     */
    loadJson: function (json) {
        //load master(single) row
        var edit = _me.edit;
        edit.loadRow(json);

        //load childs rows(只需載入第一層)
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            //_crud.loadChildJson(edit2, _crud.getChildJsonByUp(rowJson, i));
            edit2.loadJson(_crud.getChildJson(json, i));
        }

        //call ufAfterLoadJson() if existed
        if (_fun.notNull(edit.ufAfterLoadJson))
            edit.ufAfterLoadJson(json);
    },

    /**
     * load childs rows into UI(recursive)
     * will call ufLoadJson()
     */
    /*
    loadChild: function (edit, rows) {
        //check rows
        //var rows = _crud.getJsonRows(rowJson);  //??
        if (rows == null)
            return;

        //load this
        edit.loadRows(rows);

        //load childs
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            _crud.loadChild(edit2, _crud.getChildJsonByUp(rowJson, i));
        }
    },
    */

    /**
     * has upload file or not
     */
    hasFile: function () {
        var edit = _me.edit;
        if (edit.hasFile)
            return true;

        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            if (edit2.hasFile)
                return true;
        }

        //case of not found
        return false;
    },

    /**
     * get updated data for save(has _rows, _childs, _deletes, _fileJson)
     * param formData {FormData} for upload file
     * return {json} include fileJson if existed
     */ 
    getUpdJson: function (formData) {
        //load master(single) row
        var edit = _me.edit;
        var row = edit.getUpdRow();
        var key = edit.getKey();

        //file for master edit
        var fileJson = {};
        var levelStr = '0'; //string
        if (edit.hasFile)
            fileJson = edit.dataAddFiles(levelStr, formData); //upload files

        //load child(multiple) rows
        var hasChild = false;
        var childs = [];
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);

            //file
            if (edit2.hasFile) {
                var fileJson2 = edit2.dataAddFiles(levelStr + i, formData); //upload files
                _json.copy(fileJson2, fileJson);
            }

            var childJson = edit2.getUpdJson(key);
            if (childJson == null)
                continue;

            //has child rows
            hasChild = true;
            childs[i] = childJson; 
        }

        var data = {};
        var hasData = false;
        if (row != null) {
            hasData = true;
            data[_crud.Rows] = [row];
        }
        if (hasChild) {
            hasData = true;
            data[_crud.Childs] = childs;
        }
        if (!_json.isEmpty(fileJson)) {
            hasData = true;
            data[_edit.FileJson] = fileJson;
        }

        if (hasData) {
            _crud._removeNull(0, data);
            return data;
        } else {
            return null;
        }
    },

    /*
    //get updated json(has _rows, _childs, _deletes) for EditMany.js
    //only read first level child, not recursive
    getChildUpdJson: function (upKey, levelStr, formData, edit) {

        //file
        if (edit.hasFile)
            edit.dataAddFiles(levelStr, formData); //upload files

        return edit.getUpdJson(upKey);
    },
    */

    //傳入edit
    getEditChildLen: function (edit) {
        var fid = _crud.Childs;
        return (edit[fid] == null) ? 0 : edit[fid].length; 
    },
    //傳入edit
    getEditChild: function (edit, childIdx) {
        return edit[_crud.Childs][childIdx];
    },

    //get json rows
    getJsonRows: function (json) {
        return (json == null || json[_crud.Rows] == null)
            ? null
            : json[_crud.Rows];
    },

    //get child json
    getChildJson: function (upJson, childIdx) {
        var fid = _crud.Childs;
        return (upJson[fid] == null || upJson[fid].length <= childIdx)
            ? null
            : upJson[fid][childIdx];
    },

    //get child json rows
    getChildRows: function (upJson, childIdx) {
        var child = _crud.getChildJson(upJson, childIdx);
        return _crud.getJsonRows(child);
    },

    /**
     * 設定 child rows
     * return child object
     */ 
    setChildRows: function (upRow, childIdx, rows) {
        var fid = _crud.Childs;
        if (upRow == null)
            upRow = {};
        if (upRow[fid] == null)
            upRow[fid] = [];
        if (upRow[fid].length <= childIdx)
            upRow[fid][childIdx] = {};
        var child = upRow[fid][childIdx];
        child[_crud.Rows] = rows;
        return child;
    },

    /**
     * forms validate check
     * return {bool}
     */ 
    validAll: function () {
        var edit = _me.edit;
        if (!edit.form.valid())
            return false;

        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            var edit2 = _crud.getEditChild(edit, i);
            if (!edit2.valid())
                return false;
        }

        //case of ok
        return true;
    },

    /**
     * (recursive) childs validate check
     * return {bool}
     */
    /*
    validChild: function (edit) {
        //valid this
        if (!edit.valid())
            return false;

        //valid childs
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            if (!_crud.validChild(_crud.getEditChild(edit, i)))
                return false;
        }

        //case of ok
        return true;
    },
    */

    /**
     * get saving row, 只讀取master table跟第一層child table
     * formData {FormData} (optional) 有上傳檔案時必須在外面宣告此變數, 再傳入
     * return {json}
     */
    /*
    getSaveJson: function (formData) {
        //var isNew = (_str.isEmpty(_me.key));
        var edit = _me.edit;
        var isNew = edit.isNewRow();
        var row = isNew ? edit.getRow() : edit.getUpdRow();   //saving row
        //var deletes = [];
        //var formData = new FormData();  //for upload files if need   
        var childs = [];
        var childLen = _crud.getEditChildLen(edit);
        var hasChild = false;
        for (var i = 0; i < childLen; i++) {
            //updated rows & files
            var edit2 = _crud.getEditChild(edit, i);
            if (edit2.hasFile)
                edit2.dataAddFiles(formData); //加入上傳檔案(多個)

            var child = {
                _rows: edit2.getUpdRows(),
                _deletes: edit2.getDeletedRows(),
            };
            if (child._rows != null || child._deletes != null) {
                hasChild = true;
                childs[i] = child;
            }
        }
        if (hasChild) {
            if (row == null)
                row = {};
            row._childs = childs;
        }
        return row;
    },
    */

    /**
     * on click save, 有上傳檔案時, 後端參數名稱固定為T(n)+FieldName
     * 傳送到後端的資料包含以下欄位:  
     *   key, row(包含_childs, _deletes, _fileNo), files
     */
    onSave: function () {
        //check input
        if (!_crud.validAll()) {
            _tool.alert(_BR.InputWrong);
            return;
        }

        //call ufWhenSave if existed
        if (_fun.notNull(_me.edit.ufWhenSave)) {
            var error = _me.edit.ufWhenSave();
            if (error != '') {
                _tool.msg(error);
                return;
            }
        }

        //debugger;
        //get saving row
        var formData = new FormData();  //for upload files if need
        var fileJson = {};
        var row = _crud.getUpdJson(formData, fileJson);

        //temp add
        //return;

        //save, 固定呼叫 Save action
        var data = null;
        if (_crud.hasFile()) {
            //has files
            data = formData;
            data.append('json', _json.toStr(row));

            _ajax.getJsonByFormData('Save', data, function (result) {
                _crud.afterSave(result);
            });
        } else {
            //no files
            data = { json: _json.toStr(row) };
            _ajax.getJson('Save', data, function (result) {
                _crud.afterSave(result);
            });
        }
    },

    //recursive remove null
    //level: for debug
    _removeNull: function (level, obj) {
        //debugger;
        $.each(obj, function (key, value) {
            if (value === null) {
                //null才需要清除, 空白不必 !!
                delete obj[key];
            } else if (_json.isKeyValue(value)) {
                _crud._removeNull(level+1, value);
            } else if ($.isArray(value)) {
                $.each(value, function (k, v) {
                    _crud._removeNull(level + 1, v);

                    if (_json.isEmpty(v))
                        v = null;
                });
                var isEmpty = true;
                var len = value.length;
                //從陣列後面開始處理
                for (var i=len - 1; i>=0; i--) {
                    if (!_json.isEmpty(value[i])) {
                        isEmpty = false;
                    } else if (isEmpty) {
                        //刪除陣列元素
                        delete value[i];
                    } else {
                        value[i] = null;
                    }
                }
                if (isEmpty)
                    delete obj[key];
            /*
            } else {
                if (key.substr(0, 2) === '__')
                    delete obj[key];
            */
            }
        });
    },

    /**
     * 展開查詢畫面的額外欄位
     * data: ResultDto
     */
    afterSave: function (data) {
        //debugger;
        //call ufWhenSave if need
        if (_fun.notNull(_me.edit.ufAfterSave))
            _me.edit.ufAfterSave();

        //save no rows
        if (data.Value === '0') {
            _tool.msg(_BR.SaveNone);
            return;
        }

        //case of ok
        var start = _me.dt.dt.page.info().start;
        _tool.alert(_BR.SaveOk + '(' + data.Value + ')');
        _me.dt.reload();
        _crud.toReadMode();
    },

    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * param me {string} row key
     * param box {string} row key
     * param fid {string} fid
     */
    onCheckAll: function (me, box, fid) {
        _icheck.setF(_fun.getDataFid(fid) + ':not(:disabled)', _icheck.checkedO($(me)), box);
    },

    /**
     * click Delete, 刪除一筆資料, 後端固定呼叫 Delete()
     * key {string} row key
     * rowName {string} 資料列名稱
     */
    onDelete: function (key, rowName) {
        _crud.temp.data = { key: key };
        _tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', function () {
            _ajax.getStr('Delete', { key: key }, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },

    /**
     * TODO: need test
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * dataFid {string} row key
     */
    onDeleteRows: function (box, dataFid) {
        //get selected keys
        var keys = _icheck.getCheckedValues(box, dataFid);
        if (keys.length === 0) {
            _tool.msg(_BR.PlsSelectDeleted);
            return;
        }

        //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
        _crud.temp.data = { keys: keys };
        _tool.ans(_BR.SureDeleteSelected, function () {
            _ajax.getStr('DeleteByKeys', _crud.temp.data, function (msg) {
                _tool.alert(_BR.DeleteOk);
                _me.dt.reload();
            });
        });
    },

    /**
     * table onclick openModal button(link)
     * param btn {button} 
     * param title {string} modal title
     * param fid {string} input field name
     * param required {bool}
     * param maxLen {int} 
     */ 
    onOpenModal: function (btn, title, fid, required, maxLen) {
        var tr = $(btn).closest('tr');
        _tool.showArea(title, _itext.get(fid, tr), _crud.isEditMode(), function (result) {
            _itext.set(fid, result, tr);
        });
    },
    //=== event end ===

    /**
     * ??
     * key array to string(加上table & row分隔符號, two dimension)
     * keys {string[]} key list
     * return {string} 字串加上table & row分隔符號
     */
    /*
    _keysToStr: function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length === 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    },
    */

    //=== set mode start ===
    //reset form(recursive)
    resetForm: function (edit) {
        var childLen = _crud.getEditChildLen(edit);
        for (var i = 0; i < childLen; i++) {
            _crud.resetForm(_crud.getEditChild(edit, i));
        }
    },

    /**
     * 回到新增模式
     */
    /*
    toCreateMode: function () {
        //_me.isNew = true;
        _me.key = '';
        _crud.setEditStatus(_fun.funC);
        //_me.divReadTool.hide();
        _prog.setPathCreate();
        _crud.resetForm(_me.edit);
        _form.swap(_me.divEdit);
    },
    */

    /**
     * 回到修改模式
     * key {string} row key
     */
    /*
    toUpdateMode: function (key) {
        _crud.setModeAndShow(_fun.funU, key);
    },
    */

    /**
     * to view mode
     */
    /*
    toViewMode: function (key) {
        _crud.setModeAndShow(_fun.funV, key);
    },
    */

    /**
     * 回到列表模式
     */
    toReadMode: function () {
        //_me.divReadTool.show();
        _prog.resetPath();
        _form.swap(_me.divRead);
    },

    /**
     * check current is fun view or not
     */ 
    isEditMode: function () {
        return (_me.nowFun !== _fun.funV);
    },

    //=== set mode end ===    

};//class

//for EditOne.js, EditMany.js
var _edit = {

    //server side fid for file input collection, must pre '_'
    //key-value of file serverFid vs row key
    FileJson: '_fileJson',

    //data property name for keep old value
    DataOld: '_old',

    /**
     * get old value 
     * param obj {object} input jquery object
     * return {string}
     */
    getOld: function (obj) {
        return obj.data(_edit.DataOld);
    },

    /**
     * set old value
     * param obj {object} input jquery object
     * param value {int/string}
     */
    setOld: function (obj, value) {
        obj.data(_edit.DataOld, value);
    },

    /*
    loadRowByArg: function (box, row, fidTypes) {
        _form.loadRow(box, row);

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < fidTypes.length; i = i + 2) {
            fid = fidTypes[i];
            var obj = _obj.get(fid, box);
            obj.data(_edit.DataOld, row[fid]);
        }
    },
    */

    //called by: EditOne.js, EditMany.js
    //不設定 mapId
    getUpdRow: function (kid, fidTypes, box) {
        //如果key value為空白, 則傳回整列資料
        var key = _input.get(kid, box);
        if (_str.isEmpty(key))
            return _form.toJson(box);

        var diff = false;
        var row = {};
        var fid, ftype, value, obj;
        for (var j = 0; j < fidTypes.length; j = j + 2) {
            //skip label type
            ftype = fidTypes[j + 1];
            if (ftype === 'label')
                continue;

            fid = fidTypes[j];
            obj = _obj.get(fid, box);
            value = _input.getByType(obj, ftype, box);
            //如果使用完全比對, 字串和數字會不相等!!
            if (value != obj.data(_edit.DataOld)) {
                row[fid] = value;
                diff = true;
            }
        }
        if (!diff)
            return null;

        row[kid] = key;
        return row;
    },

    /**
     * set fid-type related variables: fidTypes, fidTypeLen
     * param box {object} container
     * return void
     */
    setFidTypeVars: function (me, box) {
        var fidTypes = [];
        box.find('[data-fid]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            //fidTypes[j] = obj.data('id');
            fidTypes[j] = _obj.getName(obj);
            fidTypes[j + 1] = _input.getType(obj);
        });
        me.fidTypes = fidTypes;
        me.fidTypeLen = me.fidTypes.length;
    },

    /**
     * set file related variables: fileFids, fileLen, hasFile
     * param me {edit} EditOne/EditMany variables
     * param box {object} form or row object
     * return void
     */
    setFileVars: function (me, box) {
        //var me = this;  //use outside .each()
        me.fileFids = [];      //upload file fid array
        box.find('[data-type=file]').each(function (index, item) {
            me.fileFids[index] = _obj.getName($(item));
        });
        me.fileLen = me.fileFids.length;
        me.hasFile = me.fileFids.length > 0; //has input file or not
    },

    /**
     * get server side var name for file field
     * param tableId {string} 
     * param fid {string} ui file id
     * return {string} format: Table_Fid
     */
    getServerFid: function (levelStr, fid) {
        return 't' + levelStr + '_' + fid;
    },

    /**
     * formData set fileJson field
     * param data {formData}
     * param fileJson {json}
     * return void
     */
    dataSetFileJson: function (data, fileJson) {
        if (_json.isEmpty(fileJson))
            return;

        var fid = _edit.FileJson
        if (data.has(fid)) {
            var json = data.get(fid);
            fileJson = _json.copy(fileJson, json);
        }
        data.set(fid, fileJson);
    },

    /**
     * get field info array by box object & row filter
     * box {object} form/div container
     * trFilter {string} (optional 'tr')
     * return json array
     */
    /*
    getFidTypesByDid: function (box, trFilter) {
        //trFilter = trFilter || 'tr';
        //var trObj = box.find(trFilter + ':first');

        var fidTypes = [];
        box.find('[data-id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.data('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    },
    */

    /*
    //for EditMany.js
    getFidTypesById: function (box) {
        //return _edit._getFidTypes(box, '[id]');
        var fidTypes = [];
        box.find('[id]').each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.attr('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    },
    */

    /**
     * get field info array: 0:id, 1:type
     * param {object} trObj
     * return {string array}
     */
    /*
    _getFidTypes: function (box, filter) {
        var fidTypes = [];
        box.find(filter).each(function (i, item) {
            var obj = $(item);
            var j = i * 2;
            fidTypes[j] = obj.data('id');
            fidTypes[j + 1] = _input.getType(obj);
        });
        return fidTypes;
    },
    */

};
var _error = {

    log: function (msg) {
        console.log(msg);
    },

}; //class

//裡面function預設傳入object(not element or selector)
var _form = {

    /**
     * convert serial string to json object(use name attribute)
     * https://jsfiddle.net/gabrieleromanato/bynaK/
     * [note] serializeArray didnot add unchecked checkbox, write code for this !!
     * [note] skip checkbox with pre name '-' for summernote !!
     * param form {object} input form
     * return {json}
     */ 
    toJson: function (form) {
        //get input
        var attr = 'name';
        var array = form.serializeArray();  //key-value

        //good: jquery foreach
        var json = {};
        $.each(array, function () {
            json[this.name] = this.value || '';
        });

        //add checkbox input, skip pre name with '-'(for summernote)
        form.find(':checkbox').each(function () {
            var item = $(this);
            var id = item.attr(attr);
            //summernote auto generate checkbox with pre name '-', must skip !!
            if (_fun.notNull(id) && id.indexOf('-') < 0)
                json[id] = _icheck.getO(item);
        });

        //add radio input
        var attr2 = '[' + attr + ']:radio';
        form.find(attr2).each(function () {
            var item = $(this);
            var id = item.attr(attr);
            json[id] = _iradio.get(id, form);
        });

        return json;
    },
    toJsonStr: function (form) {
        return JSON.stringify(_form.toJson(form));
    },

    //read json into form (container object)
    //form: form or div object
    loadRow: function (form, row) {
        for (var key in row)
            _input.set(key, row[key], form);
    },

    /**
     * ??
     檢查欄位清單內是否有空白欄位, 如果有則顯示必填
     讀取 xd-required class
     如果欄位值有錯誤, 則會focus在第一個錯誤欄位
     包含多筆區域 !!
     //@param {array} ids source field id array
     @param {object} form form object, for 多筆畫面??
     //@param {string} msg error msg, 如果沒輸入, 則使用 _BR.FieldRequired
     @return {bool} true(field ok), false(has empty)
    */
    /*
    checkEmpty: function (form) {
        //clear error label first
        form.find('.' + _fun.errCls).removeClass(_fun.errCls);
        form.find('.' + _fun.errLabCls).hide();

        //if (_str.isEmpty(msg))
        //var msg = ;

        //get ids
        //var ids = [];
        var ok = true;
        form.find('.' + _fun.xdRequired).each(function () {
            var me = $(this);
            if (_str.isEmpty(_input.getO(me))) {
                ok = false;
                //me.addClass(_fun.errCls);
                var id = _obj.getId(me);
                if (_str.isEmpty(id))
                    id = _obj.getDid(me);
                _input.showError(me, id, _BR.FieldRequired, form);
            }
        });
        return ok;

        //check if ids is string
        //if (typeof ids === 'string') {
        //    ids = [ ids ];    //把字串變成陣列
        //if (ids == null || ids.length == 0)
        //    return true;

    },
    */

    /*
    //把json的資料比對checkbox,相同值勾選起來(相同欄位名稱)
    jsonCheckBoxToForm: function (json, formId) {
        var form = $('#' + formId);
        Object.keys(json).map(function (key, index) {
            $('input[name=""]' + key).each(function () {
                if ($(this).val() == json[key]) {
                    $(this).prop("checked", true);
                }
            });
        });
    },
    */    

    //清除所有有id的欄位
    reset: function (form) {
        form.find('[name]').each(function () {
            _input.setO($(this), '', form);
        });
    },

    //是否有檔案欄位
    hasFile: function (form) {
        return (form.find(':file').length > 0);
    },

    /*
    //move to _crud.js
    //keys is two dimension
    zz_keysToStr: function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    },
    */

    //get save data without files
    //row: jobject
    //deletes: list<list<string>>
    //rows: list<JArray>
    //return json
    getSaveData: function (isNew, key, row, rows, deletes) {
        return {
            isNew: isNew,
            key: key, 
            row: _json.toStr(row),
            rows: _json.toStr(rows),
            deletes: _form.keysToStr(deletes),
        };
    },

    /*
    //??
    //單筆資料包含要上傳的多個檔案
    //files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
    getSaveRow: function (isNew, form, row, files) {
        files = files || [];
        //multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        //var i;
        for (var i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], form);

        data.append('row', _json.toStr(row));
        return data;
    },
    */

    /** 
     * @description 傳回要送到後端的儲存資料
     * @param {bool} isNew
     * @param {object} form object
     * @param {object} row json object, for save
     * @param {array} files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
     * @param {array} multis 多筆資料 src
     * @return {FormData} json
     */
    /*
    //getSaveData: function (isNew, form, row, files, multis) {
    getSaveDataWithFiles: function (isNew, form, row, files, multis) {
        files = files || [];
        multis = multis || [];

        var data = new FormData();
        data.append('isNew', isNew);

        //加上單筆資料要上傳的多個檔案
        var i;
        for (i = 0; i < files.length; i++)
            _ifile.rowAddFile(data, row, files[i][0], files[i][1], form);

        //rows 加入單筆
        var rows = [row];

        //多筆資料的異動/刪除
        var deletes = [];
        for (i = 0; i < multis.length; i++) {
            //異動資料
            _editMany.dataAddRows(data, rows, multis[i]); //多筆
            //var hasRows = (multis[i][1] !== null && multis[i][1] !== undefined);
            //if (hasRows)
            //    multis[i][1].rows = rows2;

            //刪除資料
            deletes[i] = multis[i].deletes;
        }

        //加入
        data.append('rows', _json.toStr(rows));     //加入多筆
        data.append('deletes', _editMany.keysToStr(deletes));  //輸出字串
        return data;
    },
    */

    /*
    //??
    //捲動畫面到第一個錯誤欄位
    zz_scrollTopError: function () {
        $('.' + _fun.errLabCls).each(function (i, data) {
            if ($(data).is(':visible')) {
                var t = $(data);
                var x = $(t).offset().top - 185;

                if ($('.wrapper').parent().hasClass('slimScrollDiv'))
                    $('.wrapper').slimScroll({ scrollTo: x });
                else if ($('.wrapper').hasClass('noWrapperScroll'))
                    $('.scroolablePanel').slimScroll({ scrollTo: $(t).position().top - 200 });
                else
                    $("html, body").animate({ scrollTop: x }, "slow");
                return (false);
            }
        })
    },
    */

    /**
     @description set form fields editable or not, 但是不處理按鈕的狀態
     @param {object} form jquery form
     @param {bool} status editable or not
     @return {void}
     */
    setEdit: function (form, status) {
        //var enabled = status ? 'enabled' : 'disabled';
        //var form = $('#' + formId);
        //文字欄位 & textArea (TODO: html)
        _itext.setEditO(form.find('input:text'), status);
        _itextarea.setEditO(form.find('textarea'), status);
        //form.find('input:text').attr('readonly', !status);
        //form.find('textarea').attr('readonly', !status);

        //日期欄位(xd-date為實際輸入欄位!!)
        _idate.setEditO(form.find('.xd-date'), status);

        //下拉式欄位
        //form.find('.xg-select-btn').prop('disabled', !status);
        _iselect.setEditO(form.find('select'), status);

        //checkbox & radio
        _icheck.setEditO(form.find(':checkbox'), status);
        _iradio.setEditO(form.find(':radio'), status);

        //button
        _btn.setEditO(form.find('button'), status);

        /*
        form.find(':checkbox').each(function () {
            $(this).icheck(enabled);
        });
        //radio
        form.find(':radio').each(function () {
            $(this).icheck(enabled);
        });
        */
    },

    /**
     @description hide & show form/div (動畫效果)
     @param {array} hides object array to hide
     @param {array} shows object array to show
     @return {void}
     */
    hideShow: function (hides, shows) {
        //hide first
        if (hides) {
            for (var i = 0; i < hides.length; i++) {
                var form1 = hides[i];
                form1.fadeOut(500, function () {
                    form1.hide();
                });
            }
        }

        //show
        if (shows) {
            for (var i = 0; i < shows.length; i++) {
                var form2 = shows[i];
                form2.fadeIn(500, function () {
                    form2.show();
                });
            }
        }
    },

    //切換頁面為 xg-active
    //div: jquery object
    swap: function (div) {
        //debugger;
        var active = $('.xg-swap.xg-active');
        if (div === active)
            return;

        //效果處理
        active.fadeOut(200, function () {
            //debugger;
            active.removeClass('xg-active');

            div.addClass('xg-active');
            div.fadeIn(500);
        });
        //e.preventDefault();
    },

    zz_reset: function (form) {
        //var box = $('#' + form);
        //文字欄位
        form.find('input:text').val('');
    },

}; //class

//FormData
var _formData = {


}; //class

//var RB = null;  //resource base
var _fun = {
    //errTail: '_err',
    //xgError: 'xg-error',
    locale: 'zh-TW',

    //=== constant start(大camel) ===
    //DataKey: '_key',            //編輯資料列的key值欄位id, 空白表示新增

    //input field error validation, need match server side _Web.cs
    jsPath: '../Scripts/',      //js path for load
    //errTail: '_err',            //error label 欄位id後面會加上這個字元
    xiBorder: 'xi-border',           //input border class
    errCls: 'xg-error',           //欄位驗証錯誤時會加上這個 class name
    errLabCls: 'xg-error-label',     //error label 的 class name
    //errBoxCls: 'xg-errorbox', //??_box欄位驗証錯誤時會加上這個 class name
    xdRequired: 'xd-required',

    //constant for mapping to backend
    funC: 'C',     //create
    funR: 'R',     //read
    funU: 'U',     //update
    funD: 'D',     //for input file
    funV: 'V',     //view row

    //value seperator, must match to backend !!
    //TableSep: ':',
    //RowSep: ';',
    //ColSep: ',',
    //=== constant end ===


    //變數
    maxFileSize: 50971520,  //上傳檔案限制50M
    //localeCode: 'zh-TW',

    //mid variables
    data: {},

    //variables ??
    isCheck: true,

    //後端必須實作 Fun/Test()
    onHello: function () {
        _ajax.getStr('../Fun/Hello', null, function (msg) {
            alert('OK');
        });
    },

    /**
     * get data-fid string, ex: [data-fid=XXX]
     * param fid {stirng} field id
     * param square {bool} (true)has square or not
     * return {string}
     */
    getDataFid: function (fid, square) {
        var data = 'data-fid=' + fid;
        if (square === undefined || square === true)
            data += '[' + data + ']';
        return data;
    },

    /*
    isNull: function (obj) {
        return (obj == null);
    },
    */

    default: function (val, val0) {
        return (val == null) ? val0 : val;
    },

    notNull: function (obj) {
        //不可使用 obj != null
        return !(obj == null);
    },

    //on change locale, 後端必須實作 Fun/SetLocale()
    onSetLocale: function (code) {
        _ajax.getStr('../Fun/SetLocale', { code: code }, function (msg) {
            //_browser.setLang(lang);
            location.reload();
        });
    },

    /*
      ??
    */
    xgTextBoxValid: function (obj, Regex) {
        var parent = obj.parentNode;
        if (Regex == "") {
            if (obj.value != "") {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
        else {
            if (obj.value.match(new RegExp(Regex)) != null) {
                obj.parentNode.classList.remove("xg-error");
            }
            else {
                obj.parentNode.classList.add("xg-error");
                _fun.isCheck = false;
            }
        }
    },

    /*
     ??
    */
    xgCheckfn: function () {
        _fun.isCheck = true;
        var Inputs = document.getElementsByClassName('xg-textbox');
        for (var i = 0; i < Inputs.length; i++) {
            Inputs[i].childNodes[1].onchange();
        }
        var selects = document.getElementsByClassName('xg-select');
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].childNodes[1].value == 0 || selects[i].childNodes[1].value == "") {
                selects[i].classList.add("xg-error");
                _fun.isCheck = false;
            }
            else {
                selects[i].classList.remove("xg-error");
            }
        }
        return _fun.isCheck;
    },

    /**
     multiple checkbox onclick event
     params
       me : this component
       fid: field id 
       value: field value
       onClickFn: (optional) callback function
     */
    //onClickCheckMulti: function (me, fid, value, separator, onClickFn) {
    zz_onChangeMultiCheck: function (me, fid) {

        //var fid = $(me).attr('data-item-id');
        //var field = $('[data-id="' + fid + '"]');           //field
        var field = $('#' + fid);       //field
        //var box = field.parent();     //找包含所有 checkbox 的 container
        //update value list
        var values = '';
        var texts = '';
        var separator = field.attr('data-separator');
        var onClickFn = field.attr('data-onclick');
        $(field.parent()).find('input:checked').each(function () {
            values += $(this).val() + separator;
            texts += $(this).text() + ',';
        });

        //adjust
        if (values != '') {
            values = values.substring(0, values.length - 1);
            texts = texts.substring(0, texts.length - 1);
        }
        //更新欄位內容
        field.attr('title', texts); //update show text
        field.val(values);           //set field value

        //call user define function
        if (onClickFn != undefined && onClickFn != "")
            onClickFn(me, $(me).val());

    },

 
    /**
     * 傳回錯誤訊息(多國語)
     * params
     *   form : 多國語 form 
     *   errorCode: error code
     */
    /*
    errorMsg: function (form, errorCode) {
        if (errorCode == null || errorCode == '')
            return '';
        else if (errorCode.subsubstring(0, 1) == 'E')
            return (_global[errorCode] == null) ? '(no error code: ' + errorCode +')' : _global[errorCode];
        else
            return (form[errorCode] == null) ? '(no error code: ' + errorCode + ')' : form[errorCode];
    },
    */

    /**
     * get value of multiple select field
     * params
     *   fid : field id
     * return : string
     */
    //getMultiSelectValue: function (fid, separator) {
    //    var field = $('#' + fid);
    //    return (field.length == 0) ? '' : field.val().join(separator);
    //},

};//class

var _helper = {

    /**
     * ??
     */ 
    getBaseProp: function (rowNo, fid, value, type, required, editable, extAttr) {
        var attr = _str.format("type='{0}' data-id='{1}' name='{2}' value='{3}'",
            type, fid, fid + rowNo, value);
        if (required === true)
            attr += " required";
        if (editable === false)
            attr += " readonly";
        if (!_str.isEmpty(extAttr))
            attr += " " + extAttr;
        return _str.trim(attr);
    },
};

//base class of all input field
//must loaded first, or will got error !!
var _ibase = {

    //get value by fid
    get: function (fid, box) {
        return _ibase.getO(_obj.get(fid, box));
    },
    //get value by filter
    getF: function (ft, box) {
        return _ibase.getO(_obj.getF(ft, box));
    },
    /*
    //get value by name
    getN: function (fid, box) {
        return _ibase.getO(_obj.getN(fid, box));
    },
    */
    //get value by object
    getO: function (obj) {
        return obj.val();
    },

    //get input border for show red border
    //default return this, drive class could rewrite.
    getBorder: function (obj) {
        return obj;
    },

    //set value
    set: function (fid, value, box) {
        _ibase.setO(_obj.get(fid, box), value)
    },
    setF: function (ft, value, box) {
        _ibase.setO(_obj.getF(ft, box), value)
    },
    /*
    setN: function (fid, value, box) {
        _ibase.setO(_obj.getN(fid, box), value)
    },
    */
    setO: function (obj, value) {
        obj.val(value);
    },

    //set edit status
    setEdit: function (fid, status, box) {
        _ibase.setEditO(_obj.get(fid, box), status);
    },
    setEditF: function (ft, status, box) {
        _ibase.setEditO(_obj.getF(ft, box), status);
    },
    /*
    setEditN: function (fid, status, box) {
        _ibase.setEditO(_obj.getN(fid, box), status);
    },
    */
    setEditO: function (obj, status) {
        obj.prop('readonly', !status);
    },

};//class

//使用jQuery繼承&擴充屬性
//checkbox(使用 html checkbox)
var _icheck = $.extend({}, _ibase, {

    /**
     * default name attribute value for 選取多筆
     */
    check0Id: '_check0',

    /**
     * (override)傳回value, 不是狀態 !!, 如果無選取, 則傳回0 !!
     */ 
    getO: function (obj) {
        //return obj.val();
        return obj.is(':checked') ? obj.val() : '0';
    },

    /**
     * (override)set checked or not
     */
    setO: function (obj, value) {
        //obj.val(value);
        var status = (value == '1' || value == 'True' || value == true);
        obj.prop('checked', status);
    },

    /**
     * (override) set status by object, obj可為複數
     */
    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    
    /**
     * get checked status by fid
     */
    checked: function (fid, box) {
        return _icheck.checkedO(_obj.get(fid, box));
    },

    /**
     * get checked status by filter
     */
    checkedF: function (filter, box) {
        return _icheck.checkedO(_obj.getF(filter, box));
    },

    /**
     * get checked status by object
     */
    checkedO: function (obj) {
        //檢查:after虛擬類別是否存在
        //return (_icheck.getO(obj) == 1);
        return obj.is(':checked');
        //return (obj.next().find(':after').length > 0);
    },

    /**
     * for 多筆資料only(data-id), 所以function後面加上2
     * 產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     * 
     * rowNo {Number} (optional)id/data-id
     * fid {string} (optional)id/data-id
     * value {string} (optional 1) checkbox value
     * checked {boolean} default false, 是否勾選
     * label {string} (optional) show label
     * editable {boolean} (optional true) 是否可編輯
     * extClass {string} (optional) extClass
     * extAttr {string} (optional) extAttr
     * 
     * return {string} html string.
     */
    /*
    render2: function (rowNo, fid, value, checked, label, editable, extClass, extAttr) {
        //default
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extAttr = extAttr || '';
        //value = value || '';
        //if (label == '')
        //    label = '&nbsp;';
        if (_str.isEmpty(label))
            extClass += ' xg-no-label'; //for 控制位置
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = _helper.getBaseProp(rowNo, fid, value, 'checkbox', false, editable, extAttr);
        if (checked)
            attr += ' checked';
        if (attr != '')
            attr = ' ' + attr;

        var html = "" +
            "<label class='xg-check {0}'>" +
            "   <input{1}>{2}" +
            "   <span></span>" +
            "</label>";

        return _str.format(html, extClass, attr, label);
    },
    */

    dtCheck0: function (value, checked) {
        //debugger;
        //var extClass = ' xg-no-label'; //for 控制位置
        if (_str.isEmpty(value))
            value = 1;

        //attr
        var attr = "name='" + _icheck.check0Id + "'" +
            " value='" + value + "'";
            
        if (checked)
            attr += ' checked';

        return "" +
            "<label class='xg-check xg-no-label'>" +
            "   <input " + attr + " type='checkbox'>" +
            "   <span></span>" +
            "</label>";
    },

    /**
     * 傳回有選取的欄位(使用data-id)值的字串陣列
     * box {object} container
     * dataFid {string} (optional '_check1') data-id value
     * return {string[]}
     */ 
    getCheckedValues: function (box, dataFid) {
        dataFid = dataFid || _icheck.check0Id;
        var rows = [];
        _obj.getF('[name=' + dataFid + ']:checked', box).each(function (i) {
            rows[i] = this.value;
        });
        return rows;
    },

    /**
     * 設定多個欄位的選取狀態
     * box {object} container
     * rows {json array}
     * dataFid {string} (optional '_check1') name value
     * return void
     */
    setCheckedByJsons: function (box, rows, dataFid) {
        if (_str.isEmpty(rows))
            return;

        dataFid = dataFid || _icheck.check0Id;
        for (var i = 0; i < rows.length; i++) {
            var obj = box.find('[value=' + rows[i][dataFid] + ']');
            _icheck.setO(obj, 1);
        }
    },

}); //class

var _icolor = {

    init: function () {
        $('.xg-color').colorpicker({
            //component: true,
            /*
            onchange: function (me, color) {
                $(me).css('background-color', color.toHex());
            },
            */
        });
    },

    get: function (fid, form) {
        return _icolor.getO(_obj.get(fid, form));
    },
    //value by filter
    getF: function (filter, form) {
        return _icolor.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return _icolor.rgbToHex(obj.find('i').css('background-color'));
    },

    //convert jquery RGB color to hex(has #)
    //https://stackoverflow.com/questions/5999209/how-to-get-the-background-color-code-of-an-element
    rgbToHex: function(rgb) {
        var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete (parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1)
                parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('');
    },

    /*
    onChange: function(me) {
        $(me).css('background-color', me.color.toHex());
    },
    */

    /*
    set: function (fid, value, form) {
        _itext.setO(_obj.get(fid, form), value)
    },
    setF: function (filter, value, form) {
        _itext.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.val(value);
    },
    */

}; //class

//處理日期欄位(使用bootstrap-calendar) 和日期資料
var _idate = $.extend({}, _ibase, {

    //=== get/set start ===
    getO: function (obj) {
        return obj.val();
    },

    setO: function (obj, value) {
        obj.val(_idate.toDate(value));
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
            //format: _BR.DateEditFormat,
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
    toggle: function (me) {
        //$(me).parent().parent().find('input').trigger('focus');
        $(me).parent().parent().datepicker('show');
    },

    //clean value
    clean: function (me) {
        $(me).parent().parent().datepicker('update', '');
    },

    //(停用)
    //產生一個日期元件(用於多筆區域), 參考 XiDateHelper
    //必須執行 _data.init()
    //input 欄位放一個 xd-date for 判斷欄位種類為日期 !!
    render: function (dataId, value, required, extClass) {
        extClass = extClass || '';
        if (required === true)
            extClass += ' ' + _fun.xdRequired;
        //span 要放在外面, 跟 XiDateHelper 不同 !!
        return _str.format("" +
            "<div class='input-group date xg-date' data-provide='datepicker'>" +
            "    <input data-id='{0}' value='{1}' type='text' class='form-control xd-date {2}'>" +
            "    <div class='input-group-addon'>" +
            "        <i class='fa fa-times' onclick='_idate.clean(this)'></i>" +
            "        <i class='fa fa-calendar' onclick='_idate.toggle(this)'></i>" +
            "    </div>" +
            "</div>" +
            "<span data-id2='{3}' class='{4}'></span>", 
            dataId, _idate.toDate(value), extClass, dataId + _fun.errTail, _fun.errLabCls);
    },

    //=== 計算 start ===
    /**
      傳回起迄日期(json) for 日期欄位查詢
      param {string} start 開始日期欄位id
      param {string} end 結束日期欄位id
      params {object} box box object
      return {json} 包含start, end欄位
     */
    getStartEnd: function(start, end, box) {
        //var start2 = box.find
    },

    //today: yyyy/mm/dd
    today: function(){
        var today = new Date();
        return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    },

    //西元年度
    getYear: function() {
        return (new Date()).getFullYear();
    },

    //to date format(考慮多國語)
    toDate: function (value) {
        return (_str.isEmpty(value))
            ? ''
            : moment(value).format(_BR.DateEditFormat);
    },
    toDt2: function (value) {
        return (_str.isEmpty(value))
            ? ''
            : moment(value).format(_BR.DtFormat2);
    },

    //get datetime string
    //time為下拉欄位
    getDt: function (fDate, fTime, box) {
        var date = _idate.get(fDate, box);
        var time = _iselect.get(fTime, box);
        if (date == '')
            return '';
        else
            return (time == '') ? date : date + ' ' + time;
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

    //date1是否大於date2
    isBig: function(date1, date2) {
        return (Date.parse(date1) > Date.parse(date2));
    },

    //計算月份差距 by string
    getMonthDiff: function (start, end) {
        return (_str.isEmpty(start) || _str.isEmpty(end))
            ? 0
            : _idate.getMonthDiffByDate(new Date(start), new Date(end));
    },

    //計算月份差距 by date(不考慮日)
    getMonthDiffByDate: function (d1, d2) {
        //var months;
        var months = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth() + 1;
        //if (d2.getDate() > d1.getDate())
        //    months++;
        return months;
    },

    //日期(yyyy/mm/dd) 加上年, 傳回新的日期字串
    addYear: function (date, year) {
        return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
    },

}); //class

//input file
var _ifile = $.extend({}, _ibase, {

    //=== overwrite start ===
    /**
     * get border object
     * param obj {object} input object
     */ 
    getBorder: function (obj) {
        return obj.prev();
    },

    setO: function (obj, value) {
        obj.val(value);     //set hidden input value
        _ifile._getLink(_ifile.getBorder(obj)).text(value);  //set link show text
    },
    //=== overwrite end ===

    /**
     * formData add file for upload, called by EditOne/EditMany.js
     * param data {formData}
     * param fid {string} file field id
     * param serverFid {string} server side variable name
     * param box {object} form/row object
     * return {boolean} has file or not
     */
    dataAddFile: function (data, fid, serverFid, box) {
        var obj = _obj.get(fid, box);
        var file = _ifile._getUploadFile(_ifile.getBorder(obj));
        var hasFile = (file != null);
        if (hasFile)
            data.append(serverFid, file);
        return hasFile;
    },

    //get file name by path
    getFileName: function (path) {
        var sep = path.indexOf('/') > 0 ? '/' : '\\';
        return _str.getTail(path, sep);
    },

    /**
     * get file ext without '.'
     */
    getFileExt: function (path) {
        return _str.getTail(path, '.');
    },

    //=== event start ===
    onOpenFile: function (btn) {
        var label = _ifile._getOutBorder(btn);
        var file = _ifile._getFileObj(label);
        file.focus().trigger('click'); //focus first !!
    },

    //file: input element
    onChangeFile: function (file) {
        //case of empty file
        var border = _ifile._getOutBorder(file);
        var fileObj = $(file);
        var value = file.value; //full path
        if (_str.isEmpty(value)) {
            _ifile._setValue(border, '');
            return;
        }

        //check file ext
        var exts = fileObj.data('exts').toLowerCase();
        if (!_str.isEmpty(exts)) {
            var ext = _ifile.getFileExt(value).toLowerCase();
            exts = ',' + exts + ',';
            if (exts.indexOf(',' + ext + ',') < 0) {
                _tool.msg(_BR.UploadFileNotMatch);
                file.value = '';
                return;
            }
        }

        //check file size
        var max = fileObj.data('max');
        if (file.files[0].size > max * 1024 * 1024) {
            _tool.msg(_str.format(_BR.UploadFileNotBig, max));
            file.value = '';
            return;
        }

        //case ok
        _ifile._setValue(border, value);
    },

    onDeleteFile: function (btn) {
        var border = _ifile._getOutBorder(btn);
        //var file = _ifile._getFileObj(label);
        _ifile._setValue(border, '');
    },
    //=== event end ===

    //?? initial after load rows
    zz_init: function(fid, path, form) {
        var fileObj = _obj.get(fid, form);
        fileObj.val('');
        //_ifile.setFun(fileObj, ''); //set fun to empty
        //_ifile.setPathByFile(fileObj, path);

        /*
        //file element 要 reset
        var file = _obj.getF(_ifile.fileF(id), form);
        //var $el = $('#example-file');
        file.wrap('<form>').closest('form').get(0).reset();
        file.unwrap();
        */
    },

    //=== private function below ===
    /**
     * get outer label object(same to border)
     * param elm {object/element} border inside object/element
     */
    _getOutBorder: function (elm) {
        return $(elm).closest('.xi-border');
    },

    /**
     * border set input value
     * param border {object}
     */
    _setValue: function (border, value) {
        _ifile._getObj(border).val(value);
    },

    /**
     * border get input object
     * param border {object}
     */
    _getObj: function (border) {
        return border.next();
    },

    /**
     * border get link object
     * param border {object} border object
     */
    _getLink: function (border) {
        return border.find('a');
    },

    /**
     * border get file object
     * param border {object} border object
     */
    _getFileObj: function (border) {
        return border.find(':file');
    },

    //border get uploaded file, return null if empty
    _getUploadFile: function (border) {
        var fileObj = _ifile._getFileObj(border);
        var files = fileObj.get(0).files;
        return (files.length > 0) ? files[0] : null;
    },

}); //class
/*
 處理 html 欄位, 使用 summernote !!
 */
var _ihtml = {
    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    encode: function (value) {
        return $('<div/>').text(value).html();
    },

    decode: function(value){
        return $('<div/>').html(value).text();
    },

    //encode row
    encodeRow: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _ihtml.encode(row[fid]);
        }
        return row;
    },

    //更新html欄位內容, 讀取 text()
    update: function(fid, box) {
        var filter = '#' + fid;
        var obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
    updates: function (fids, box) {
        for (var i = 0; i < fids.length; i++)
            _ihtml.update(fids[i], box);
    },
    
};

//注意: 欄位validation時, 輸入欄位與error span 的位置關係只有是2種情形:
//  1.在同一個parent (可以是不同child level)
//  2.parent的下個相鄰位置(ex: Date)
var _input = {

    //get object
    getObj: function (fid, box) {
        var obj = _obj.get(fid, box);
        if (obj.length == 0)
            obj = _obj.getD(fid, box);   //iRead use data-fid
        return obj;
    },

    //get value by name or data-fid
    get: function (fid, box) {
        var obj = _input.getObj(fid, box);
        return _input.getO(obj, box);
    },

    //get value by object, box for radio
    getO: function (obj, box) {
        switch (_input.getType(obj)) {
            case 'check':
                return _icheck.getO(obj);
            case 'radio':
                //obj is array !!
                return _iradio.getO(obj);
            case 'textarea':
                //重要!! 要設定它的 html 屬性!!
                return _itextarea.getO(obj);
            case 'select':
                return _iselect.getO(obj);
            case 'file':
                return _ifile.getO(obj);
            case 'read':
                return _iread.getO(obj);
            default:
                //case 日期欄位                
                if (obj.hasClass('xd-date')) {
                    return _idate.getO(obj);
                } else {
                    //text, textarea
                    return obj.val();
                }
                break;
        }
    },

    set: function (fid, value, box) {
        _input.setO(_input.getObj(fid, box), value, box);
    },

    //radio 需要 box(container object)
    setO: function (obj, value, box) {
        switch (_input.getType(obj)) {
            case 'check':
                _icheck.setO(obj, value);
                break;
            case 'radio':
                //此時 obj 為 array
                value = value || '0';
                _iradio.setOs(obj, value);
                break;
            case 'textarea':
                //重要!! 要設定它的 html 屬性!!
                value = _ihtml.decode(value);
                obj.html(value);
                obj.val(value);     //也要設定這個屬性 !!
                //obj.text(value);
                break;
            case 'select':
                _iselect.setO(obj, value);
                break;
            case 'file':
                _ifile.setO(obj, value);
                break;
            case 'read':
                //debugger;
                _iread.setO(obj, value);
                break;
            default:
                //case 日期欄位                
                if (obj.hasClass('xd-date')) {
                    _idate.setO(obj, value);
                } else {
                    //text, textarea
                    obj.val(value);
                }
                break;
        }
    },

    /**
     * get input field type
     */ 
    getType: function (obj) {
        //var type = obj.attr('type') || obj.prop('type') || obj.prop('tagName');
        //return (type == null) ? '' : type.toLowerCase();
        return obj.data('type');
    },

    /**
     * get field value by type
     * obj {object}
     * type {string} field type
     * box {object} (optional) for radio only
     * return {object data}
     */ 
    getByType: function (obj, type, box) {
        switch (type) {
            case 'check':
                return _icheck.getO(obj);
            case 'radio':
                return _iradio.getO(obj, box);
            //TODO: summernote
            //case 'textarea':
            //    return obj.html();   //html !!
            default:
                //同時適用select option
                return obj.val();
        }
    },

    /**
     * get old value (get data-old value)
     */ 
    getOld: function (obj) {
        return obj.data('old');
    },

    /**
     * 檢查欄位是否binding event
     */ 
    isBound: function(filter) {
        var field = $(filter);
        return (field.find(':not(.bound)').length == 0);
    },

    /* 
     設定欄位狀態
    */
    setEdit: function (fid, status, box) {
        //文字欄位
        _obj.get(fid, box).attr('readonly', !status);
    },
    setEdits: function (fids, status, box) {
        //文字欄位
        for (var i = 0; i < fids.length; i++) 
            _obj.get(fids[i], box).attr('readonly', !status);
    },

    //檢查欄位是否存在, true/fales
    exist: function (fid, form) {
        return _input.existF('#' + fid, form);
    },

    existF: function (filter, form) {
        var field = (form === undefined) ? $(filter) : form.find(filter);
        return (field.length > 0);
    },


    //=== below is old ===
    /**
     * select option on change event.
     *
     */
    _onChangeSelect: function (me) {
        //var tt = 'tt';
        var className = 'selected';
        var len = me.options.length;
        for (var i = 0; i < len; i++) {
            var opt = me.options[i];
            var opt2 = $(opt);

            // check if selected
            if (opt.selected) {
                if (!opt2.hasClass(className))
                    opt2.addClass(className);
            } else {
                if (opt2.hasClass(className))
                    opt2.removeClass(className);
            }
        }
    },

    /**
     * set select field value
     * params
     *   data : address
     * return : true/false
     */
    setSelect: function (fid, value) {
        $('#' + fid).selectpicker('val', value);
    },

    setValue: function (fid, value) {
        var field = $('#' + fid);
        if (field.length == 0)
            console.log('no field: ' + fid);
        else
            field.val(value);
    },

    /**
     * 寫入 multiple select value (使用 bootstrap-select)
     * 多選欄位值為陣列, 必須轉成字串
     * param :
     *    fid: 欄位id
     *    separator: 分隔符號
     */
    writeMultiValue: function (fid, separator) {
        var value = $('#' + fid + '_tmp').val();
        if (value)
            value = value.join(separator);
        $('#' + fid).val(value);
    },

    //把json塞進label的text(相同欄位名稱)
    setLabel: function (fid, value) {
            $('#'+fid).text(value); 
    },

    /* 
     顯示欄位的錯誤訊息, fid欄位會直接加上 error className
     先找 error label, 再找上面相鄰的 object, 然後加入 xg-error
     para:
       fid: 欄位id
       msg: 顯示訊息, 可為空白, 此時會顯示錯誤外框, 但是無錯誤訊息
       form: (optional) form(jquery object), for 多筆畫面
     return: void
    */
    showError: function (obj, fid, msg, form) {
        //輸入欄位增加 error class
        obj.addClass(_fun.errCls);

        //label欄位設定文字內容
        var filter = '[data-id2=' + fid + _fun.errTail + ']';
        //先找parent下
        //var label = _obj.getF(filter, form);
        var parent = obj.parent(); 
        var label = parent.find(filter);
        if (label.length == 0)
            label = parent.next();
        //obj.addClass(_fun.errCls);
        label.text(msg);
        label.show();
        /*
        var labelFid = '#' + fid + _fun.errTail;
        var error = (form === undefined) ? $(labelFid) : form.find(labelFid);
        error.text(msg);

        //找相鄰的上一個 element
        var field = error.prev();
        var id = field.attr('id');
        if (id && id.substring(id.length - 4) == '_box')
            field.addClass(_fun.errBoxCls);   //error label -> field/div (相鄰)
        else
            field.addClass(_fun.errCls);      //error label -> field/div (相鄰)

        _form.scrollTopError();
        */
    },

    /* 
    ??
     移除欄位的 error class
     para:
       fid: 欄位id
       form: (optional) form(jquery object), for 多筆畫面
     return: void
    */
    clearFieldError: function (fid, form) {
        var labelFid = '#' + fid + _fun.errTail;
        var error = (form === undefined) ? $(labelFid) : form.find(labelFid);
        var field = error.prev();
        var id = field.attr('id');
        //
        field.removeClass(_fun.errCls)
        /*
        if (id && id.substring(id.length - 4) == '_box')
            field.removeClass(_fun.errBoxCls);   //error label -> field/div (相鄰)
        else
            field.removeClass(_fun.errCls);      //error label -> field/div (相鄰)
        */
    },

    /* 
     移除所有 error class
     return: void
    */
    clearFieldsError: function () {
        //尋找所有 err_ 開頭的 dom
        $('.' + _fun.errCls).removeClass(_fun.errCls);
        //$('.' + _fun.errBoxCls).removeClass(_fun.errBoxCls);
    },

}; //class

//注意: 單筆時, 要設定 fid/data-fid(只設定第1個radio), name (2個屬性的內容必須相同!!)
//與其他類型輸入欄位操作不同 !!
//iRadio 沒有 getD/setD
var _iradio = $.extend({}, _ibase, {

    //=== get ===
    get: function (fid, box) {
        return _iradio.getOs(_obj.get(fid, box));
    },
    //obj 為單筆object
    getO: function (obj, box) {
        return obj.val();
        /*
        if (obj.length == 1)
            obj = _obj.get(_obj.getName(obj), box);
        return _iradio._getO(obj);
        */
    },
    //get value by objects
    getOs: function (objs) {
        //use filter !!
        return objs.filter(':checked').val();
    },

    //=== set ===
    //改成用name來查欄位
    set: function (fid, value, box) {
        _iradio.setOs(_obj.get(fid, box), value);
    },
    //obj 為單筆object
    //setO: function (obj, value, box) {
    setO: function (obj) {
        obj.prop('checked', true);
        /*
        if (obj.length == 1)
            obj = _obj.getN(_obj.getName(obj), box);
        return _iradio._setO(obj, value);
        */
    },
    //set value by objects
    setOs: function (objs, value) {
        //use filter !!
        objs.filter('[value=' + value + ']').prop('checked', true);
    },

    //set status by name
    //改成用name來查欄位
    setEdit: function (fid, status, box) {
        //use getN() !!
        _iradio.setEditOs(_obj.get(fid, box));
    },
    setEditOs: function (objs, status) {
        objs.attr('disabled', !status); //use attr !!
    },

    /**
     button radio onclick event
     params
       me : this component
       fid: field id 
       value: field value
       onClickFn: (optional) callback function
     */
    /*
    _onClickBtnRadio: function (me, fid, value, onClickFn) {
        //unselect所有欄位
        fid = '#' + fid;
        var field = $(me);
        var box = field.closest(fid + '_box');      //找最近的 xxx_box 元素, 因為考慮相同 id的情況
        box.find('.active').removeClass('active');

        //更新欄位內容
        field.addClass('active');   //high light
        box.find(fid).val(value);   //set field value

        //更新欄位 xxx_now 內容
        box.find(fid + '_now').val(field.attr('data-old'));

        //call user define function
        //if (onClickFn != undefined && onClickFn != "")
        if (onClickFn)
            onClickFn(me, value);
    },

    //get field value
    getValue: function (fid) {
        var me = $('[name="' + fid + '"]:radio');
        if (me.length > 0) {
            return me.parent().hasClass('checked') ? me.val() : '';
        } else {
            return '';
        }
    },
    */

    /** 
     ?? for 多筆資料only(data-id)
     產生 checkbox html 內容, 與後端 XiCheckHelper 一致
     @param {string} fid (optional)id/data-id 
     @param {string} label (optional)show label 
     @param {bool} checked default false, 是否勾選
     @param {string} value (optional) 如果null則為1
     @param {bool} editable default true, 是否可編輯
     @param {string} boxClass (optional) boxClass
     @param {string} extClass (optional) extClass
     @param {string} extProp (optional) extProp
     @return {string} html string.
    */
    //render: function (isId, id, label, checked, editable, value, onClickFn) {
    render: function (fid, label, checked, value, editable, extClass, extProp) {
        var html = "" +
            "<label class='xg-radio {0}'>" +
            "   <input type='radio'{1}>{2}" +
            "   <span></span>" +
            "</label>";

        //adjust
        label = label || '';
        //boxClass = boxClass || '';
        extClass = extClass || '';
        extProp = extProp || '';
        value = value || '';
        if (label == '')
            label = '&nbsp;';
        if (_str.isEmpty(value))
            value = 1;

        //attr
        extProp += " data-id='" + fid + "' name='" + fid + "'" + 
            " value='" + value + "'";
        if (checked)
            extProp += ' checked';
        if (editable !== undefined && !editable)
            extProp += ' disabled';    //disabled='disabled'

        return _str.format(html, extClass, extProp, label);
    },

}); //class

//label
var _iread = {

    //value by fid
    get: function (fid, form) {
        return _iread.getO(_obj.getD(fid, form));   //use data-fid
    },
    //value by filter
    getF: function (filter, form) {
        return _iread.getO(_obj.getF(filter, form));
    },
    //value by object
    getO: function (obj) {
        return obj.text();
    },

    set: function (fid, value, form) {
        _iread.setO(_obj.getD(fid, form), value);   //use data-fid
    },
    setF: function (filter, value, form) {
        _iread.setO(_obj.getF(filter, form), value)
    },
    setO: function (obj, value) {
        obj.text(value);
    },

};

//一般的 select option 
var _iselect = $.extend({}, _ibase, {

    //=== default get/set ===
    getO: function (obj) {
        return (obj.length === 0) ? '' : obj.find('option:selected').val();
    },

    //設定目前選取的item
    //不傳回選取的 option object(自行呼叫 getIndex())
    setO: function (obj, value) {
        filter = 'option[value="' + value + '"]';
        var item = obj.find(filter);
        if (item.length > 0) {
            item.prop('selected', true);
            return item;
        } else {
            //remove selected
            obj.find('option:selected').prop('selected', false);
            return null;
        }
    },

    setEditO: function (obj, status) {
        obj.prop('disabled', !status);
    },
    //=== end ===


    //get selected index(base 0)
    getIndex: function (fid, box) {
        return _iselect.getIndexO(_obj.get(fid, box));
    },
    getIndexO: function (obj) {
        return obj.prop('selectedIndex');
    },

    //get options count
    getCount: function (fid, box) {
        return _iselect.getCountO(_obj.get(fid, box));
    },
    getCountO: function (obj) {
        return obj.find('option').length;
    },

    //set by index(base 0)
    setIndex: function (fid, idx, box) {
        _iselect.setIndexO(_obj.get(fid, box), idx);
    },
    setIndexO: function (obj, idx) {
        obj.find('option').eq(idx).prop('selected', true);
    },

    //傳回選取的欄位的文字
    getText: function (fid, box) {
        var obj = _obj.get(fid, box);
        return _iselect.getTextO(obj);
    },
    getTextO: function (obj) {
        return obj.find('option:selected').text();
    },

    //傳回data屬性(name)值
    getData: function (fid, name, box) {
        return _obj.get(fid, box).find('option:selected').data(name);
    },
    getDataO: function (obj, name) {
        return obj.find('option:selected').data(name);
    },

    //重新設定option內容
    //items: 來源array, 欄位為:Id,Str
    setItems: function (fid, items, box) {
        var obj = _obj.get(fid, box);
        _iselect.setItemsO(obj, items);
    },
    setItemsF: function (filter, items, box) {
        var obj = _obj.getF(filter, box);
        _iselect.setItemsO(obj, items);
    },
    //by object
    setItemsO: function (obj, items) {
        obj.find('option').remove();
        if (items === null)
            return;

        for (var i = 0; i < items.length; i++)
            obj.append($('<option></option>').attr('value', items[i].Id).text(items[i].Str));
    },

    //get all options
    //getIdStrExts -> getExts
    getExts: function (fid, box) {
        var rows = [];
        _obj.get(fid, box).find('option').each(function (i) {
            var me = $(this);
            rows[i] = {
                Id: me.val(),
                Str: me.text(),
                Ext: me.data('ext'),
            };
        });
        return rows;
    },

    //重新設定option內容, 欄位為:Id,Str,Ext
    //setItems2 -> setExts
    setExts: function (fid, items, box) {
        var filter = '#' + fid;
        var obj = box ? box.find(filter) : $(filter);
        obj.find('option').remove();
        if (items == null)
            return;
        for (var i = 0; i < items.length; i++)
            obj.append(_str.format("<option data-ext='{0}' value='{1}'>{2}</option>", items[i].Ext, items[i].Id, items[i].Str));
    },

    //把多欄位值寫入json
    //fids: 欄位名稱 array
    valuesToJson: function (json, fids, box) {
        for (var i = 0; i < fids.length; i++)
            json[fids[i]] = _iselect.get(fids[i], box);
        return json;
    },

    //ie 不支援 option display:none !!
    //filter options by data-ext value
    //rows: 所有option 資料(Id,Text,Ext)
    filterByExt: function (fid, value, rows, box, allItem) {
        if (allItem === undefined)
            allItem = false;
        var obj = _obj.get(fid, box);
        obj.empty();
        //item.find('option').hide();
        var len = rows.length;
        for (var i = 0; i < len; i++) {
            var row = rows[i];
            //if (row.Ext == value)
            if ((allItem === true && row.Ext == '') || row.Ext == value)
                obj.append(_str.format('<option value="{0}">{1}</option>', row.Id, row.Text));
        }

        //選取第0筆
        if (len > 0)
            _iselect.setIndexO(obj, 0);
    },

}); //class

//擴充_ibase屬性, 使用jQuery
//https://stackoverflow.com/questions/10744552/extending-existing-singleton
var _itext = $.extend({}, _ibase, {

    /** 
     for 多筆資料only, 配合jquery validate
     產生 input text html 內容, 與後端 XiTextHelper 一致
     validate使用name屬性, 必須唯一, 所以加上rowNo參數
     @param {int} rowNo row no
     @param {string} fid data-id
     @param {string} value value
     @param {int} maxLen 字串長度限制, default 0(表示不限制)
     @param {bool} required default false, 是否為必填
     @param {bool} editable default true, 是否可編輯
     @param {string} extClass extend class
     @param {string} extProp extend property, 可以放onChange
     @return {string} html string.
    */
    /*
    render: function (rowNo, fid, value, type, maxLen, required, editable, extClass, extProp) {
        //default value
        rowNo = rowNo || 0;
        fid = fid || '';
        value = value || '';
        maxLen = maxLen || 0;
        type = _var.emptyToValue(type, 'text');
        required = required || false;
        editable = editable || true;
        extClass = extClass || '';
        extProp = extProp || '';

        //attr
        var attr = _helper.getBaseProp(rowNo, fid, value, type, required, editable, extProp);
        if (maxLen > 0)
            attr += " maxlength='" + maxLen + "'";
        if (extProp != '')
            attr += " style='" + extProp + "'"; 
        if (attr != '')
            attr = ' ' + attr;
        var html = "<input{0} data-val='true' class='form-control {1}'>";
        return _str.format(html, attr, extClass);
    },
    */

    //add input mask
    //use jquery maskedinput
    mask: function (box) {
        var filter = "[data-mask!='']";
        _obj.getF(filter, box).each(function () {
            var me = $(this);
            me.mask(me.data('mask'));
        });
    },

}); //class


//textarea欄位, 如果為 html 內容, 則必須再呼叫 _ihtml.js 功能 !!
var _itextarea = $.extend({}, _ibase, {

    getO: function (obj) {
        return obj.html();
        //return obj.val();
    },

    setO: function (obj, value) {
        obj.html(value);
        //obj.val(value);
    },

}); //class

var _json = {

    /**
     add json object into another object
     @param {object} source source object
     @param {object} target target object
     @return {object}
     */
    /*
    addJson: function (source, target) {
        if (!target)
            target = {};
        Object.keys(source).map(function (key, index) {
            target[key] = source[key];
        });
        return target;
    },
    */

    /**
     * copy json data
     * param from {json}
     * param to {json}
     * return {json} new json data
     */ 
    copy: function (from, to) {
        var to = to || {};
        for (var key in from)
            to[key] = from[key];
        return to;
        /*
        Object.keys(from).map(function (key, index) {
            to[key] = from[key];
        });
        */
    },

    /**
     convert keyValues to json object
     @param {array} keyValues keyValue array
     @param {string} keyId key field id, default to 'Key'
     @param {string} valueId value field id, default to 'Value'
     @return {object} 回傳的json的欄位名稱前面會加上'f'
     */
    keyValuesToJson: function (keyValues, keyId, valueId) {
        if (keyValues === null || keyValues.length === 0)
            return null;

        if (!keyId)
            keyId = 'Key';
        if (!valueId)
            valueId = 'Value';
        var data = {};
        for (var i=0; i<keyValues.length; i++) {
            var row = keyValues[i];
            data['f'+row[keyId]] = row[valueId];
        }
        return data;
    },

    //json: object or object array
    toStr: function (json) {
        return (_json.isEmpty(json)) ? '' : JSON.stringify(json);
    },

    isEmpty: function (json) {
        return (json == null || $.isEmptyObject(json));
    },

    //check is key-value pair
    isKeyValue: function (value) {
        return (Object.prototype.toString.call(value) === '[object Object]');
    },

    //convert url to json 
    urlToJson: function (url) {
        if (url.indexOf('?') > -1) {
            url = url.split('?')[1];
        }
        var pairs = url.split('&');
        var json = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            if (pair[0] !== "")
                json[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return json;
    },

    //convert string to json array
    strToArray: function (str) {
        return $.parseJSON(str);
    },

    //find jarray
    //return array index
    findIndex: function (rows, fid, value) {
        if (rows == null)
            return -1;

        for (var i = 0; i < rows.length; i++) {
            if (rows[i][fid] == value) 
                return i;           
        }

        //case of not found
        return -1;
    },

    //filter json array
    filterRows: function (rows, fid, value) {
        return rows.filter(function (row) {
            return (row[fid] === value);
        });
    },

    //appendRows
    appendRows: function (froms, tos) {
        if (froms == null || froms.length == 0)
            return;

        var len = tos.length;
        for (var i = 0; i < froms.length; i++) {
            tos[len + i] = froms[i];
        }
    },

}; //class

var _leftmenu = {

    init: function () {
        //set variables
        _leftmenu.menu = $('.xg-leftmenu');
        //_leftmenu.box = _leftmenu.menu.parent();
        //_leftmenu.body = $('#_Body');
        //_leftmenu.setBoxWidth(true);
        //.css('width', _leftmenu.menu.data('max-width') + 'px');

        //click時, show/hide 下一個 element, 可省去在panel設定id的步驟
        //for left-menu
        $('.xg-toggle').click(function (e) {
            e.preventDefault();

            var me = $(this);
            me.next().collapse('toggle');
            var arrow = me.find('.xg-arrow');
            var clsName= 'xg-open';
            if (arrow.hasClass(clsName))
                arrow.removeClass(clsName);
            else
                arrow.addClass(clsName);
        });
    },

    /*
    //set width for container of left menu
    setBoxWidth: function (isOpen) {
        var fid = isOpen ? 'max-width' : 'min-width';
        //_leftmenu.box.css('width', _leftmenu.menu.data(fid) + 'px');
    },
    */

    onToggleMenu: function () {
        _leftmenu.menu.toggleClass('xg-close');
    },
};
var _locale = {

}; //class

var _log = {

    /**
     * @description 記錄程式時間功能的變數
     */
    _start: 0,      //開始時間
    _now: 0,        //目前時間
    //_result: '',    //目前記錄的內容

    info: function (msg) {
        console.log(msg);
    },

    error: function (msg) {
        alert(msg);
    },

    /**
     * @description 初始化記錄程式時間功能
     */
    logTimeInit: function (name) {
        _start = new Date();
        _now = _start;
        //_result = "\r\n" + name;
        if (name)
            console.log(name);
    },

    /**
     * @description 記錄程式執行時花用的時間
     */
    logTime: function (name) {
        var now = new Date();
        //_result += name + ":" + (now - _now) + "/" + (now - _start) + "\r\n";
        var msg = name + ":" + (now - _now) + "/" + (now - _start);
        console.log(msg);
        _now = new Date();;    //reset
    },

}; //class

var _modal = {

    show: function (id) {
        $('#' + id).modal('show');
    },
    hide: function (id) {
        $('#' + id).modal('hide');
    },
    showO: function (obj) {
        obj.modal('show');
    },
    hideO: function (obj) {
        obj.modal('hide');
    },
    showF: function (filter) {
        $(filter).modal('show');
    },
    hideF: function (filter) {
        $(filter).modal('hide');
    },

};//class

var _nav = {

    moveLeft: function (obj) {
        obj.insertBefore(obj.prev());
    },
    moveRight: function (obj) {
        obj.insertAfter(obj.next());
    },

}; //class

//數字相關
var _num = {
    //是否為數字而且大於(等於)0
    //zeor: 可否為0
    isBigZero: function (value, zero) {
        if (isNaN(value))
            return false;
        else if (!zero && (value === '0' || value === 0)) 
            return false;
        else if (parseInt(value) < 0)
            return false;
        else
            return true;
    },

    isNum: function (value) {
        return !isNaN(value);
    },

    toBool: function (value) {
        return (value === 1);
    },

    rowToBool: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _num.toBool(row[fid]);
        }
        return row;
    },

    //http://www.mredkj.com/javascript/numberFormat.html
    addComma: function (str) {
        str += '';
        x = str.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },

};//class


//jquery object
//同時用在輸入欄位和非輸入欄位(ex: button)
var _obj = {

    /**
     * get object by name for input field
     */
    get: function (val, box) {
        return _obj.getF('[data-fid=' + val + ']', box);
    },

    /**
     * for none input object
     * get object by id for none input field, like button
     */
    getById: function (val, box) {
        return _obj.getF('#' + val, box);
    },

    /**
     * get object by filter string
     */
    getF: function (ft, box) {
        return box.find(ft);
    },

    /**
     * get object by name
     */
    getN: function (val, box) {
        return _obj.getF('[name=' + val + ']', box);
    },

    /**
     * get object by data-id
     */
    getD: function (val, box) {
        return _obj.getF('[data-id=' + val + ']', box);
    },

    /**
     * get object by value
     */
    getV: function (val, box) {
        return _obj.getF('[value=' + val + ']', box);
    },

    //以下function都傳入object
    /**
     * get id of object
     */
    getId: function (obj) {
        return (obj.length > 0) ? obj.attr('id') : '';
    },

    /**
     * get name of object
     */
    getName: function (obj) {
        return (obj.length > 0) ? obj.attr('name') : '';
    },

    /**
     * get data-id of object
     */
    getDid: function (obj) {
        return (obj.length > 0) ? obj.data('id') : '';
    },

    /**
     * check object is visible or not
     */
    isShow: function (obj) {
        return obj.is(':visible');
    },

    /**
     * check object existed or not
     */
    isExist: function (obj) {
        return (obj.length > 0);
    },

    /**
     * check object has attribute or not
     * return boolean
     */
    hasAttr: function (obj) {
        return obj.attr(attr);
    },

}; //class

//SPA pjax
var _pjax = {

    /**
     * initial
     * param {string} filter : filter of pjax container, ex: '.xu-body'
     */
    init: function (filter) {
        //box = box || '.xd-body';
        //if skip 'POST', it will trigger twice !!
        $(document).pjax('[data-pjax]', filter, { type: 'POST' });

        /*
        $(document).on('ready pjax:success', box, function () {
            debugger;
        });
        $(document).on('ready pjax:end', box, function () {
            debugger;
        });
        $(document).on('ready pjax:complete', box, function () {
            debugger;
        });
        
        $(document).ready(function () {
            debugger;
        });
        */
        //選擇性 binding event 
        //xd-bind 只有用在這裡
        //debugger;
        //$('[data-pjax]:not(.xd-bind)').addClass('xd-bind').on('click', function () {
        //    //post submit
        //    //debugger;
        //    /*
        //    */
        //    $(document).on('ready pjax:success', box, function () {
        //        //bindPJAX(target); // Call initializers
        //        init();
        //        $(document).off('ready pjax:success', box); // Unbind initialization
        //    });
        //    /*
        //    $(document).on('pjax:end', function () {
        //        init();

        //        $(document).off('pjax:end');
        //    });
        //    */

        //    // PJAX-load the new content
        //    //debugger;
        //    //$.pjax.click(event, { container: $(box) });

        //    //var path = _pjax._getPath($(this), '');
        //    var url = $(this).data('pjax');
        //    _pjax.submit(url, box);
        //});

        /*
        //如果後端驗証失敗, 則取消 submit
        $(document).on('pjax:beforeReplace', function (contents, options) {
        });
        $(document).on('pjax:end', function (data, status, xhr) {
            init();
        });
        */

        //pjax載入完成後必須程式載入.js檔案
        //$(document).on('pjax:success', function (data, status, xhr) {
        //    //_me.initByPjax();
        //    //_me.init();
        //    /*
        //    //先載入 JsLib if need
        //    var jsLib = $('#_JsLib').val();
        //    if (!_str.isEmpty(jsLib)) {
        //        $.getScript('../Scripts/' + jsLib + '.js');
        //    }

        //    //如果view包含_JsView這個hidden欄位, 則表示要載入指定的js檔案, 
        //    //否則載入與controller相同名稱的js file
        //    var jsView = $('#_JsView').val();
        //    if (_str.isEmpty(jsView)) {
        //        //get controller name, 在倒數第2個, js檔案名稱固定為controller小寫
        //        var url = data.currentTarget.URL.replace('//', '/');
        //        if (url.substr(url.length - 1, 1) == '/')
        //            url = url.substr(0, url.length - 1);
        //        var items = url.split('/');
        //        if (items.length >= 4)
        //            jsView = items[items.length - 2].toLowerCase();
        //    }

        //    //載入 jsView
        //    if (!_str.isEmpty(jsView)) {
        //        $.getScript('../Scripts/view/' + jsView + '.js', function (data, textStatus, jqxhr) {
        //            //載入成功後執行 init()
        //            if (typeof (_me) !== 'undefined')
        //                _me.init();
        //        });
        //    }
        //    */
        //});
    },

};//class

//program, 包含 crud功能
var _prog = {
    //filter: '.xg-prog-path',
    me: null,
    oriPath: '',    //original path

    init: function () {
        _prog.me = $('.xg-prog-path');
        _prog.oriPath = _prog.me.text();
    },

    //reset path to initial
    resetPath: function () {
        _prog.me.text(_prog.oriPath);
    },

    //for crud, set path for create
    setPathCreate: function () {
        _prog.me.text(_prog.oriPath + '-' + _BR.Create);
    },
    //for crud, set path for update
    setPathUpdate: function () {
        _prog.me.text(_prog.oriPath + '-' + _BR.Update);
    },
};

//https://github.com/davidshimjs/qrcodejs
var _qrcode = {

    set: function (id, box, url, width) {
        return _qrcode.setO(_obj.getById(id, box), url, width);
    },
    setO: function (obj, url, width) {
        width = width || 128;

        //return new QRCode(document.getElementById(id), {
        return new QRCode(obj[0], {
            text: url,
            width: width,
            height: width,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    },

};//class

var _str = {

    //column seperator
    colSep: '@@',

    //variables is empty or not
    isEmpty: function (str) {
        return (str === undefined || str === null || str === '')
    },

    //convert empty string to new string
    emptyToStr: function (str, newStr) {
        return _str.isEmpty(str) ? newStr : str;
    },

    //format string like c# String.Format()
    format: function () {
        var str = arguments[0];
        for (var i = 0; i < arguments.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, arguments[i + 1]);
        }
        return str;
    },

    //get mid part string
    getMid: function (str, find1, find2) {
        if (_str.isEmpty(str))
            return '';
        var pos = str.indexOf(find1);
        if (pos < 0)
            return str;
        var pos2 = str.indexOf(find2, pos + 1);
        return (pos2 < 0)
            ? str.substring(pos + find1.length)
            : str.substring(pos + find1.length, pos2)
    },

    //get tail part string
    getTail: function (value, find) {
        var pos = value.lastIndexOf(find);
        return (pos > 0)
            ? value.substring(pos + 1)
            : value;
    },

    toBool: function (val) {
        return (val == '1' || val == true || val == 'True');
    },

    //合併多個欄位成為字串??
    colsToStr: function () {
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++)
            str += _str.colSep + arguments[i];
        return str;
    },

    trim: function (str) {
        return $.trim(str);
    },
}; //class

//switch radio, 使用 css3 toggle switch
//https://www.htmllion.com/css3-toggle-switch-button.html
var _switch = {

    //傳回元件內容字串 for client render
    getText: function (yes, no, width, status, inline, fid, cls) {
        var inline2 = (inline) ? ' xg-inline' : '';
        var attr = (fid) ? (' id="' + fid + '"') : '';
        if (status)
            attr += ' checked';
        cls = (cls) ? (' ' + cls) : '';
        var  html = '' +
            '<label class="switch{5}" style="width:{2}px;">' +
                '<input{3} class="switch-input{4}" type="checkbox" />' +
                '<span class="switch-label" data-on="{0}" data-off="{1}"></span>' +
                '<span class="switch-handle"></span>' +
            '</label>';
        return _str.format(html, yes, no, width, attr, cls, inline2);
    },

}; //class

var _tab = {

    moveLeft: function (obj) {
        obj.insertBefore(obj.prev());
    },
    moveRight: function (obj) {
        obj.insertAfter(obj.next());
    },

}; //class

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
            _str.format('<a href="javascript:_crud.onUpdate(\'{0}\');"><i class="icon-times" title="{0}"></i></a>', key, _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveUp(this);"><i class="icon-up" title="{0}"></i></a>', _BR.TipUpdate) +
            _str.format('<a href="javascript:_table.rowMoveDown(this);"><i class="icon-down" title="{0}"></i></a>', _BR.TipUpdate);
    },

}; //class

//small public components
var _tool = {

    init: function () {
        //alert
        _tool.xgAlert = $('#xgAlert');
        _tool.xgMsg = $('#xgMsg');
        _tool.xgAns = $('#xgAns');
        _tool.xgArea = $('#xgArea');
        _tool.xgImage = $('#xgImage');
    },

    /**
     * show message box
     * param msg {string} html or string
     * param fnOk {function} callback function
     */
    msg: function (msg, fnClose) {
        var box = _tool.xgMsg;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnMsgClose = fnClose;
    },

    /**
     * show confirmation 
     */
    ans: function (msg, fnYes, fnNo) {
        var box = _tool.xgAns;
        box.find('.xd-msg').html(msg);
        _modal.showO(box);

        //set callback
        _tool._fnOnAnsYes = fnYes;
        _tool._fnOnAnsNo = (fnNo === undefined) ? null : fnNo;
    },

    /**
     * show alert(auto close), use bootstrap alert
     * param {string} msg
     * param {string} color: default blue, R(red)
     */
    alert: function (msg, color) {
        var box = _tool.xgAlert;
        box.find('.xd-msg').text(msg)
        box.fadeIn(500, function () {
            box.show();
            setTimeout(function () {
                _tool.onAlertClose();
            }, 5000);   //show 5 seconds
        });
    },

    //show waiting
    showWait: function () {
        //$('body').addClass('xg-show-loading');
        $('#xgWait').show();
    },
    hideWait: function () {
        //$('body').removeClass('xg-show-loading');
        $('#xgWait').hide();
    },

    /**
     * show textarea editor
     * param title {string} modal title
     * param value {string} textarea value
     * param isEdit {bool} true:edit, false:readonly
     * param fnOk {function} function of onOk
     */
    showArea: function (title, value, isEdit, fnOk) {
        //set title
        var box = _tool.xgArea;
        box.find('.modal-title').text(title);

        //get value & yes button status
        var obj = box.find('textarea');
        obj.val(value);
        _itextarea.setEditO(obj, isEdit);
        _btn.setEditO(box.find('.xd-yes'), isEdit);

        //set callback function
        if (isEdit)
            _tool._fnOnAreaYes = fnOk;

        //show modal
        _modal.showO(box);
    },

    onAreaYes: function () {
        var box = _tool.xgArea;
        if (_tool._fnOnAreaYes) {
            _modal.hideO(box);
            var value = box.find('textarea').val();
            _tool._fnOnAreaYes(value);
        }
    },

    /**
     * show image modal
     * param fileName {string} image file name without path
     * param imageSrc {string} image src
     */ 
    showImage: function (fileName, imageSrc) {
        var box = _tool.xgImage;
        box.find('img').attr('src', imageSrc);
        box.find('label').text(fileName);
        _modal.showO(box);
    },

    /**
     * onclick alert close button
     */
    onAlertClose: function () {
        var box = _tool.xgAlert;
        box.fadeOut(500, function () {
            box.hide();
        });
    },

    /**
     * triggered when user click confirmation yes button
     * called by XgAnsHelper
     */
    onAnsYes: function () {
        if (_tool._fnOnAnsYes) {
            _modal.hideO(_tool.xgAns);
            _tool._fnOnAnsYes();
        }
    },
    onAnsNo: function () {
        if (_tool._fnOnAnsNo)
            _tool._fnOnAnsNo();
        _modal.hideO(_tool.xgAns);
    },
    onMsgClose: function () {
        if (_tool._fnOnMsgClose)
            _tool._fnOnMsgClose();
        _modal.hideO(_tool.xgMsg);
    },

}; //class

//use jquery validation
var _valid = {

    init: function (fm, inputConfig) {

        //default config
        var config = {
            /*
            unhighlight: function (element, errorClass, validClass) {
                var me = $(element);
                me.data('edit', 1);    //註記此欄位有異動
            }
            */
            ignore: '',
            errorElement: 'span',
            /*
            highlight: function (element) {
                _valid.getInputBox(element).addClass(_fun.errCls);
            },
            unhighlight: function (element) {
                _valid.getInputBox(element).removeClass(_fun.errCls);
            },
            //errorClass: 'label label-danger',
            errorPlacement: function (error, element) {
                error.insertAfter(_valid.getInputBox(element).parent());
            }
            */
        };

        //加入外部傳入的自定義組態
        if (inputConfig)
            config = _json.copy(inputConfig, config);

        return fm.validate(config);
    },

    //get input box for validate
    getInputBox: function (element) {
        return $(element).closest('.' + _fun.xiBorder);
    },

    reInit: function (fm, inputConfig) {
        fm.removeData('validator');
        fm.removeData('unobtrusiveValidation');
        _valid.init(fm, inputConfig);
    },

    /**
     * check regular
     * params
     *   fields : fields id array
     *   msg : error message
     *   expr : regular expression
     * return : true/false
     */
    anyRegularsWrong: function (fields, msg, expr) {
        if (fields == null || fields.length == 0)
            return false;

        //var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var find = false;
        for (var i = 0; i < fields.length; i++) {
            var value = $('#' + fields[i]).val();
            if (!expr.test(value)) {
                find = true;
                _input.showError(fields[i], msg);
            }
        }
        return find;
    },

    /**
     * check email 
     * see : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
     * params
     *   data : email address
     * return : true/false
     */
    anyEmailsWrong: function (fields, msg) {
        var expr = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return _valid.anyRegularsWrong(fields, msg, expr);
    },

    /**
     * check address
     * params
     *   data : address
     * return : true/false
     */
    anyAddressesWrong: function (fields, msg) {
        var expr = /^\d+\w*\s*(?:(?:[\-\/]?\s*)?\d*(?:\s*\d+\/\s*)?\d+)?\s+/;
        return _valid.anyRegularsWrong(fields, msg, expr);
    },

}; //class

var _var = {

    emptyToValue: function (var1, value) {
        return _str.isEmpty(var1) ? value : var1;
    },

    //variables is empty or not
    isEmpty: function (var1) {
        return (var1 === undefined || var1 === null)
    },

};

/**
 * 建立 jQuery dataTables
 * selector {string} datatable selector
 * url {string} backend action url
 * dtConfig {json} datatables config
 * findJson {json} 初始化時的查詢條件
 * fnOk {function}: 查詢成功時的callback, 如果空白, 則顯示成功訊息
 * tbarHtml {string}: datatable toolbar html for 增加額外的功能按鈕
 */
function Datatable(selector, url, dtConfig, findJson, fnOk, tbarHtml) {

    //public property 
    this.dt = null;             //datatable object
    this.findJson = findJson;   //查詢條件
    //this.findStr = '';          //快速查詢字串    
    this.recordsFiltered = -1;  //查詢筆數, -1表重新計算, 名稱配合DataTables
    this.defaultShowOk = true;  //是否顯示查詢成功訊息, default value

    //private
    //從上次查詢的頁次開始, false(查詢), true(儲存後重整UI)
    this._keepStart = false;

    //記錄目前的開始行數, 因為在 ajax.dataSrc() 無法得到(會得0)
    this._start = 0;

    //(目前)是否顯示查詢成功訊息
    this._nowShowOk = this.defaultShowOk;      
        
    /**
     * 重新計算筆數
     */ 
    this.resetCount = function () {
        //var count = reset ? -1 : this.dt.recordsFiltered;
        this.recordsFiltered = -1;
    };

    /**
     * 查詢資料
     * findJson {json} 查詢條件
     * search {string} 搜尋字串
     */
    this.find = function (findJson) {

        //debugger;
        this.findJson = findJson;
        //this.findStr = findStr || '';
        this.resetCount();   //重新計算條件下的筆數

        //trigger dataTables search event
        //this.dt.search(this.findStr).draw();
        this.dt.search('').draw(!this._keepStart);
    };

    /**
     * 用相同的條件再查詢一次, 用於資料更新之後
     * 不顯示 "查詢成功" 訊息
     */ 
    this.reload = function () {
        this._keepStart = true;
        this._nowShowOk = false;  //不顯示成功訊息
        this.find(this.findJson);
    };

    /**
     * initial jquery datatables, 參數參考前面的建構子
     */
    this.init = function (selector, url, dtConfig, fnOk, tbarHtml) {
        
        //default config for dataTables
        var config = {
            processing: false,  //使用自定義的處理中訊息
            serverSide: true,   //server pagination
            jQueryUI: false,    //可載入Jquery UI主題  
            //stateSave: true,    //
            //ordering: false,
            filter: false,      //搜尋            
            paginate: true,     //翻頁功能            
            lengthChange: true, //改變每頁顯示數據數量            
            info: true,         //顯示表格的相關資訊，包括當前頁面紀錄，以及總記錄頁面數量。
            sorting: [],        //default not sorting, 否則datatable會使用第一個欄位排序 !!
            pagingType: "full_numbers",

            //多國語
            language: {
                url: "../locale/" + _fun.locale + "/dataTables.txt",
            },

            //自訂工具列
            dom: 'l<"toolbar">frtip',

            //dataTables完成初始化之後會呼叫這個函式
            //1.增加 toolbar button list if need
            //2.改變查詢欄位的行為, 按下 enter 時才執行查詢
            initComplete: function (settings, json) {
                //1.toolbar
                if (tbarHtml)
                    $(this).closest('.dataTables_wrapper').find('div.toolbar').html(tbarHtml);

                //check filter existed
                var filter = $(selector + "_filter input");
                if (filter.length > 0) {
                    //2.unbind first
                    filter.unbind();

                    //bind key enter for quick search
                    var api = this.api();
                    filter.bind('keyup', function (e) {
                        if (e.keyCode === 13) {
                            this.resetCount();

                            //run search
                            api.search(this.value).draw();     //must draw() !!
                        }
                    });
                } else {
                    //console.log('no dataTables filter !!');
                    //return;
                }
            }.bind(this),

            //ajax config(不是標準的 jquery ajax !!)
            //me: this,
            ajax: {
                //config
                url: url,
                type: 'POST',
                dataType: 'json',

                //增加傳入參數 for datatables
                data: function (arg) {
                    //debugger;
                    arg.findJson = _json.toStr(this.findJson);    //以字串型式傳入
                    arg.recordsFiltered = this.recordsFiltered;
                    if (this._keepStart)
                        arg.start = this._start;
                }.bind(this),                

                //on success
                //cannot use success, see dataTables document !!
                dataSrc: function (result) {
                    this._start = this.dt.page.info().start;
                    this._keepStart = false; //reset

                    //debugger;
                    //data is mapping to backend ErrorModel
                    if (result.ErrorMsg != null && result.ErrorMsg != "") {
                        _tool.msg(result.ErrorMsg);
                        result.recordsFiltered = 0;
                        this.recordsFiltered = 0;
                        return [];  //no null, or jquery will get wrong !!

                    } else {
                        //set global
                        this.recordsFiltered = result.recordsFiltered;

                        if (fnOk) {
                            return fnOk(result);
                        } else if (result.data === null || result.data.length === 0) {
                            _tool.alert(_BR.FindNone, 'R');
                            return [];
                        } else {
                            if (this._nowShowOk)
                                _tool.alert(_BR.FindOk);
                            this._nowShowOk = this.defaultShowOk;  //reset to default
                            return result.data;
                        }
                    }
                }.bind(this),

                //on error
                error: function (xhr, ajaxOptions, thrownError) {
                    //debugger;
                    _tool.hideWait();
                    _tool.msg('Datatable.js error.');
                    if (xhr != null) {
                        console.log('status' + xhr.status);
                        console.log(thrownError);
                    }
                },
            },
        };

        //add custom config
        if (dtConfig)
            config = _json.copy(dtConfig, config);
        
        //before/after ajax call, show/hide waiting msg
        var dt = $(selector);
        dt.on('preXhr.dt', function (e, settings, data) { _tool.showWait(); });
        dt.on('xhr.dt', function (e, settings, data) { _tool.hideWait(); });
        this.dt = dt.DataTable(config);
        //.DataTables() will return DataTable API instance, but .dataTable() only return jQuery object !!
        //return { datatable: dt.DataTable(config), findJson: {} };
    };

    //必須放最後面
    this.init(selector, url, dtConfig, fnOk, tbarHtml);

} //class
//多筆維護
//處理沒有 child 的資料
//called by _crud.js
/*
 一個 crud json 包含3個欄位: _rows, _deletes, _childs
   _rows: 多筆資料, 包含資料異動和 "檔案上傳"
   _deletes[]: 要刪除的Id array 字串(後端才能decode!!), 只有一個 id欄位(必須使用json格式才能傳到後端 !!)
   _childs  
 處理編輯畫面的多筆資料, 
   1.產生的資料(變數)包含3個欄位:
     form: form container
     rows[]: 表示要異動的資料 array, 欄位為欄位名稱, 其中 :
       //_new : 1/0
       //_key : 主key值, from data-key, for刪除only
       _fileNo : 欄位對應到要上傳的檔案序號(>=0), -1表示無檔案, -2表示要刪除檔案
 注意:
   //1.tr要放一個checkbox欄位 for 刪除資料
   //2.tr最多只能有一個上傳檔案欄位(也可以沒有)
   3.系統自動填入tr 2個屬性 :
     //(a).data-new: 1/0
     //(b).data-key: 單欄位主key
   4.異動欄位設定屬性 : name='xxx', xxx為欄位名稱
   //5.刪除按鈕固定呼叫 : this.onClickDeleteRows(_me.divXXX, _me.XXX)
   ??5.刪除按鈕固定呼叫 : this.onClickDeleteRows(_me.multiXXX)
   ??6.檔案欄位固定內容 : <input type='file' onchange='this.onChangeFile(this)'>
   ??7.在後端要自行處理上傳檔名的問題
   ??8.刪除多table多筆資料時, 分隔符號為: table(:), row(;), col(,), 後端必須同時配合!!
   ??9.多筆資料的上傳檔案暫時呼叫 _xp.tdFile(url)

 * 注意:
 *   保留的自訂函數:
 *     //void ufAfterLoadJson(rowJson)
 *     //bool ufWhenSave():
 *     //void ufAfterSave(): 在 _crud.js呼叫

   //如果有child, 則新增時要設定 id=new index
   儲存前要設定 data fkeyFid(base 0, for 新增)
 */

/**
 * constructor
 * param kid {string} pkey field id(single key)
 * param formId {string} form row container id
 *   if not empty, system will load UI & prepare save rows
 *   and rows container tag is fixed to 'tbody'
 * param tplRowId {string} row template id
 * param sortFid {string} (optional) sort fid for sorting function
 */
function EditMany(kid, formId, tplRowId, sortFid) {

    //新增row時, 同時設定以下2個row box 欄位, save時, 會傳入後端
    //1.row index, 
    //this.DataIndex = '_index';
    //2.對應上層資料的key值, 如上層為新增, 則設定為 DataIndex的值(前面加負號, 做為區別)
    //this.DataMapFid = '_mapfid';

    this.init = function () {

        //constant
        this.DataFkeyFid = '_fkeyfid';  //data field for fkey fid
        this.RowTag = 'tr';             //row tag

        this.kid = kid;
        this.tplRow = $('#' + tplRowId).html();

        var rowObj = $(this.tplRow);
        _edit.setFidTypeVars(this, rowObj);
        _edit.setFileVars(this, rowObj);

        this.hasForm = !_str.isEmpty(formId);
        if (this.hasForm) {
            this.form = $('#' + formId);     //form object
            this.rowsBox = this.form.find('tbody'); //use tbody
        }

        this.sortFid = sortFid;
        this.deletedRows = [];  //deleted key array
        this.newIndex = 0;      //new row serial no
    };

    /**
     * check is a new row or not
     * param row {json} 
     * return {bool}
     */
    this.isNewRow = function (row) {
        //return _str.isEmpty(row[this.kid]);
        return this.isNewKey(row[this.kid]);
    };

    /**
     * reset edit form
     */
    this.reset = function () {
        //this.loadRows();
        //if (!this.hasForm)
        //    return;

        //rowsBox.empty();   //empty rows ui first
        this.newIndex = 0;
        this.deletedRows = [];
    };

    /**
     * load this json rows into UI
     * param {jarray} rows
     */
    this.loadJson = function (json) {
        //reset first
        this.reset();

        if (json == null || json[_crud.Rows] == null)
            return;

        if (this.hasForm)
            this.loadRows(this.rowsBox, json[_crud.Rows]);
        else
            this.ufLoadJson(json);
    };

    /**
     * load this json rows into UI
     * param {jarray} rows
     */
    /*
    this.loadRows = function (rows) {
        //reset first
        this.reset();

        if (this.hasForm)
            this.loadRows(this.rowsBox, rows);
        else
            this.ufLoadJson(rows);
    };
    */

    //load row by row box(container)
    this.loadRow = function (box, row, index) {
        var form = $(Mustache.render(this.tplRow, { Index: index }));
        _form.loadRow(form, row);   //使用 name

        //set old value for each field
        //var fidLen = fidTypes.length;
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, form);
            obj.data(_edit.DataOld, row[fid]);
        }

        box.append(form);
    };

    /**
     * load rows to form UI
     * param rowsBox {object} rows box container
     * param rows {jsons}
     */ 
    this.loadRows = function (rowsBox, rows) {
        //reset first
        rowsBox.empty();

        //var rows = json._rows;
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen === 0)
            return;

        //render this rows
        //var fidTypeLen = fidTypes.length;
        for (var i = 0; i < rowLen; i++) {
            var row = rows[i];
            var obj = $(Mustache.render(this.tplRow, row));
            //obj.data(this.DataIndex, i);    //set row index

            //set old value for each field
            for (var j = 0; j < this.fidTypeLen; j = j + 2) {
                fid = this.fidTypes[j];
                var obj2 = _obj.get(fid, obj);
                _edit.setOld(obj2, row[fid]);
            }

            _form.loadRow(obj, row);
            /*
            //設定 checkbox, radio status(後端無法設定) !!
            //要加入 checkbox 欄位, 只會讀取有name的欄位值
            obj.find(':checkbox').each(function () {
                var item = $(this);
                var id = item.data('id');
                if (id !== undefined && id.indexOf('-') < 0)
                    _icheck.setO(item, row[id]);
            });

            //要加入 radio 欄位, 只會讀取有name的欄位值
            obj.find(':radio').each(function () {
                var item = $(this);
                var id = item.data('id');
                if (id !== undefined)
                    _iradio.setO(item, row[id]);
            });
            */

            obj.appendTo(rowsBox);
        }        
    };

    this.valid = function () {
        return (this.hasForm)
            ? this.form.valid()
            : this.ufValid();
    };

    /**
     * get row key
     * param box {object} row box
     * return {string} key value
     */
    this.getKey = function (box) {
        return _input.get(this.kid, box);
    };

    /**
      * get row(json) by tr object
      * trObj {object} tr object
      * fidTypes {string array} field info array
      * return {json} one row
      */
    this.getRow = function (trObj) {
        //var fidTypes = this.fidTypes;
        var row = {};
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            obj = _obj.get(fid, trObj);
            row[fid] = _input.getByType(obj, this.fidTypes[i + 1], trObj);
        }
        return row;
    };

    /**
     * get row box by inside object/element
     * param obj {object/element} 
     * return {object}
     */
    this.getRowBox = function (obj) {
        return $(obj).closest(this.RowTag);
    };

    /**
     * get updated json
     * param {upKey}
     * return {json} different column only
     */
    this.getUpdJson = function (upKey) {
        if (!this.hasForm)
            return this.ufGetUpdJson();

        var json = {};
        json[_crud.Rows] = this.getUpdRowsByArg(upKey, this.rowsBox);
        json[_crud.Deletes] = this.getDeletedRows();
        return json;
    };

    //是否為new key, parseInt(英數字) 會傳回int, 不可使用!!
    this.isNewKey = function (key) {
        return (key.length <= 3);
    };

    /**
     * get updated rows(not include _childs, _deletes)
     * will also set fkeyFid
     * param rowsBox {object} rows container
     * param trFilter {string} (optional) default to this.RowTag
     * return {json} null if empty
     */ 
    this.getUpdRowsByArg = function (upKey, rowsBox, trFilter) {
        //rowsBox = rowsBox || this.rowsBox;
        trFilter = trFilter || this.RowTag;

        //set sort field
        this.setSort();

        //debugger;
        var rows = [];  //return rows        
        var me = this;  //先用變數接起來, 否則在 each() 裡面不能用 this
        rowsBox.find(me.RowTag).each(function (idx, item) {
            //add new row if empty key
            var tr = $(item);
            var key = _input.get(me.kid, tr);
            if (me.isNewKey(key)) {
                var row2 = me.getRow(tr);
                row2[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
                rows.push(row2);
                return;     //continue;
            }

            //add modified fields
            //var key = tr.data(_fun.DataKey);
            //var oldRow = me.getOldRow(key);
            var diffRow = {};
            var diff = false;
            var fid, ftype, value, obj;
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                //label 不取值
                ftype = me.fidTypes[j + 1];
                if (ftype === 'label')
                    continue;

                fid = me.fidTypes[j];
                obj = _obj.get(fid, tr);
                value = _input.getByType(obj, ftype, tr);
                //如果使用完全比對, 字串和數字會不相等!!
                if (value != _edit.getOld(obj)) {
                    diffRow[fid] = value;
                    diff = true;
                }
            }

            if (diff) {
                /* ??
                //diffRow[me.DataIsNew] = 0;
                //diffRow[_fun.DataKey] = key;
                for (var j = 0; j < me.extFidLen; j++) {
                    diffRow[me.extFids[j]] = oldRow[me.extFids[j]];
                }
                */
                diffRow[kid] = key;    //set key value
                //diffRow[me.DataFkeyFid] = upKey;   //無條件寫入這個欄位!!
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    };

    /** 
     * get deleted rows(key array "string" !!)
     * return empty if empty.
     */ 
    this.getDeletedRows = function () {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    };    

    //onclick addRow button
    this.onAddRow = function () {
        this.addRow();
    };

    /**
     * 增加一筆資料
     * param {object} row(optional)
     * return {object} row jquery object(with UI)
     */
    //this.addRow = function (upKey, row) {
    this.addRow = function (row) {
        if (!this.hasForm) {
            _log.error('EditMany.js addRow() failed, hasForm is false.');
            return null;
        }

        row = row || {};
        //row[this.DataIsNew] = isNew ? 1 : 0;
        //var isNew = this.isNewRow(row);
        //if (this.isNewRow(row))
        //    row[this.kid] = ;
        //if (this.oldRows == null)
        //    this.oldRows = [];
        //this.oldRows[this.oldRows.length] = row;

        var obj = this.renderRow(row);
        this.boxSetNewId(obj);
        return obj;
    };

    //user click deleteRow
    this.onDeleteRow = function (btn) {        
        //var trObj = $(btn).closest(this.RowTag);
        var trObj = this.getRowBox(btn);
        this.deleteRow(_itext.get(this.kid, trObj), trObj);
    };

    /**
     * add deleted row & remove UI row
     * param {string} key: row key
     * param {object} (optional)trObj tr object
     */ 
    this.deleteRow = function (key, trObj) {
        var rows = this.deletedRows;
        var found = false;
        var rowLen = rows.length;
        for (var i = 0; i < rowLen; i++) {
            //do nothing if existed
            if (rows[i][this.kid] === key) {
                found = true;
                break;
            }
        }

        //add deleted[]
        if (!found)
            rows[rowLen] = key;

        //remove row
        //if (this.hasForm && trObj)
            //this.rowsBox.remove(trObj);
        trObj.remove();
    };

    /**
     * onclick viewFile
     * param elm {element} link element
     */
    this.onViewImage = function (table, fid, elm) {
        var key = this.getKey(this.getRowBox(elm));
        if (this.isNewKey(key))
            _tool.msg(_BR.NewFileNotView);
        else
            _tool.showImage(elm.innerHTML, _str.format('GetFile?table={0}&fid={1}&key={2}', table, fid, key));
    };

    /**
     * render row by UI template
     * return jquery object of row
     */ 
    this.renderRow = function (row) {
        if (!this.hasForm)
            return null;

        var obj = $(Mustache.render(this.tplRow, row));
        //obj.data(this.kid, row[this.kid]);
        obj.appendTo(this.rowsBox);
        return obj;
    };

    /**
     * formData add upload files
     * param levelStr {string}
     * param data {FormData}
     * return {json} file json
     */ 
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        //debugger;
        //var form = this.form;
        var me = this;
        var fileJson = {};
        var fileIdx = {};   //fileFid map index
        this.rowsBox.find(me.RowTag).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _edit.getServerFid(levelStr, fid);
                if (_ifile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    //set fileJson
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    //=== 以下待修正 ===
    /**
     @description 2個功能: 
       1.FormDate 增加上傳檔案
       2.累加多筆資料
     如果多筆資料有上傳檔案, 而且是多主key, 則要在後端自行處理上傳檔案名稱的問題 !!
     注意: radio 有2種情形(true/false):
         
     @param {object} data FormData(在外面宣告), 把上傳檔案加到這個變數裡面
     @param {array} toRows 來源多筆資料, [0]為單筆(已存在), [1]以後為多筆(開始寫入)
     @param src: container
     @param oneRadio: 
       1.false: row有自己的 radio group(default): (此時id & name不同):
         用id 找name, 取name有checked的項目取值, 再寫回 id欄位
       2.true: rows共用一個 radio group: (此時id & name相同):
     //kid: key id欄位名稱, 把key值寫到這個欄位, 如果沒有上傳檔案, 則不需要
     //setRowsFiles: function (data, src, src, kid) {
     //@return 資料筆數
    */
    //addFilesAndRows: function (data, toRows, src) {
    //??
    /*
    this.dataAddRows = function (data, toRows, src) {
        //if (oneRadio === undefined)
        //    oneRadio = false;
        var fileLen = data.getAll('files').length;    //目前上傳檔案數量
        var rows = [];      //要異動的多筆資料
        var fields = [];    //obj. id, type欄位
        src.box.find('tr').each(function (index, item) {
            //寫入欄位資訊 fields[id,type] (只寫第一次)
            var tr = $(item);
            if (fields.length === 0) {
                //尋找所有 data-id 的欄位
                tr.find("[data-id]").each(function (i2, item2) {
                    var obj2 = $(item2);
                    fields[i2] = {
                        //obj: obj2,
                        id: obj2.data('id'),
                        type: _input.getType(obj2),
                    };
                });
            }

            //檔案加入 formData, 欄位名稱(後端變數名稱)為 files
            var fileNo = -1;    //初始化, -1表示無檔案
            var files = tr.find(':file');
            if (files.length > 0) {
                files = files[0].files;
                if (files.length > 0) {
                    data.append('files', files[0]);
                    fileNo = fileLen;
                    fileLen++;
                }
            }

            //寫入異動資料
            //row為多筆的一筆資料, 保留欄位的名稱加底線
            var row = { _fileNo: fileNo };  //對應要上傳的檔案位置序號, -1表示無檔案
            //if (kid !== undefined && kid != '')
            //    row[kid] = tr.data('key');      //寫入key值
            row._fun = tr.data(this.dataFun);          //row fun??
            row._key = tr.data(this.DataKey);          //row key
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                var value = '';
                var obj = tr.find('[data-id=' + field.id + ']');
                //考慮多筆的 radio 欄位是否為共用!!
                row[field.id] = (field.type == 'radio')
                    ? (src.oneRadio)
                        ? _iradio.getO(obj, src.box)
                        : _iradio.get(obj.attr('name'), src.box)
                    : _input.getByType(obj, field.type, tr);
            }
            rows.push(row);
        });

        //陣列加一
        toRows[toRows.length] = rows;   //寫入外部 rows
        src.rows = rows;    //同時寫入自己的rows !!
        //return rows;
    };

    //write row key info from jquery object to model
    this.keyObjToModel = function (obj, model) {
        model[this.DataIsNew] = obj.data(this.DataIsNew);
        model[this.DataKey] = obj.data(this.DataKey);
    };
    //write row key info from model to jquery object
    this.keyModelToObj = function (model, obj) {
        obj.data(this.DataIsNew, model[this.DataIsNew]);
        obj.data(this.DataKey, model[this.DataKey]);
    };
    this.keyModelToModel = function (from, to) {
        if (!_str.isEmpty(from[this.DataIsNew]))
            to[this.DataIsNew] = from[this.DataIsNew];
        if (!_str.isEmpty(from[this.DataKey]))
            to[this.DataKey] = from[this.DataKey];
    };
    this.keyValuesToObj = function (isNew, key, obj) {
        obj.data(this.DataIsNew, isNew);
        obj.data(this.DataKey, key);
    };
    this.keyValuesToModel = function (isNew, key, model) {
        model[this.DataIsNew] = isNew;
        model[this.DataKey] = key;
    };
    */

    /**
    * @param {string} rows checkbox data-id value
    */
    this.zz_boxLoadData = function (rows) {
        var len = (rows == null) ? 0 : rows.length;

        //empty rows ui first
        this.rowsBox.empty();

        //render rows
        for (var i = 0; i < len; i++)
            this.rowsBox.append(Mustache.render(this.tplRow, rows[i]));

        //keep old column values

        //reset
        //this.oldRows = rows;
        this.newIndex = 0;
        this.deletedRows = [];
    };    

    this.rowSetFkeyFid = function (row, fkeyFid) {
        if (row != null && this.isNewRow(row))
            row[this.DataFkeyFid] = fkeyFid;
    };

    this.rowsSetFkeyFid = function (rows, fkeyFid) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && this.isNewRow(row))
                    row[this.DataFkeyFid] = fkeyFid;
            }
        }
    };

    /*
    this.boxSetMapId = function (box, fkeyFid) {
        box.data(this.DataFkeyFid, fkeyFid);
    };
    */

    //set new id for box
    this.boxSetNewId = function (box) {
        this.newIndex++;
        _itext.set(this.kid, this.newIndex, box);
    };

    //set sort field
    this.setSort = function () {
        var sortFid = this.sortFid;
        if (!_str.isEmpty(sortFid)) {
            this.rowsBox.find(this.RowTag).each(function (i, item) {
                //this did not work in this loop !!
                _itext.set(sortFid, i, $(item));
            });
        }
    };


    //=== 最後呼叫 ===
    this.init();

    /*
    //??
    //src: 來源資料
    //return: true/false
    this.onClickDeleteRows = function (src) {
        var find = false;
        if (src.deletedRows == null)
            src.deletedRows = [];
        src.box.find('[data-id=' + src.checkFid + ']:checked').each(function (index, item) {
            find = true;
            var check = $(item);
            var tr = check.closest('tr');
            var key = tr.data('key');
            if (key !== '')
                src.deletedRows[src.deletedRows.length] = key;
            //刪除資料
            tr.remove();
        });
        return find;
        //_tool.msg('請先選取資料。')
    };

    //選取所有checkbox
    //onClickCheckAll: function (tableId, dataFid, status) {
    onClickCheckAll: function (me, dataFid) {
        dataFid = dataFid || '_check0';
        var status = me.checked;
        $(me).closest('table').find('[data-id=' + dataFid + ']:not(:disabled)').prop('checked', status);
    };

    //??
    //get field by rowNo and dataId ??
    this.getField = function (tbody, rowNo, dataId) {
        return tbody.find('tr').eq(rowNo).find('[data-id=' + dataId + ']');
    };

    //?? -> _crud.js
    //keys is two dimension
    this.keysToStr = function (keys) {
        var strs = [];
        for (var i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_fun.RowSep);
        }
        return strs.join(_fun.TableSep);
    };
    */

} //class

/**
 * 注意:
 *   保留的自訂函數: 
 *     void ufAfterLoadJson(rowJson)
 *     error ufWhenSave():
 *     void ufAfterSave(): 在 _crud.js呼叫
 * 
 */

/**
 * 單筆維護, 包含以下保留欄位:
 *   _edit:
 *   _childs:
 * called by _crud.js
 * param kid {string} (optional 'Id') key field id
 * param formId {string} (optional 'formEdit')
 * return {EditOne}
 */ 
function EditOne(kid, formId) {

    //constant 
    //this.DataOld = '_old';      //    //舊資料存在 data 屬性, 內容必須與 _editMany.DataOld 相同

    this.init = function () {
        this.kid = kid || 'Id';
        this.form = $('#' + (formId || 'formEdit'));     //multiple rows container object

        _edit.setFidTypeVars(this, this.form);
        _edit.setFileVars(this, this.form);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.getKey = function () {
        return _input.get(this.kid, this.form);
    };

    /**
     * is a new row or not
     * return {bool}
     */
    this.isNewRow = function () {
        return _str.isEmpty(this.getKey());
    };

    this.loadRow = function (row) {
        _form.loadRow(this.form, row);

        //set old value for each field
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            var obj = _obj.get(fid, this.form);
            obj.data(_edit.DataOld, row[fid]);
        }
    };

    /**
     * get updated row, 包含 _childs
     * return {json} different column only
     */
    this.getUpdRow = function () {
        return _edit.getUpdRow(this.kid, this.fidTypes, this.form);
    };

    this.reset = function () {
        _form.reset(this.form);
    };

    /**
     * set form to editable or not
     * status {bool} editable or not
     */
    this.setEdit = function (status) {
        _form.setEdit(this.form, status);
    };

    /**
     * formData add files
     * param {string} levelStr
     * param {FormData} data
     * return {json} file json
     */
    this.dataAddFiles = function (levelStr, data) {
        if (!this.hasFile)
            return null;

        var fileJson = {};
        for (var i = 0; i < this.fileLen; i++) {
            var fid = this.fileFids[i];
            var serverFid = _edit.getServerFid(levelStr, fid);
            if (_ifile.dataAddFile(data, fid, serverFid, this.form)) {
                fileJson[serverFid] = this.getKey();
            }
        }
        //_edit.dataSetFileJson(data, fileJson);
        return fileJson;
    };

    //=== file event start ===
    //file field be triggered
    this.onFile = function (me) {        
    };

    this.onOpenFile = function (me) {
    };

    this.onViewFile = function (me) {
    };

    this.onDeleteFile = function (me) {
    };
    //=== file event end ===

    //最後呼叫
    this.init();

}//class
var _xp = {

    //middle variables
    temp: {},

    //initial application
    initApp: function () {
        //debugger;
        //_locale.getBaseR0(locale);
        _leftmenu.init();
        _pjax.init('.xu-body');
        _tool.init();
        moment.locale(_fun.locale);
    },
    
};//class