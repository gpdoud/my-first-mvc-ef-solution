using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFirstMvcEfAppProject.Models {
    public class PurchaseRequestLineItem {
        public int ID { get; set; }
        [Range(0,1000)]
        [DefaultValue(1)]
        public int Quantity { get; set; }

        public int PurchaseRequestId { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

		public void UpdateAllProperties(PurchaseRequestLineItem purchaseRequestLineItem) {
			this.PurchaseRequestId = purchaseRequestLineItem.PurchaseRequestId;
			this.ProductId = purchaseRequestLineItem.ProductId;
			this.Quantity = purchaseRequestLineItem.Quantity;
		}
	}
}