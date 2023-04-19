using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class AddAbilityClassToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Abilities",
                columns: table => new
                {
                    abilityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    driverId = table.Column<int>(type: "int", nullable: false),
                    overtaking = table.Column<int>(type: "int", nullable: false),
                    defending = table.Column<int>(type: "int", nullable: false),
                    tireManagement = table.Column<int>(type: "int", nullable: false),
                    consistency = table.Column<int>(type: "int", nullable: false),
                    experience = table.Column<int>(type: "int", nullable: false),
                    pace = table.Column<int>(type: "int", nullable: false),
                    overall = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abilities", x => x.abilityId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Abilities");
        }
    }
}
