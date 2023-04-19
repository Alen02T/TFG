using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class AddDriverClassToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    driverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Flag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    imageDriver = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    team = table.Column<int>(type: "int", nullable: false),
                    seasonStartPrice = table.Column<int>(type: "int", nullable: false),
                    currentPrice = table.Column<int>(type: "int", nullable: false),
                    seasonChange = table.Column<int>(type: "int", nullable: false),
                    leagueId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.driverId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drivers");
        }
    }
}
