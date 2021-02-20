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
                    return _crud.dtCrudFun(full.Id, full.Name, true, false, true);
                }},
            ],
        };

        //initial
        _me.mUserJob = new EditMany('Id', 'eformUserJob', 'tplUserJob', 'tr');
        _me.mUserSchool = new EditMany('Id', 'eformUserSchool', 'tplUserSchool', 'tr');
        _me.mUserLang = new EditMany('Id', 'eformUserLang', 'tplUserLang', 'tr', 'Sort');
        _me.mUserLicense = new EditMany('Id', 'eformUserLicense', 'tplUserLicense', 'tr');
        _me.mUserSkill = new EditMany('Id', 'eformUserSkill', 'tplUserSkill', 'tr', 'Sort');
		_crud.init(config, [null, _me.mUserJob, _me.mUserSchool, _me.mUserLang, _me.mUserLicense, _me.mUserSkill]);
    },

    //TODO: add your code
    //onclick viewFile, called by XiFile component
    onViewFile: function (elm) {
        _me.mUserLicense.onViewImage('', '', elm);
    },

}; //class