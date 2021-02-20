var _me = {

    init: function () {        
        //datatable config
        var config = {
            dom: _crud.dtDom,
            columns: [
                { data: 'Account' },
                { data: 'Name' },
                { data: 'DeptName' },
                { data: 'Status' },
                { data: '_Fun' },
            ],
            columnDefs: [
                _crud.dtColConfig,
				{ targets: [3], render: function (data, type, full, meta) {
                    return _crud.dtSetStatus(full.Id, data);
                }},
				{ targets: [4], render: function (data, type, full, meta) {
                    return _crud.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        _me.mUserRole = new EditMany('Id', 'eformUserRole', 'tplUserRole', 'tr');
		_crud.init(config, [null, _me.mUserRole]);
    },


}; //class