using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using MyFirstMvcEfAppProject.Models;
using Api = System.Web.Http;

namespace MyFirstMvcEfAppProject.Controllers
{
	class Msg {
		public string Result { get; set; }
		public string Message { get; set; }
	}
    public class UsersController : Controller
    {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

		public ActionResult List() {
			return Json(db.Users.ToList(), JsonRequestBehavior.AllowGet);
		}

		public ActionResult Get(int? id) {
			return Json(db.Users.Find(id), JsonRequestBehavior.AllowGet);
		}

		public ActionResult Remove(int? id) {
			if (id == null) {
				var rc = new Msg { Result = "Failed", Message = "No Id supplied" };
				return Json(rc, JsonRequestBehavior.AllowGet);
			}
			User user = db.Users.Find(id);
			if(user == null) {
				return Json(new Msg { Result="Failed",Message=$"User not found for id {id}" }, JsonRequestBehavior.AllowGet);
			}
			db.Users.Remove(user);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Add([Api.FromBody] User user) {
			db.Users.Add(user);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([Api.FromBody] User aUser) {
			User user = db.Users.Find(aUser.ID);
			user.FirstName = aUser.FirstName;
			user.LastName = aUser.LastName;
			user.UserName = aUser.UserName;
			user.Phone = aUser.Phone;
			user.Email = aUser.Email;
			user.IsAdmin = aUser.IsAdmin;
			user.IsReviewer = aUser.IsReviewer;
			try {
				db.SaveChanges();
			} catch (Exception ex) {
				var e = ex;
			}
			return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
		}

		// GET: Users
		public ActionResult Index()
        {
            return View(db.Users.ToList());
        }

        // GET: Users/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // GET: Users/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Users/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,UserName,Password,FirstName,LastName,Phone,Email,IsReviewer,IsAdmin")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Users.Add(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(user);
        }

        // GET: Users/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,UserName,Password,FirstName,LastName,Phone,Email,IsReviewer,IsAdmin")] User user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(user);
        }

        // GET: Users/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // POST: Users/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            User user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
