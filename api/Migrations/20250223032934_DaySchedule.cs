using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class DaySchedule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Friday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Monday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Saturday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sunday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Thursday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Tuesday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wednesday",
                table: "Groceries",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Friday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Monday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Saturday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Sunday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Thursday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Tuesday",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "Wednesday",
                table: "Groceries");
        }
    }
}
