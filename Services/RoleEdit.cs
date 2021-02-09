using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace HrAdm.Services
{
    public class RoleEdit
    {
        private EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[Role]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new [] 
				{
					new EitemDto { Fid = "Id" },
					new EitemDto { Fid = "Name" },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        Table = "dbo.[RoleProg]",
                        PkeyFid = "Id",
                        FkeyFid = "RoleId",
                        Col4 = null,
                        Items = new [] 
						{
							new EitemDto { Fid = "Id" },
							new EitemDto { Fid = "RoleId" },
							new EitemDto { Fid = "ProgId", Required = true },
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
