namespace MyFirstMvcEfAppProject.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovedProductEditViewfromcontext : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Vendors", "ProductEditView_ID", "dbo.ProductEditViews");
            DropIndex("dbo.Vendors", new[] { "ProductEditView_ID" });
            DropColumn("dbo.Vendors", "ProductEditView_ID");
            DropTable("dbo.ProductEditViews");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProductEditViews",
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
                .PrimaryKey(t => t.ID);
            
            AddColumn("dbo.Vendors", "ProductEditView_ID", c => c.Int());
            CreateIndex("dbo.Vendors", "ProductEditView_ID");
            AddForeignKey("dbo.Vendors", "ProductEditView_ID", "dbo.ProductEditViews", "ID");
        }
    }
}
