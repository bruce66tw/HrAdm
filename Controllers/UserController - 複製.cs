using Base.Models;
using Base.Services;
using BaseWeb.Services;
using HrAdm.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HrAdm.Controllers
{
    //[Permission(Prog = _Prog.User)]
    public class UserController : Controller
    {
        #region Read View
        public ActionResult Read()
        {
			//for read view
			ViewBag.Depts = _Code.GetDepts();
			//for edit view
			ViewBag.LangLevels = _Code.GetLangLevels();
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new UserRead().GetPage(dt).ToString(), _Web.AppJson);
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
        #endregion

        #region Edit View
        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new UserEdit().GetJson(key).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult Save(string json, List<IFormFile> t03_FileName)
        {
            return Json(new UserEdit().SaveAsnyc(_Json.StrToJson(json), t03_FileName));
        }
        #endregion

        //show image of UserLicence()
        public FileContentResult Image(string key)
        {
            var path = _File.GetFirstPath(_Xp.GetDirUserLicence(), "FileName_" + key, _Xp.NoImagePath);
            return _WebFile.EchoImage(path);
        }

    }//class
}