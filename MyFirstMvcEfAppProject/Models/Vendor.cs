using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyFirstMvcEfAppProject.Models {

    public class Vendor {
        public int ID { get; set; }
        [Required]
        [MaxLength(10)]
        [Index("VendorCodeUniqueIndex", IsUnique = true)]
        public string Code { get; set; }
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string Address { get; set; }
        [Required]
        [MaxLength(255)]
        public string City { get; set; }
        [Required]
        [MaxLength(2)]
        public string State { get; set; }
        [Required]
        [MaxLength(5)]
        public string Zip { get; set; }
        [MaxLength(12)]
        public string Phone { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        public bool IsRecommended { get; set; }

		public void UpdateAllProperties(Vendor vendor) {
			this.Code = vendor.Code;
			this.Name = vendor.Name;
			this.Address = vendor.Address;
			this.City = vendor.City;
			this.State = vendor.State;
			this.Zip = vendor.Zip;
			this.Phone = vendor.Phone;
			this.Email = vendor.Email;
			this.IsRecommended = vendor.IsRecommended;
		}
	}
}