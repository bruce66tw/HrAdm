﻿using Base.Enums;
using Base.Models;
using Base.Services;
using BaseWeb.Services;
using BaseWeb.Attributes;
using HrAdm.Services;
using Microsoft.AspNetCore.Mvc;

namespace HrAdm.Controllers
{
    //[XgProgAuth]
    public class LeaveController : Controller
    {
        public ActionResult Read()
        {
			//for read view
			ViewBag.LeaveTypes = _Code.GetLeaveTypes();
			ViewBag.SignStatuses = _Code.GetSignStatuses();
			//for edit view
			ViewBag.Users = _Code.GetUsers();
            return View();
        }

        public ActionResult Edit()
        {
            return View();
        }

        [HttpPost]
        public ContentResult GetPage(DtDto dt)
        {
            return Content(new LeaveRead().GetPage(dt).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public ContentResult GetJson(string key)
        {
            return Content(new LeaveEdit().GetJson(key).ToString(), _Web.AppJson);
        }

        [HttpPost]
        public JsonResult SetStatus(string key, bool status)
        {
            return Json(_Db.SetRowStatus("dbo.[Leave]", "Id", key, status));
        }

        [HttpPost]
        public JsonResult Create(string json)
        {
            return Json(new LeaveEdit().Create(_Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult Update(string key, string json)
        {
            return Json(new LeaveEdit().Update(key, _Json.StrToJson(json)));
        }

        [HttpPost]
        public JsonResult Delete(string key)
        {
            return Json(new LeaveEdit().Delete(key));
        }

    }//class
}