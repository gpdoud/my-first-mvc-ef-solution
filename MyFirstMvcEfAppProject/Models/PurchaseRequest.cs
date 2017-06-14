﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MyFirstMvcEfAppProject.Models {
    public class PurchaseRequest { 
        public int ID { get; set; }
        [MaxLength(100)]
        public string Description { get; set; }
        [Required]
        [MaxLength(255)]
        public string Justification { get; set; }
        public DateTime DateNeeded { get; set; }
        [MaxLength(25)]
        public string DeliveryMode { get; set; }
        public bool DocsAttached { get; set; }
        [MaxLength(10)]
        public string Status { get; set; }
        [Range(0, double.MaxValue)]
        public decimal Total { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}