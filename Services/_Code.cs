using Base.Models;
using Base.Services;
using BaseWeb.Services;
using System.Collections.Generic;

namespace HrAdm.Services
{
    //與下拉欄位有關
    public static class _Code
    {
        //mapping to _Code.Type
        public const string Status = "Status";
        //WfNode
        public const string NodeType = "NodeType";
        //WfLine
        public const string LineType = "LineType";
        //Leave
        public const string SignerType = "SignerType";
        public const string LeaveType = "LeaveType";
        public const string FlowSignStatus = "FlowSignStatus";
        //WfSign
        public const string SourceType = "SourceType";
        public const string SignAct = "SignAct";
        //prog
        public const string ProgGroup = "ProgGroup";

        #region master table to codes
        public static List<IdStrDto> TableToCodes(string table, Db db = null)
        {
            var sql = string.Format(@"
select 
    Id, Name as Str
from dbo.[{0}]
order by Id
", table);
            return SqlToCodes(sql, db);
        }

        public static List<IdStrDto> GetProjects(Db db = null)
        {
            return TableToCodes("Project", db);
        }
        public static List<IdStrDto> GetUsers(Db db = null)
        {
            return TableToCodes("User", db);
        }
        public static List<IdStrDto> GetDepts(Db db = null)
        {
            return TableToCodes("Dept", db);
        }
        public static List<IdStrDto> GetRoles(Db db = null)
        {
            return TableToCodes("Role", db);
        }
        public static List<IdStrDto> GetProgs(Db db = null)
        {
            return TableToCodes("Prog", db);
        }
        #endregion


        #region get from _Code
        public static List<IdStrDto> GetLangLevels(Db db = null)
        {
            return TypeToCodes("LangLevel", db);
        }
        #endregion

        #region for flow
        public static List<IdStrDto> GetNodeTypes(Db db = null)
        {
            return TypeToCodes("NodeType", db);
        }
        public static List<IdStrDto> GetSignerTypes(Db db = null)
        {
            return TypeToCodes("SignerType", db);
        }
        public static List<IdStrDto> GetAndOrs(Db db = null)
        {
            return TypeToCodes("AndOr", db);
        }
        public static List<IdStrDto> GetLineOps(Db db = null)
        {
            return TypeToCodes("LineOp", db);
        }
        #endregion

        //get codes from sql 
        public static List<IdStrDto> SqlToCodes(string sql, Db db = null)
        {
            var emptyDb = (db == null);
            if (emptyDb)
                db = new Db();

            var rows = db.GetModels<IdStrDto>(sql);
            if (emptyDb)
                db.Dispose();
            return rows;
        }

        //get code table rows for 下拉式欄位
        public static List<IdStrDto> TypeToCodes(string type, Db db = null)
        {
            var sql = $@"
select 
    Code as Id, Name as Str
from dbo._Code
where Type='{type}'
order by Sort";
            return SqlToCodes(sql, db);           
        }

        /*
        public static List<IdStrExtModel> GetCodeExts(string type, Db db = null)
        {
            var emptyDb = (db == null);
            if (emptyDb)
                db = new Db();

            var sql = string.Format(@"
select 
    Code as Id, Name as Str, Ext
from dbo._Code
where Type='{0}'
and Ext='0'
order by Sort
", type);
            var rows = db.GetModels<IdStrExtModel>(sql);
            if (emptyDb)
                db.Dispose();
            return rows;
        }
        */

    }//class
}
