using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class LigaCircuitClassRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.CreateTable(
                name: "CircuitLiga",
                columns: table => new
                {
                    CircuitscircuitId = table.Column<int>(type: "int", nullable: false),
                    LigasId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CircuitLiga", x => new { x.CircuitscircuitId, x.LigasId });
                    table.ForeignKey(
                        name: "FK_CircuitLiga_Circuits_CircuitscircuitId",
                        column: x => x.CircuitscircuitId,
                        principalTable: "Circuits",
                        principalColumn: "circuitId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CircuitLiga_Ligas_LigasId",
                        column: x => x.LigasId,
                        principalTable: "Ligas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CircuitLiga_LigasId",
                table: "CircuitLiga",
                column: "LigasId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CircuitLiga");

            migrationBuilder.DropColumn(
                name: "leagueId",
                table: "Teams");
        }
    }
}
