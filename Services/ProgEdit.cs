using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;

namespace HrAdm.Services
{
    public class ProgEdit
    {
        private EditDto GetDto()
        {
            return new EditDto
            {
				Table = "dbo.[Prog]",
                PkeyFid = "Id",
                Col4 = null,
                Items = new [] 
				{
					new EitemDto { Fid = "Id" },
					new EitemDto { Fid = "Code", Required = true },
					new EitemDto { Fid = "Name", Required = true },
					new EitemDto { Fid = "Icon" },
					new EitemDto { Fid = "Url" },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        Table = "dbo.[RoleProg]",
                        PkeyFid = "Id",
                        FkeyFid = "ProgId",
                        Col4 = null,
                        Items = new [] 
						{
							new EitemDto { Fid = "Id" },
							new EitemDto { Fid = "ProgId" },
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
