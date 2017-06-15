using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFirstMvcEfAppProject.Models {

    public class ProductEditView {
        public int ID { get; set; }
        [Required]
        [MaxLength(140)]
        public string Name { get; set; }
        [Required]
        [MaxLength(50)]
        public string VendorPartNumber { get; set; }
        [Range(0, 1000)]
        public decimal Price { get; set; }
        [Required]
        [MaxLength(10)]
        public string Unit { get; set; }
        [MaxLength(255)]
        public string PhotoPath { get; set; }

        public int VendorId { get; set; }
        public List<Vendor> Vendors { get; set; }
    }
}