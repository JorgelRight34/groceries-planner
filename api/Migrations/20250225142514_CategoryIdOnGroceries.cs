using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CategoryIdOnGroceries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Groceries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groceries_CategoryId",
                table: "Groceries",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groceries_Categories_CategoryId",
                table: "Groceries",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groceries_Categories_CategoryId",
                table: "Groceries");

            migrationBuilder.DropIndex(
                name: "IX_Groceries_CategoryId",
                table: "Groceries");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Groceries");
        }
    }
}
