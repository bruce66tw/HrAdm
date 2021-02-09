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
    public class UserController : Controller
    {
        public ActionResult Read()
        {
			//for read view
			ViewBag.Depts = _Code.GetDepts();
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
            return Content(new UserRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new UserEdit().Create(_Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult Update(string key, string json)
        {
            return Json(new UserEdit().Update(key, _Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[User]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new UserEdit().Delete(key));
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new UserEdit().GetJson(key).ToString(), _Web.AppJson);
        }

    }//class
}