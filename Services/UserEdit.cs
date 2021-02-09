using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace HrAdm.Services
{
    public class UserEdit
    {
        private EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[User]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new [] 
				{
					new EitemDto { Fid = "Id" },
					new EitemDto { Fid = "Account" },
					new EitemDto { Fid = "Name" },
					new EitemDto { Fid = "Pwd" },
					new EitemDto { Fid = "DeptId" },
					new EitemDto { Fid = "Status" },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        Table = "dbo.[UserRole]",
                        PkeyFid = "Id",
                        FkeyFid = "UserId",
                        Col4 = null,
                        Items = new [] 
						{
							new EitemDto { Fid = "Id" },
							new EitemDto { Fid = "UserId" },
							new EitemDto { Fid = "RoleId", Required = true },
                        },
                    },
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
