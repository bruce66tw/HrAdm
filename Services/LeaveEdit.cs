using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace HrAdm.Services
{
    public class LeaveEdit
    {
        private EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[Leave]",
                PkeyFid = "Id",
                Items = new [] 
				{
					new EitemDto { Fid = "Id" },
					new EitemDto { Fid = "UserId", Required = true },
					new EitemDto { Fid = "AgentId", Required = true },
					new EitemDto { Fid = "LeaveType", Required = true },
					new EitemDto { Fid = "StartTime", Required = true },
					new EitemDto { Fid = "EndTime", Required = true },
					new EitemDto { Fid = "Hours", Required = true },
					new EitemDto { Fid = "FlowSignStatus" },
					new EitemDto { Fid = "Status" },
					new EitemDto { Fid = "Creator" },
					new EitemDto { Fid = "Created" },
					new EitemDto { Fid = "Reviser" },
					new EitemDto { Fid = "Revised" },
                },
            };
        }

        private CrudEdit Service()
        {
            return new CrudEdit(GetDto());
        }

        public JObject GetJson(string key)
        {
            return Service().GetJson(key);
        }

        public ResultDto Create(JObject json)
        {
            return Service().Create(json);
        }

        public ResultDto Update(string key, JObject json)
        {
            return Service().Update(key, json);
        }

        public ResultDto Delete(string key)
        {
            return Service().Delete(key);
        }

    } //class
}
