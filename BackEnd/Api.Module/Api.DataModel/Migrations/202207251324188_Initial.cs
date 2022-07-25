namespace Api.DataModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Budget = c.Single(nullable: false),
                        State = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Deadline = c.DateTime(nullable: false),
                        State = c.String(nullable: false),
                        Programmer_Id = c.Int(nullable: false),
                        Project_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Programmer_Id, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.Project_Id, cascadeDelete: true)
                .Index(t => t.Programmer_Id)
                .Index(t => t.Project_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false),
                        Deadline = c.DateTime(nullable: false),
                        State = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tasks", "Project_Id", "dbo.Projects");
            DropForeignKey("dbo.Tasks", "Programmer_Id", "dbo.Users");
            DropIndex("dbo.Tasks", new[] { "Project_Id" });
            DropIndex("dbo.Tasks", new[] { "Programmer_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Tasks");
            DropTable("dbo.Projects");
        }
    }
}
