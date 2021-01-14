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
    public class UserController : Controller
    {
        [XgProgAuth(CrudEstr.Read)]
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
        [XgProgAuth(CrudEstr.Read)]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new UserRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        [XgProgAuth(CrudEstr.Create)]
        //TODO: add your code, tSn_fid ex: t03_FileName
        public JsonResult Create(string json, List<IFormFile> t03_FileName)
        {
            return Json(new UserEdit().SaveCreateAsnyc(_Json.StrToJson(json), t03_FileName));
        }

        [HttpPost]
        [XgProgAuth(CrudEstr.Update)]
        //TODO: add your code, tSn_fid ex: t03_FileName
        public JsonResult Update(string key, string json, List<IFormFile> t03_FileName)
        {
            return Json(new UserEdit().SaveUpdateAsnyc(key, _Json.StrToJson(json), t03_FileName));
        }

        //TODO: add your code
        //get file/image
        [XgProgAuth(CrudEstr.View)]
        public FileContentResult GetFile(string table, string fid, string key)
        {
            var path = _File.GetFirstPath(_Xp.GetDirUserLicence(), "FileName_" + key, _Xp.NoImagePath);
            return _WebFile.EchoImage(path);
        }

        [HttpPost]
        [XgProgAuth(CrudEstr.Update)]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[User]", "Id", key, status));
        }

        [HttpPost]
        [XgProgAuth(CrudEstr.Delete)]
        public JsonResult Delete(string key)
        {
            return Json(new UserEdit().Delete(key));
        }

        [HttpPost]
        [XgProgAuth(CrudEstr.View)]
        public ContentResult GetJson(string key)
        {
            return Content(new UserEdit().GetJson(key).ToString(), _Web.AppJson);
        }

    }//class
}