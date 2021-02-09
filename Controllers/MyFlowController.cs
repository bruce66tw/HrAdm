using Base.Models;
using Base.Services;
using BaseFlow.Services;
using BaseWeb.Services;
using HrAdm.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace HrAdm.Controllers
{
    public class MyFlowController : Controller
    {
        public ActionResult Read()
        {
            using(var db = new Db())
            {
                ViewBag.NodeTypes = _Code.GetNodeTypes(db);
                ViewBag.SignerTypes = _Code.GetSignerTypes(db);
                ViewBag.AndOrs = _Code.GetAndOrs(db);
                ViewBag.LineOps = _Code.GetLineOps(db);
            }
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new FlowRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new FlowEdit().GetJson(key).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Flow]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new FlowEdit().Create(_Json.StrToJson(json), MySetNewKey));
        }

        [HttpPost]
        public JsonResult Update(string key, string json)
        {
            return Json(new FlowEdit().Update(key, _Json.StrToJson(json), MySetNewKey));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new FlowEdit().Delete(key));
        }

        /// <summary>
        /// delegate for setNewKey
        /// </summary>
        /// <param name="inputJson"></param>
        /// <param name="edit"></param>
        /// <returns></returns>
        private bool MySetNewKey(CrudEdit editService, JObject inputJson, EditDto edit)
        {
            return (
                editService.SetNewKey(inputJson, edit) &&
                editService.SetRelatId(inputJson, 1, "StartNode", "00") &&
                editService.SetRelatId(inputJson, 1, "EndNode", "00"));
        }

    } //class
}