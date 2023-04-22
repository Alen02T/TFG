using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class AddResultClassToDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Results",
                columns: table => new
                {
                    resultId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    raceId = table.Column<int>(type: "int", nullable: false),
                    driverId = table.Column<int>(type: "int", nullable: false),
                    teamId = table.Column<int>(type: "int", nullable: false),
                    grid = table.Column<int>(type: "int", nullable: false),
                    position = table.Column<int>(type: "int", nullable: false),
                    points = table.Column<int>(type: "int", nullable: false),
                    fastestLap = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Results", x => x.resultId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Results");
        }
    }
}
