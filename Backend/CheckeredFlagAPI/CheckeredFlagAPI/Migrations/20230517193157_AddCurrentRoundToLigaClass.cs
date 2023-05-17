using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CheckeredFlagAPI.Migrations
{
    public partial class AddCurrentRoundToLigaClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<int>(
                name: "currentRound",
                table: "Ligas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "currentRound",
                table: "Ligas");
        }
    }
}
