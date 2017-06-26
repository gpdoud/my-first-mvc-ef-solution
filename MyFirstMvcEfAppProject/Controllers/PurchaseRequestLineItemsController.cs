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
    public class PurchaseRequestLineItemsController : Controller
    {
        private MyFirstMvcEfAppProjectContext db = new MyFirstMvcEfAppProjectContext();

		private void RecalculatePurchaseRequestTotal(int id) {
			var prlines = db.PurchaseRequestLineItems.Where(prli => prli.PurchaseRequestId == id).ToList();
			var total = prlines.Sum(r => r.Quantity * db.Products.Single(p => p.ID == r.ProductId).Price);
			var pr = db.PurchaseRequests.Single(p => p.ID == id);
			pr.Total = total;
			db.SaveChanges();
		}

		public ActionResult List() {
			return Json(db.PurchaseRequestLineItems.ToList(), JsonRequestBehavior.AllowGet);
		}

		public ActionResult ListByPurchaseRequest(int? id) {
			if (id == null)
				return new EmptyResult();
			var items = db.PurchaseRequestLineItems.Where(pr => pr.PurchaseRequestId == id).ToList();
			return Json(items, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Get(int? id) {
			return Json(db.PurchaseRequestLineItems.Find(id), JsonRequestBehavior.AllowGet);
		}

		public ActionResult Remove(int? id) {
			if (id == null) {
				var rc = new Msg { Result = "Failed", Message = "No Id supplied" };
				return Json(rc, JsonRequestBehavior.AllowGet);
			}
			PurchaseRequestLineItem purchaseRequestLineItem  = db.PurchaseRequestLineItems.Find(id);
			if (purchaseRequestLineItem  == null) {
				return Json(new Msg { Result = "Failed", Message = $"PurchaseRequestLineItem not found for id {id}" }, JsonRequestBehavior.AllowGet);
			}
			db.PurchaseRequestLineItems.Remove(purchaseRequestLineItem );
			db.SaveChanges();
			RecalculatePurchaseRequestTotal(purchaseRequestLineItem.PurchaseRequestId);
			return Json(new Msg { Result = "OK", Message = "Successfully deleted" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Add([Api.FromBody] PurchaseRequestLineItem purchaseRequest) {
			if (purchaseRequest.PurchaseRequestId == 0)
				return new EmptyResult();
			db.PurchaseRequestLineItems.Add(purchaseRequest);
			db.SaveChanges();
			RecalculatePurchaseRequestTotal(purchaseRequest.PurchaseRequestId);
			return Json(new Msg { Result = "OK", Message = "Successfully added" }, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Change([Api.FromBody] PurchaseRequestLineItem aPurchaseRequest) {
			if (aPurchaseRequest.ID == 0)
				return Json(new Msg { Result = "Failure", Message = "aPurchaseRequestLineItem is empty" }, JsonRequestBehavior.AllowGet);
			PurchaseRequestLineItem purchaseRequest = db.PurchaseRequestLineItems.Find(aPurchaseRequest.ID);
			purchaseRequest.UpdateAllProperties(aPurchaseRequest);
			db.SaveChanges();
			RecalculatePurchaseRequestTotal(purchaseRequest.PurchaseRequestId);
			return Json(new Msg { Result = "OK", Message = "Successfully updated" }, JsonRequestBehavior.AllowGet);
		}
		// GET: PurchaseRequestLineItems
		public ActionResult Index()
        {
            var purchaseRequestLineItems = db.PurchaseRequestLineItems.Include(p => p.Product).Include(p => p.PurchaseRequest);
            return View(purchaseRequestLineItems.ToList());
        }

        // GET: PurchaseRequestLineItems/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Create
        public ActionResult Create()
        {
            ViewBag.ProductId = new SelectList(db.Products, "ID", "Name");
            ViewBag.PurchaseRequestId = new SelectList(db.PurchaseRequests, "ID", "Description");
            return View();
        }

        // POST: PurchaseRequestLineItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Quantity,PurchaseRequestId,ProductId")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.PurchaseRequestLineItems.Add(purchaseRequestLineItem);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ProductId = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductId);
            ViewBag.PurchaseRequestId = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestId);
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            ViewBag.ProductId = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductId);
            ViewBag.PurchaseRequestId = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestId);
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Quantity,PurchaseRequestId,ProductId")] PurchaseRequestLineItem purchaseRequestLineItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(purchaseRequestLineItem).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ProductId = new SelectList(db.Products, "ID", "Name", purchaseRequestLineItem.ProductId);
            ViewBag.PurchaseRequestId = new SelectList(db.PurchaseRequests, "ID", "Description", purchaseRequestLineItem.PurchaseRequestId);
            return View(purchaseRequestLineItem);
        }

        // GET: PurchaseRequestLineItems/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            if (purchaseRequestLineItem == null)
            {
                return HttpNotFound();
            }
            return View(purchaseRequestLineItem);
        }

        // POST: PurchaseRequestLineItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PurchaseRequestLineItem purchaseRequestLineItem = db.PurchaseRequestLineItems.Find(id);
            db.PurchaseRequestLineItems.Remove(purchaseRequestLineItem);
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
