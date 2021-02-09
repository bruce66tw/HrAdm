using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using BaseWeb.Attributes;
using HrAdm.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HrAdm.Controllers
{
    [XgProgAuth]
    public class UserExtController : Controller
    {
        public ActionResult Read()
        {
			//for read view
			ViewBag.Depts = _Code.GetDepts();
			//for edit view
			ViewBag.LangLevels = _Code.GetLangLevels();
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new UserExtRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        //TODO: add your code, tSn_fid ex: t03_FileName
        public JsonResult Create(string json, List<IFormFile> t03_FileName)
        {
            return Json(new UserExtEdit().CreateAsnyc(_Json.StrToJson(json), t03_FileName));
        }

        [HttpPost]
        //TODO: add your code, tSn_fid ex: t03_FileName
        public JsonResult Update(string key, string json, List<IFormFile> t03_FileName)
        {
            return Json(new UserExtEdit().UpdateAsnyc(key, _Json.StrToJson(json), t03_FileName));
        }

        //TODO: add your code
        //get file/image
        public FileContentResult GetFile(string table, string fid, string key)
        {
            var path = _File.GetFirstPath(_Xp.GetDirUserLicence(), "FileName_" + key, _Xp.NoImagePath);
            return _WebFile.EchoImage(path);
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[UserExt]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new UserExtEdit().Delete(key));
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new UserExtEdit().GetJson(key).ToString(), _Web.AppJson);
        }

    }//class
}