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
    public class PurchaseRequestsController : Controller
    {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

		public ActionResult List() {
			//return Json(db.PurchaseRequests.ToList(), JsonRequestBehavior.AllowGet);
			return new JsonNetResult { Data = db.PurchaseRequests.ToList() };
		}

		public ActionResult Get(int? id) {
			//return Json(db.PurchaseRequests.Find(id), JsonRequestBehavior.AllowGet);
			return new JsonNetResult { Data = db.PurchaseRequests.Find(id) };
		}

		public ActionResult Remove(int? id) {
			if (id == null) {
				var rc = new Msg { Result = "Failed", Message = "No Id supplied" };
				return Json(rc, JsonRequestBehavior.AllowGet);
			}
			PurchaseRequest vendor = db.PurchaseRequests.Find(id);
			if (vendor == null) {
				return Json(new Msg { Result = "Failed", Message = $"PurchaseRequest not found for id {id}" }, JsonRequestBehavior.AllowGet);
			}
			db.PurchaseRequests.Remove(vendor);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Add([Api.FromBody] PurchaseRequest purchaseRequest) {
			if (purchaseRequest.Status == null)
				return new EmptyResult();
			db.PurchaseRequests.Add(purchaseRequest);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([Api.FromBody] PurchaseRequest aPurchaseRequest) {
			if (aPurchaseRequest.ID == 0)
				return Json(new Msg { Result = "Failure", Message = "aPurchaseRequest is empty" }, JsonRequestBehavior.AllowGet);
			PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(aPurchaseRequest.ID);
			purchaseRequest.UpdateAllProperties(aPurchaseRequest);
			db.SaveChanges();
			return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
		}


		// GET: PurchaseRequests
		public ActionResult Index()
        {
            var purchaseRequests = db.PurchaseRequests.Include(p => p.User);
            return View(purchaseRequests.ToList());
        }

        // GET: PurchaseRequests/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Create
        public ActionResult Create()
        {
            ViewBag.UserId = new SelectList(db.Users, "ID", "UserName");
            return View();
        }

        // POST: PurchaseRequests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Description,Justification,DateNeeded,DeliveryMode,DocsAttached,Status,Total,UserId")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequests.Add(purchaseRequest);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.UserId = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserId);
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            ViewBag.UserId = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserId);
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Description,Justification,DateNeeded,DeliveryMode,DocsAttached,Status,Total,UserId")] PurchaseRequest purchaseRequest)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequest).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.UserId = new SelectList(db.Users, "ID", "UserName", purchaseRequest.UserId);
            return View(purchaseRequest);
        }

        // GET: PurchaseRequests/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            if (purchaseRequest == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequest);
        }

        // POST: PurchaseRequests/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequest purchaseRequest = db.PurchaseRequests.Find(id);
            db.PurchaseRequests.Remove(purchaseRequest);
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
