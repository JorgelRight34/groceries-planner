using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class NameAndDescriptionToGroceryLists : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroceryLists_AspNetUsers_UserId",
                table: "GroceryLists");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "GroceryLists",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "GroceryLists",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "GroceryLists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_GroceryLists_AspNetUsers_UserId",
                table: "GroceryLists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroceryLists_AspNetUsers_UserId",
                table: "GroceryLists");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "GroceryLists");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "GroceryLists");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "GroceryLists",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GroceryLists_AspNetUsers_UserId",
                table: "GroceryLists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
