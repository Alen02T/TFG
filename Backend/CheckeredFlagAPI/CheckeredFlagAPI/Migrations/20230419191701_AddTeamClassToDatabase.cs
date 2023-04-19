using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class AddTeamClassToDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    teamId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    flag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    director = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    shieldImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    homefactory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    highestScoringTrack = table.Column<int>(type: "int", nullable: false),
                    championships = table.Column<int>(type: "int", nullable: false),
                    poles = table.Column<int>(type: "int", nullable: false),
                    wins = table.Column<int>(type: "int", nullable: false),
                    points = table.Column<int>(type: "int", nullable: false),
                    engine = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    chassis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    vehicleImage = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.teamId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}
