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
    public class RoleController : Controller
    {
        public ActionResult Read()
        {
			//for edit view
			ViewBag.Progs = _Code.GetProgs();
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new RoleRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new RoleEdit().Create(_Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult Update(string key, string json)
        {
            return Json(new RoleEdit().Update(key, _Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Role]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new RoleEdit().Delete(key));
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new RoleEdit().GetJson(key).ToString(), _Web.AppJson);
        }

    }//class
}