namespace MyFirstMvcEfAppProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 140),
                        VendorPartNumber = c.String(nullable: false, maxLength: 50),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Unit = c.String(nullable: false, maxLength: 10),
                        PhotoPath = c.String(maxLength: 255),
                        VendorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Vendors", t => t.VendorId, cascadeDelete: true)
                .Index(t => t.VendorId);
            
            CreateTable(
                "dbo.Vendors",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false, maxLength: 10),
                        Name = c.String(nullable: false, maxLength: 255),
                        Address = c.String(nullable: false, maxLength: 255),
                        City = c.String(nullable: false, maxLength: 255),
                        State = c.String(nullable: false, maxLength: 2),
                        Zip = c.String(nullable: false, maxLength: 5),
                        Phone = c.String(maxLength: 12),
                        Email = c.String(maxLength: 255),
                        IsRecommended = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.Code, unique: true, name: "VendorCodeUniqueIndex");
            
            CreateTable(
                "dbo.PurchaseRequestLineItems",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Quantity = c.Int(nullable: false),
                        PurchaseRequestId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Products", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.PurchaseRequests", t => t.PurchaseRequestId, cascadeDelete: true)
                .Index(t => t.PurchaseRequestId)
                .Index(t => t.ProductId);
            
            CreateTable(
                "dbo.PurchaseRequests",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(maxLength: 100),
                        Justification = c.String(nullable: false, maxLength: 255),
                        DateNeeded = c.DateTime(nullable: false),
                        DeliveryMode = c.String(maxLength: 25),
                        DocsAttached = c.Boolean(nullable: false),
                        Status = c.String(maxLength: 10),
                        Total = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 20),
                        Password = c.String(nullable: false, maxLength: 10),
                        FirstName = c.String(nullable: false, maxLength: 20),
                        LastName = c.String(nullable: false, maxLength: 20),
                        Phone = c.String(maxLength: 12),
                        Email = c.String(nullable: false, maxLength: 75),
                        IsReviewer = c.Boolean(nullable: false),
                        IsAdmin = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.UserName, unique: true, name: "UserNameUniqueIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PurchaseRequestLineItems", "PurchaseRequestId", "dbo.PurchaseRequests");
            DropForeignKey("dbo.PurchaseRequests", "UserId", "dbo.Users");
            DropForeignKey("dbo.PurchaseRequestLineItems", "ProductId", "dbo.Products");
            DropForeignKey("dbo.Products", "VendorId", "dbo.Vendors");
            DropIndex("dbo.Users", "UserNameUniqueIndex");
            DropIndex("dbo.PurchaseRequests", new[] { "UserId" });
            DropIndex("dbo.PurchaseRequestLineItems", new[] { "ProductId" });
            DropIndex("dbo.PurchaseRequestLineItems", new[] { "PurchaseRequestId" });
            DropIndex("dbo.Vendors", "VendorCodeUniqueIndex");
            DropIndex("dbo.Products", new[] { "VendorId" });
            DropTable("dbo.Users");
            DropTable("dbo.PurchaseRequests");
            DropTable("dbo.PurchaseRequestLineItems");
            DropTable("dbo.Vendors");
            DropTable("dbo.Products");
        }
    }
}
