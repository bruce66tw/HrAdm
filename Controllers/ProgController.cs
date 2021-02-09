using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using BaseWeb.Attributes;
using HrAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace HrAdm.Controllers
{
    [XgProgAuth]
    public class ProgController : Controller
    {
        public ActionResult Read()
        {
			//for edit view
			ViewBag.Roles = _Code.GetRoles();
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new ProgRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new ProgEdit().Create(_Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult Update(string key, string json)
        {
            return Json(new ProgEdit().Update(key, _Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Prog]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new ProgEdit().Delete(key));
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new ProgEdit().GetJson(key).ToString(), _Web.AppJson);
        }

    }//class
}