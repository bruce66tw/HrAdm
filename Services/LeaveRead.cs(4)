using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace HrAdm.Services
{
    public class LeaveRead
    {
        private ReadDto dto = new ReadDto()
        {
            ReadSql = @"
select l.* 
from Leave l
join [User] u on l.UserId=u.Id
join [User] u2 on l.AgentId=u2.Id
order by l.Id
",
            Items = new [] {
                new QitemDto { Fid = "StartTime", Op = ItemOpEstr.InRange },
                new QitemDto { Fid = "LeaveType" },
                new QitemDto { Fid = "FlowSignStatus" },
            },
        };

        public JObject GetPage(DtDto dt)
        {
            return new CrudRead().GetPage(dto, dt);
        }

    } //class
}